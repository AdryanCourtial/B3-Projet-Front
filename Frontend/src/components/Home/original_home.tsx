import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import RoomList from './RoomList/RoomListPublic';
import UserList from './UserList/UserList';
import EnterPinForm from './RoomList/EnterPinForm';
import { type QuizParams } from '../../types/quiz.type';
import { type Room } from '../../types/room.type';
import Header from '../Global/Header/Header';
import CreateRoomForm from './CreateQuiz/CreateRoomForm';
import Game from '../Game/Game';
import './Home.css';  // Importer le fichier CSS
import { useAtom } from 'jotai';
import { currentviewEtat, pin, userPseudo } from '../../atoms/UserAtoms';

const socket = io('http://localhost:4000');

const QuizApp = () => {
  const [pseudo, setPseudo] = useAtom(userPseudo);
  const [roomId, setRoomId] = useState<string>(''); 
  const [quizParams, setQuizParams] = useState<QuizParams>({
    limit: 5,
    category: 'tv_cinema',
    difficulty: 'facile',
    gamemode: 'classic'
  });
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]); // Liste des rooms disponibles
  const [message, setMessage] = useState<string>('');  // Message du serveur
  const [usersInRoom, setUsersInRoom] = useState<{ pseudo: string, role: string }[]>([]); 
  const [isInRoom, setIsInRoom] = useState<boolean>(false); // Pour savoir si l'utilisateur est dans une room
  const [isPrivate, setIsPrivate] = useState<boolean>(false); // Si la room est privée
  const [, setRoomPinDisplay] = useAtom(pin)
  const [currentView, setCurrentView] = useAtom(currentviewEtat)


  const createRoom = () => {
    socket.emit('createRoom', roomId, pseudo, quizParams, isPrivate);
    setIsInRoom(true); 
  };

  const joinRoom = (roomId: string, pseudo: string) => {
    socket.emit('joinRoom', roomId, pseudo);
    setIsInRoom(true); 
  };

  const joinRoomByPin = (enteredPin: string) => {
    console.log('je suis le pin envoyé au server', enteredPin)
    socket.emit('joinRoomByPin', enteredPin, pseudo);
    setIsInRoom(true);  
  };

  const getRooms = () => {
    socket.emit('getRooms');
  };

  const startGame = () => {
    socket.emit('startGame', roomId);
    setCurrentView('game'); 
  };

  const endRoom = (roomId: string) => {
    socket.emit('endRoom', roomId)
  }

  useEffect(() => {
    socket.on('availableRooms', (rooms: Room[]) => {
      setAvailableRooms(rooms);
    });



    socket.on('roomJoined', (data: { roomId: string, users: { pseudo: string, role: string }[], roomPin: string | null }) => {
      setRoomId(data.roomId);
      setUsersInRoom(data.users);
      setRoomPinDisplay(data.roomPin)
    });

    socket.on('message', (data: string) => {
      setMessage(data);
    });

    socket.on('roomCreated', ({ roomId, roomPin, users}) => {
      console.log(`Room créée: ${roomId}`);
      setRoomPinDisplay(roomPin); 
      setUsersInRoom(users)
    });

    socket.on('updateUsers', (users: { pseudo: string, socketId: string, role: string }[]) => {
      setUsersInRoom(users); 
    });

    socket.on('roomEnded', (message) => {
      alert(message)
      setIsInRoom(false)
      setUsersInRoom([]);  
      setRoomId('');
    })

    socket.on('joinRoomResponse', (success: boolean, message: string) => {
      if (success) {
        setIsInRoom(true);  
      } else {
        alert(message); 
      }
    });

    socket.on('gameStarted', () => {
      setCurrentView('game');
    });

    socket.on('hostChanged', (newHostPseudo) => {
          console.log(`Le nouveau hôte est : ${newHostPseudo}`);
          setUsersInRoom(prevUsers => {
            return prevUsers.map(user => {
              if (user.pseudo === newHostPseudo) {
                user.role = 'host';
              } else if (user.role === 'host') {
                user.role = 'player';
              }
              return user;
            });
          });
        });

    return () => {
      socket.off('availableRooms');
      socket.off('message');
      socket.off('roomJoined');
      socket.off('updateUsers');
      socket.off('roomCreated');
      socket.off('joinRoomResponse');
      socket.off('gameStarted');
      socket.off('hostChanged');
    };
  }, [setCurrentView, setRoomPinDisplay]);

  const handleViewChange = (view: string) => {
    setCurrentView(view); 
    if (view === 'getRooms') {
      getRooms();  
    }
  };

  return (
    <div className="quiz-app">
      <Header />

      {/* Contrôle de la vue */}
      {currentView === 'game' ? (
        <Game roomId={roomId} usersInRoom={usersInRoom} /> 
      ) : (
        <>
          {!isInRoom ? (
            <>
              <div className="buttons">
                <button onClick={() => handleViewChange('joinRoomByPin')}>Rejoindre une room privé</button>
                <button  onClick={() => handleViewChange('createRoom')}>Créer une room</button>
                <button  onClick={() => handleViewChange('getRooms')}>Voir les rooms</button>
              </div>

              {currentView === 'joinRoomByPin' && (
                <div className="join-room-form">
                  <EnterPinForm 
                    pseudo={pseudo} 
                    setPseudo={setPseudo} 
                    joinRoomByPin={joinRoomByPin} 
                  />
                </div>
              )}

              {currentView === 'createRoom' && (
                <CreateRoomForm 
                  pseudo={pseudo} 
                  setPseudo={setPseudo} 
                  roomId={roomId} 
                  setRoomId={setRoomId} 
                  isPrivate={isPrivate} 
                  setIsPrivate={setIsPrivate} 
                  quizParams={quizParams} 
                  setQuizParams={setQuizParams} 
                  createRoom={createRoom}
                />
              )}

              {currentView === 'getRooms' && (
                <RoomList availableRooms={availableRooms} joinRoom={joinRoom} />
              )}
              <p>{message}</p>
            </>
          ) : (
            <UserList 
              roomId={roomId} 
              usersInRoom={usersInRoom} 
              startGame={startGame} 
              currentUserPseudo={pseudo}
              endRoom={endRoom}
            />
          )}
        </>
      )}
    </div>
  );
};

export default QuizApp;