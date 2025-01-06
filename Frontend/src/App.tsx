import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Type pour les paramètres du quiz
interface QuizParams {
  limit: number;
  category: string;
  difficulty: string;
  gamemode: string;
}

// Type pour une room
interface Room {
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
  const [enteredPin, setEnteredPin] = useState<string>(''); // Pin entré par l'utilisateur pour rejoindre une room

  // Créer une room
  const createRoom = () => {
    socket.emit('createRoom', roomId, pseudo, quizParams, isPrivate);
    setIsInRoom(true); // Passer à l'interface de la room
  };

  // Rejoindre une room
  const joinRoom = (roomId: string, pin: string | null) => {
    socket.emit('joinRoom', roomId, pseudo, pin);
    setIsInRoom(true); // Passer à l'interface de la room
  };

  // Obtenir la liste des rooms disponibles
  const getRooms = () => {
    socket.emit('getRooms');
  };

  useEffect(() => {
    // Écouter les rooms disponibles
    socket.on('availableRooms', (rooms: Room[]) => {
        setAvailableRooms(rooms); // Met à jour la liste des rooms disponibles
      });

    // Écouter les messages
    socket.on('message', (data: string) => {
      setMessage(data);
    });

    socket.on('roomCreated', ({ roomId, roomPin }) => {
      console.log(`Room créée: ${roomId}`);
      setRoomPinDisplay(roomPin); // Afficher le pin si la room est privée
    });

    // Écouter la mise à jour des utilisateurs dans la room
    socket.on('updateUsers', (users: { pseudo: string, socketId: string }[]) => {
      setUsersInRoom(users.map(user => user.pseudo));  // Mettre à jour la liste des utilisateurs dans la room
    });

    return () => {
      socket.off('availableRooms');
      socket.off('message');
      socket.off('updateUsers');
      socket.off('roomCreated');
    };
  }, []);

  // Mettre à jour les paramètres du quiz
  const handleQuizParamChange = (e: React.ChangeEvent<HTMLInputElement>, param: keyof QuizParams) => {
    setQuizParams({
      ...quizParams,
      [param]: e.target.value
    });
  };

  // Afficher le formulaire pour créer ou rejoindre une room
  if (!isInRoom) {
    return (
      <div>
        <h1>Quiz App</h1>

        {/* Formulaire pour créer ou rejoindre une room */}
        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <label>
          Room privée
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
          />
        </label>

        <button onClick={createRoom}>Créer une room</button>

        {/* Paramètres du quiz */}
        <div>
          <label>Limit</label>
          <input
            type="number"
            value={quizParams.limit}
            onChange={(e) => handleQuizParamChange(e, 'limit')}
          />
          <label>Category</label>
          <input
            type="text"
            value={quizParams.category}
            onChange={(e) => handleQuizParamChange(e, 'category')}
          />
          <label>Difficulty</label>
          <input
            type="text"
            value={quizParams.difficulty}
            onChange={(e) => handleQuizParamChange(e, 'difficulty')}
          />
          <label>Gamemode</label>
          <input
            type="text"
            value={quizParams.gamemode}
            onChange={(e) => handleQuizParamChange(e, 'gamemode')}
          />
        </div>

        {/* Liste des rooms disponibles */}
        <button onClick={getRooms}>Voir les rooms</button>
        
        <ul>
          {availableRooms.map((room, index) => (
            room.roomPin === null ? ( // Affiche seulement les rooms publiques
              <li key={index}>
                Room ID: {room.roomId} - {room.usersCount} joueurs
                <button onClick={() => joinRoom(room.roomId, null)}>Rejoindre</button>
              </li>
            ) : null // Ne pas afficher les rooms privées dans la liste
          ))}
        </ul>

        { (
          <div>
            <input
              type="text"
              placeholder="Entrez le pin"
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
            />
            <button onClick={() => joinRoom(roomId, enteredPin)}>Rejoindre</button>
          </div>
        )}

        {/* Message */}
        <p>{message}</p>
      </div>
    );
  }

  // Une fois dans la room, afficher uniquement les utilisateurs dans la room
  return (
    <div>
      <h1>Room: {roomId}</h1>
      <h3>Utilisateurs dans la room :</h3>
      <ul>
        {usersInRoom.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      {roomPinDisplay && <div>Pin de la room: {roomPinDisplay}</div>}
    </div>
  );
};

export default QuizApp;
