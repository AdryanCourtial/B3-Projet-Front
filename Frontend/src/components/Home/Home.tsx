import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import RoomForm from './RoomForm/RoomForm';
import QuizParamsForm from './QuizParam/QuizParamsForm';
import RoomList from './RoomList/RoomListPublic';
import UserList from './UserList/UserList';
import EnterPinForm from './RoomList/EnterPinForm';  // Importer le nouveau composant

export interface QuizParams {
  limit: number;
  category: string;
  difficulty: string;
  gamemode: string;
}

export interface Room {
  roomId: string;
  roomPin: string | null;
  quizParams: QuizParams;
  users: { pseudo: string, socketId: string }[];
  usersCount: number;
}

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

  const createRoom = () => {
    socket.emit('createRoom', roomId, pseudo, quizParams, isPrivate);
    setIsInRoom(true); // Passer à l'interface de la room
  };

  const joinRoom = (roomId: string, pin: string | null) => {
    socket.emit('joinRoom', roomId, pseudo, pin);
    setIsInRoom(true); // Passer à l'interface de la room
  };

  // Fonction pour gérer la connexion via le PIN
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

    // Écouter la réponse après tentative de rejoindre une room avec un PIN
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
      socket.off('updateUsers');
      socket.off('roomCreated');
      socket.off('joinRoomResponse');
    };
  }, []);

  return (
    <div>
      <h1>Quiz App</h1>

      {!isInRoom ? (
        <>
          <RoomForm 
            pseudo={pseudo} 
            setPseudo={setPseudo} 
            roomId={roomId} 
            setRoomId={setRoomId} 
            isPrivate={isPrivate} 
            setIsPrivate={setIsPrivate} 
            createRoom={createRoom}
          />
          
          <QuizParamsForm quizParams={quizParams} setQuizParams={setQuizParams} />
          
          <button onClick={getRooms}>Voir les rooms</button>
          <RoomList availableRooms={availableRooms} joinRoom={joinRoom} />
          
          {/* Formulaire pour entrer le PIN */}
          <EnterPinForm joinRoomByPin={joinRoomByPin} />

          <p>{message}</p>
        </>
      ) : (
        <UserList roomId={roomId} usersInRoom={usersInRoom} roomPinDisplay={roomPinDisplay} />
      )}
    </div>
  );
};

export default QuizApp;
