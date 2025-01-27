import express from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { userInfo } from 'os';
import { VerifQuizInput } from './utils/inputsVerfication';
import { z } from 'zod';
import axios from 'axios';
import { QuizParams, type Categories } from './types/quizParameter.interface';
import { UserRole } from './types/role.enum';
import { GameState } from './types/game.enum';
import { Room } from './types/room.interface';
import { QuizData } from './types/quiz.interface';
import { Difficulty } from './types/difficulty.enum';

const app = express();
const server = createServer(app); 
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],       
    allowedHeaders: ['Content-Type'], 
  },
});


let rooms: { [roomId: string]: Room } = {}; 

let gameTimer = null;  
let currentQuestionTime = 30;  
let intervalId: NodeJS.Timeout | null = null; 

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté', socket.id);

  socket.on('createRoom', (roomId: string, pseudo: string, quizParams: QuizParams, isPrivate: boolean) => {
    let roomPin: string | null = null;
    if (isPrivate) {
      roomPin = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); 
    }

    rooms[roomId] = {
      name: roomId,
      room_id: roomId,
      room_pin: roomPin,
      users: [{              
        pseudo: pseudo,
        role: UserRole.host,
        uuid: socket.id,
        points: 0,
        
        alive: true
      }],
      options: quizParams,
      gameState: GameState.waiting,
      questions: {    
        count: 0,     
        quizzes: []   
      },
      currentQuestionIndex: 0
    };

    axios.get(`https://quizzapi.jomoreschi.fr/api/v1/quiz?category=${quizParams.category}&difficulty=${quizParams.difficulty}&limit=${quizParams.limit}`)
      .then((response) => {
        const quizData: QuizData = response.data; 
        
        quizData.quizzes = quizData.quizzes.map((q) => ({
          ...q,
          stats: {
              correct: 0,
              choices: {} 
          }
      }));

        rooms[roomId].questions = quizData;
      })
      .catch((error) => {
        console.log('Erreur de récupération des questions', error);
      });
      
      socket.join(roomId); 
      
      io.to(roomId).emit('message', `${pseudo} a créé la room avec les paramètres: ${JSON.stringify(quizParams)}`);
      socket.emit('roomCreated', { roomId, roomPin, users: rooms[roomId].users, gamemode: quizParams.gamemode,});
      
      console.log("je suis la room", rooms)
  });

  socket.on('joinRoom', (roomId: string, pseudo: string) => {
    const room = rooms[roomId];

    if (room) {

      const userExists = room.users.some(user => user.pseudo === pseudo);

      if (userExists) {
        socket.emit('error', { success: false, message: 'Ce pseudo est déjà utilisé dans cette room.' });
        return;
      }

      const userRole = room.users.length === 0 ? UserRole.host : UserRole.player;

      console.log(`Utilisateur "${pseudo}" rejoint la room ${roomId} avec le rôle: ${userRole}`);

      room.users.push({
        pseudo: pseudo,
        role: userRole, 
        uuid: socket.id,
        points: 0,
        alive: true
      });

      socket.join(roomId);

      console.log('Utilisateurs dans la room après ajout:', room.users);

      io.to(roomId).emit('updateUsers', room.users);
      socket.emit('roomJoined', { roomId: room.name, users: room.users, gamemode: room.options.gamemode, currentQuestionIndex: room.currentQuestionIndex, currentQuestion: room.questions.quizzes[room.currentQuestionIndex]  });

    } else {
      socket.emit('error', { success: false, message:'La room n\'existe pas.',});
    }
  });


  socket.on('getRooms', () => {
  
    
    const availableRooms = Object.keys(rooms).map(roomId => ({
      
      roomId,
      roomPin: rooms[roomId].room_pin,
      usersCount: rooms[roomId].users.length,
      quizParams: rooms[roomId].options,
      gameState: rooms[roomId].gameState,
      
        
    }))
  .filter(room => room.gameState === GameState.waiting);
      
      
    console.log(`Je suis le nombre de user dans la room`, availableRooms)


    socket.emit('availableRooms', availableRooms);

    if (availableRooms.length === 0) {
      socket.emit('error', { success:false, message:'Aucune room disponible'})
    }
  });

    socket.on('joinRoomByPin', (enteredPin: string, pseudo: string) => {
      
    let roomFound = null;
    for (let roomId in rooms) {
      const room = rooms[roomId];

      if (room.room_pin === enteredPin && room.gameState === GameState.waiting) {
        roomFound = room;
        break; 
      }
    }

      if (roomFound) {
      
      const userExists = roomFound.users.some(user => user.pseudo === pseudo);

      if (userExists) {
        socket.emit('error', { success: false, message: 'Ce pseudo est déjà utilisé dans cette room.' });
        return; 
      }

      roomFound.users.push({
        pseudo: pseudo,
        role: UserRole.player,       
        uuid: socket.id,     
        points: 0,
        alive: true
      });

      socket.join(roomFound.room_id);
      console.log(`${pseudo} a rejoint la room ${roomFound.room_id}`);

      socket.emit('startQuiz', roomFound.options);

      io.to(roomFound.room_id).emit('message', `${pseudo} a rejoint la room`);

      io.to(roomFound.room_id).emit('updateUsers', roomFound.users);
        socket.emit('roomJoined', { roomId: roomFound.name, users: roomFound.users, gamemode: roomFound.options.gamemode, roomPin: roomFound.room_pin, currentQuestionIndex: roomFound.currentQuestionIndex, currentQuestion: roomFound.questions.quizzes[roomFound.currentQuestionIndex] });


    } else {
      socket.emit('error', {success:false, message: 'Pin incorrect ou jeu déja en cours pour la room privée.' });
    }
    });
  
  
  socket.on('startGame', (roomId) => {
    const room = rooms[roomId];

    if (room) {
      room.gameState = GameState.inGame;
      io.to(roomId).emit('gameStarted', 'Le jeu commence maintenant !');
      io.to(roomId).emit('dataResponseQuiz', room.questions);

      console.log(`Je suis les questiosn envoyé au front `, room.questions)


      currentQuestionTime = 30;
      
      intervalId = setInterval(() => {
        currentQuestionTime -= 1;
        io.to(roomId).emit('updateTimer', { remainingTime: currentQuestionTime });

        if (currentQuestionTime <= 0) {
          if (intervalId) {
            clearInterval(intervalId);  
          }
          io.to(roomId).emit('timeUp', 'Le temps est écoulé pour cette question!');
          console.log(`je suis le jeu qui a finis`, room)
        }
      }, 1000);
    }
  });

  let intervalId: NodeJS.Timeout | null = null;

  socket.on('nextQuestion', (roomId) => {
      const room = rooms[roomId];
      if (room) {

        const countQuestion = room.questions.count - 1
          if (room.currentQuestionIndex >= countQuestion) {
            room.gameState = GameState.end; 
            console.log("je suis letat de la room", room.gameState)
            const statistics = room.questions.quizzes.map((q) => ({
              question: q.question,
              correctAnswer: q.answer,
              stats: q.stats, 
          }));

          io.to(roomId).emit('quizFinished', {
            message: 'Le quiz est terminé.',
            statistics: statistics,
          });
            return; 
        }
  
          currentQuestionTime = 30;
  
          if (intervalId !== null) {
              clearInterval(intervalId);
              intervalId = null;
          }
  
          intervalId = setInterval(() => {
              currentQuestionTime -= 1;
              io.to(roomId).emit('updateTimer', { remainingTime: currentQuestionTime });
  
              if (currentQuestionTime <= 0) {
                  clearInterval(intervalId as NodeJS.Timeout);
                  intervalId = null;
                  io.to(roomId).emit('timeUp', 'Le temps est écoulé pour cette question!');
              }
          }, 1000);
  
          room.currentQuestionIndex += 1;

          console.log(`Je suis l'index actuel de la question, ${room.currentQuestionIndex}`)
  
          const nextQuestion = room.questions.quizzes[room.currentQuestionIndex];
          io.to(roomId).emit('updateQuestion', {
              question: nextQuestion.question,
              answers: nextQuestion.answer,
              index: room.currentQuestionIndex,
          });
      }
  });
  



  
  socket.on('endGame', (roomId) => {
    const room = rooms[roomId];
    
    if (room) {
      room.gameState = GameState.end;
      io.to(roomId).emit('gameEnded', 'Le jeu est terminé ! Voulez-vous redémarrer ?');
      console.log(`Le jeu a terminé dans la room ${roomId}`);

      // Arrêter le timer si le jeu est terminé
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  });


  socket.on('restartGame', async (roomId) => {
    const room = rooms[roomId];

    if (room && room.gameState === GameState.end) {
        try {

            room.gameState = GameState.inGame;
            room.currentQuestionIndex = 0;
            room.users.forEach(user => {
              user.points = 0; 
              user.alive = true;

            });

            const quizParams = room.options;
            const response = await axios.get(`https://quizzapi.jomoreschi.fr/api/v1/quiz?category=${quizParams.category}&difficulty=${quizParams.difficulty}&limit=${quizParams.limit}`);
            room.questions = response.data; 
          
              room.questions.quizzes.forEach((q) => {
                q.stats = q.stats || { choices: {}, correct: 0 };
            });


            console.log(`Je suis les questiosn envoyé au front `, room.questions)

            currentQuestionTime = 30;
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }

            intervalId = setInterval(() => {
                currentQuestionTime -= 1;
                io.to(roomId).emit('updateTimer', { remainingTime: currentQuestionTime });

                if (currentQuestionTime <= 0) {
                    clearInterval(intervalId as NodeJS.Timeout);
                    intervalId = null;
                    io.to(roomId).emit('timeUp', 'Le temps est écoulé pour cette question!');
                }
            }, 1000);

            io.to(roomId).emit('gameRestarted', {
                message: 'Le jeu va recommencer',
                roomState: {
                    users: room.users,
                    questions: room.questions,
                    currentQuestionIndex: room.currentQuestionIndex,
                },
            });

            console.log(`Le jeu de la room ${roomId} a redémarré avec de nouvelles questions`);
        } catch (error) {
            console.error(`Erreur lors du rechargement des questions pour la room ${roomId}:`, error);
            io.to(roomId).emit('error', 'Impossible de redémarrer le jeu. Réessayez plus tard.');
        }
    }
});

  
  socket.on('redirectToLobby', (roomId) => {
    const room = rooms[roomId];

    if (room) {
        room.gameState = GameState.waiting; 
        io.to(roomId).emit('redirectToLobby', {
            message: 'La partie est terminée. Retour au lobby.',
            users: room.users,
        });
    } else {
        console.error(`Room non trouvée : ${roomId}`);
    }
});



  socket.on('endRoom', (roomId) => {
    const room = rooms[roomId];

    if (room) {
      delete rooms[roomId]; 
      io.to(roomId).emit('roomEnded', 'La room a été fermée.');
      console.log(`La room ${roomId} a été fermée.`);
    }
  });
    
  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté', socket.id);

    for (let roomId in rooms) {
      const room = rooms[roomId];

      const userIndex = room.users.findIndex(user => user.uuid === socket.id);
      if (userIndex !== -1) {
        const disconnectedUser = room.users[userIndex].pseudo;
        const userRole = room.users[userIndex].role;

        room.users.splice(userIndex, 1); 

      if (userRole === UserRole.host) {
        console.log(`L'hôte "${disconnectedUser}" s'est déconnecté`);

        if (room.users.length > 0) {
        
          const newHost = room.users[0];
          newHost.role = UserRole.host;

          console.log(`Le nouveau host est "${newHost.pseudo}"`);

          io.to(roomId).emit('updateUsers', room.users);

          io.to(roomId).emit('hostChanged', newHost.pseudo);  
        }
      }

      if (room.users.length === 0) {
        console.log(`La room "${roomId}" est vide et va être fermée.`);

        delete rooms[roomId];

        io.emit('roomClosed', `La room ${roomId} a été fermée car il ne reste plus d'utilisateurs.`);

        io.to(roomId).emit('message', `La room ${roomId} est maintenant fermée.`);
      } else {
        io.to(roomId).emit('updateUsers', room.users);
      }

      io.to(roomId).emit('message', `${disconnectedUser} s'est déconnecté`);

      break; 

        }
      }
    });

    socket.on('verifAnswer', (data) => {
      const { roomId, answer, user, questionIndex, timeStamp } = data;
  
      console.log(`L'utilisateur : ${user} a répondu : ${answer}`);
  
      const room = rooms[roomId];
      if (!room) {
          console.log(`Room non trouvée pour l'utilisateur : ${user}`);
          return;
      }
  
      const currentQuestion = room.questions?.quizzes?.[questionIndex];
      if (!currentQuestion) {
          console.log(`Question non trouvée pour l'index ${questionIndex} dans la room ${roomId}`);
          return;
      }
  
      // Met à jour les statistiques de la question
      if (!currentQuestion.stats.choices[answer]) {
          currentQuestion.stats.choices[answer] = 0;
      }
      currentQuestion.stats.choices[answer] += 1;
  
      if (answer === currentQuestion.answer) {
          currentQuestion.stats.correct += 1;
      }
  
      const userIndex = room.users.findIndex((u) => u.pseudo === user);
      if (userIndex === -1) {
          console.log(`Utilisateur non trouvé dans la room ${roomId}`);
          return;
      }
  
      const correctAnswer = currentQuestion.answer;
  
      if (room.options.gamemode === Difficulty.mort_subite) {
          if (answer !== correctAnswer) {
              room.users[userIndex].alive = false; 
              room.users[userIndex].points = questionIndex + 1; 
              console.log(`${user} est éliminé à la question ${questionIndex + 1}.`);

              io.to(room.users[userIndex].uuid).emit('playerEliminated', {
                message: `Vous avez été éliminé à la question ${questionIndex + 1}.`,
            })
          } else {
              console.log(`${user} a survécu à la question.`);
          }
  
          io.to(roomId).emit('updateUsers', room.users);
  


          const allDead = room.users.every((u) => !u.alive);


          const statistics = room.questions.quizzes.map((q) => ({
            question: q.question,
            correctAnswer: q.answer,
            stats: q.stats, 
          }));

          if (allDead) {
              room.gameState = GameState.end;
              setTimeout(() => {
                io.to(roomId).emit('gameOver', {
                  message: 'Tous les joueurs sont morts. Game over !',
                  statistics: statistics,
              });              }, 100); 
              return;
          }
      } else if (room.options.gamemode === Difficulty.normal) {
          let points = 0;
          if (answer === correctAnswer) {
              points = Math.max(0, 1000 - (30 - timeStamp) * 33);
              console.log(`${user} a gagné ${points} points et a répondu en ${timeStamp} secondes.`);
          }
          room.users[userIndex].points += points;
      }
  
      io.to(roomId).emit('updateUsers', room.users);
  });
  
  




  socket.on('leaveRoom', (roomId) => {
    const room = rooms[roomId];
    if (room) {
        const userIndex = room.users.findIndex(user => user.uuid === socket.id);
        if (userIndex !== -1) {
            const disconnectedUser = room.users[userIndex];
            room.users.splice(userIndex, 1); 

            console.log(`${disconnectedUser.pseudo} a quitté la room ${roomId}.`);

            if (room.users.length === 0) {
                delete rooms[roomId];
                console.log(`Room ${roomId} supprimée car elle est vide.`);
            } else {
                io.to(roomId).emit('updateUsers', room.users); 
            }
        }
    }
});


});


server.listen(4000, () => {
  console.log('Serveur démarré sur http://localhost:4000');
});