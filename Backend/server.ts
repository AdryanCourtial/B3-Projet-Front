import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { userInfo } from 'os';
import { UserRole } from './types/role.enum';
import { QuizParams } from './types/quizParams.interface';
import { Room } from './types/room.interface';
import { GameState } from './types/game.enum';

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

// Lorsqu'un utilisateur se connecte
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté', socket.id);

  socket.on('createRoom', (roomId: string, pseudo: string, quizParams: QuizParams, isPrivate: boolean) => {
    let roomPin: string | null = null;
    if (isPrivate) {
      roomPin = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Exemple de génération de pin
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
      gameState: GameState.waiting
    };

    console.log(rooms[roomId].users);
    socket.join(roomId); 
    console.log(rooms)
    console.log(`${pseudo} a créé la room ${roomId} avec les paramètres`, quizParams);

      io.to(roomId).emit('message', `${pseudo} a créé la room avec les paramètres: ${JSON.stringify(quizParams)}`);
    socket.emit('roomCreated', { roomId, roomPin });

  });

  socket.on('joinRoom', (roomId: string, pseudo: string) => {
    const room = rooms[roomId];

    if (room) {
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
    } else {
      socket.emit('error', 'La room n\'existe pas.');
    }
  });


  socket.on('getRooms', () => {

    const availableRooms = Object.keys(rooms).map(roomId => ({
      roomId,
      roomPin: rooms[roomId].room_pin,
      usersCount: rooms[roomId].users.length,
        quizParams: rooms[roomId].options,
      
        
    }));
      
    console.log(`Je suis le nombre de user dans la room`, availableRooms)


    socket.emit('availableRooms', availableRooms);
  });

    socket.on('joinRoomByPin', (enteredPin: string, pseudo: string) => {
      
    let roomFound = null;
    for (let roomId in rooms) {
      const room = rooms[roomId];

      if (room.room_pin === enteredPin) {
        roomFound = room;
        break; 
      }
    }

    if (roomFound) {
      roomFound.users.push({
        pseudo: pseudo,
        role: UserRole.player,       // Rôle initial
        uuid: socket.id,      // ID unique
        points: 0,
        alive: true
      });

      socket.join(roomFound.room_id);
      console.log(`${pseudo} a rejoint la room ${roomFound.room_id}`);

      socket.emit('startQuiz', roomFound.options);

      io.to(roomFound.room_id).emit('message', `${pseudo} a rejoint la room`);

      io.to(roomFound.room_id).emit('updateUsers', roomFound.users);
        socket.emit('roomJoined', { roomId: roomFound.name, users: roomFound.users,  });


    } else {
      socket.emit('error', 'Pin incorrect ou manquant pour la room privée.');
    }
  });
  socket.on('startGame', (roomId) => {
    const room = rooms[roomId];

    if (room) {

      room.gameState = GameState.inGame
      io.to(roomId).emit('gameStarted', 'Le jeu commence maintenant !');
      console.log(room)
      console.log(`Le jeu a commencé dans la room ${roomId}`);
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



});

// Lancer le serveur
server.listen(4000, () => {
  console.log('Serveur démarré sur http://localhost:4000');
});