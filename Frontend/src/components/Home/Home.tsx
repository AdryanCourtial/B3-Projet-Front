import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import RoomList from './RoomList/RoomListPublic';
import UserList from './UserList/UserList';
import EnterPinForm from './RoomList/EnterPinForm';  
import { type QuizParams } from '../../types/quiz.type';
import { type Room } from '../../types/room.type';
import Header from '../Global/Header/Header';
import CreateRoomForm from './CreateQuiz/CreateRoomForm';

const socket = io('http://localhost:4000'); // Connexion au serveur

const QuizApp = () => {
  const [pseudo, setPseudo] = useState<string>('');  // Le pseudo de l'utilisateur
  const [roomId, setRoomId] = useState<string>('');  // L'ID de la room
  const [quizParams, setQuizParams] = useState<QuizParams>({
    limit: 5,
    category: 'tv_cinema',
    difficulty: 'facile',
    gamemode: 'classic'
  });
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]); // Liste des rooms disponibles
  const [message, setMessage] = useState<string>('');  // Message du serveur
  const [usersInRoom, setUsersInRoom] = useState<string[]>([]);  // Liste des utilisateurs dans la room
  const [isInRoom, setIsInRoom] = useState<boolean>(false); // Pour savoir si l'utilisateur est dans une room
  const [isPrivate, setIsPrivate] = useState<boolean>(false); // Si la room est privée
  const [roomPinDisplay, setRoomPinDisplay] = useState<string | null>(''); // Pin à afficher après création
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);  // Gérer l'affichage du formulaire de création
  const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false);  // Gérer l'affichage du formulaire de rejoindre

  const createRoom = () => {
    socket.emit('createRoom', roomId, pseudo, quizParams, isPrivate);
    setIsInRoom(true); // Passer à l'interface de la room
  };

  const joinRoom = (roomId: string, pseudo: string) => {
    socket.emit('joinRoom', roomId, pseudo);
    setIsInRoom(true); // Passer à l'interface de la room
  };

  const joinRoomByPin = (enteredPin: string) => {
    console.log('je suis le pin envoyé au server', enteredPin)
    socket.emit('joinRoomByPin', enteredPin, pseudo);
    setIsInRoom(true);  
  };

  const getRooms = () => {
    socket.emit('getRooms');
  };

  useEffect(() => {
    socket.on('availableRooms', (rooms: Room[]) => {
      setAvailableRooms(rooms);
    });

    socket.on('roomJoined', (data: { roomId: string, users: { pseudo: string }[] }) => {
      setRoomId(data.roomId);
      setUsersInRoom(data.users.map(user => user.pseudo)); // Mettre à jour la liste des utilisateurs
    });


    socket.on('message', (data: string) => {
      setMessage(data);
    });

    socket.on('roomCreated', ({ roomId, roomPin }) => {
      console.log(`Room créée: ${roomId}`);
      setRoomPinDisplay(roomPin); // Afficher le pin si la room est privée
    });

    socket.on('updateUsers', (users: { pseudo: string, socketId: string }[]) => {
      setUsersInRoom(users.map(user => user.pseudo));  // Mettre à jour la liste des utilisateurs dans la room
    });

    socket.on('joinRoomResponse', (success: boolean, message: string) => {
      if (success) {
        setIsInRoom(true);  // Passer à l'interface de la room
      } else {
        alert(message);  // Afficher un message d'erreur si le PIN n'est pas valide
      }
    });

    return () => {
      socket.off('availableRooms');
      socket.off('message');
      socket.off('roomJoined');
      socket.off('updateUsers');
      socket.off('roomCreated');
      socket.off('joinRoomResponse');
    };
  }, []);

  const handleJoinRoomClick = () => {
    setIsJoiningRoom(true); // Afficher le formulaire pour entrer le pseudo et le PIN
  };

  const handleCreateRoomClick = () => {
    setIsCreatingRoom(true); // Afficher le formulaire de création de la room
  };

  return (
    <div>
      <Header/>

      {!isInRoom ? (
        <>
          {/* Choisir si on veut rejoindre ou créer une room */}
          <button onClick={handleJoinRoomClick}>Rejoindre une room privé</button>
          <button onClick={handleCreateRoomClick}>Créer une room</button>

          {isJoiningRoom && (
            <>
              <div>
                <input 
                  type="text" 
                  placeholder="Entrez votre pseudo" 
                  value={pseudo} 
                  onChange={(e) => setPseudo(e.target.value)} 
                />
                <EnterPinForm joinRoomByPin={joinRoomByPin} />
              </div>
            </>
          )}

          {isCreatingRoom && (
            <>
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
            </>
          )}

          <button onClick={getRooms}>Voir les rooms</button>
          <RoomList availableRooms={availableRooms} joinRoom={joinRoom} />

          <p>{message}</p>
        </>
      ) : (
        <UserList roomId={roomId} usersInRoom={usersInRoom} roomPinDisplay={roomPinDisplay} />
      )}
    </div>
  );
};

export default QuizApp;
