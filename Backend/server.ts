import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { userInfo } from 'os';

const app = express();
const server = createServer(app); // http
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Permet l'accès depuis ton frontend React
    methods: ['GET', 'POST'],       // Permet les méthodes GET et POST
    allowedHeaders: ['Content-Type'], // Spécifie les headers autorisés
  },
});

// Définition des types pour les utilisateurs et les rooms
interface User {
  pseudo: string;
  role: string;
  uuid: string; 
  points: number;
  alive: boolean;
}

interface QuizParams {
  limit: number;
  category: string;
  difficulty: string;
  gamemode: string;
}

interface Room {
  name: string;
  room_id: string;
  room_pin: string | null; 
  users: User[];
  options: QuizParams;
}

// Stocker les rooms avec leurs paramètres et les utilisateurs
let rooms: { [roomId: string]: Room } = {}; 

// Lorsqu'un utilisateur se connecte
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté', socket.id);

  // Quand un utilisateur crée une room
  socket.on('createRoom', (roomId: string, pseudo: string, quizParams: QuizParams, isPrivate: boolean) => {
    let roomPin: string | null = null;
    if (isPrivate) {
      // Générer un pin si la room est privée
      roomPin = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Exemple de génération de pin
    }

    rooms[roomId] = {
      name: roomId,           // Nom de la room
      room_id: roomId,        // ID de la room
      room_pin: roomPin,      // Pin de la room ou null si public
      users: [{               // Liste des utilisateurs avec les nouvelles informations
        pseudo: pseudo,
        role: 'player',       // Exemple de rôle
        uuid: socket.id,      // Utilisation du socket.id comme identifiant unique
        points: 0,
        alive: true
      }],
      options: quizParams     // Options du quiz
    };

    console.log(rooms[roomId].users);
    socket.join(roomId); // Ajouter l'utilisateur à la room
    console.log(`${pseudo} a créé la room ${roomId} avec les paramètres`, quizParams);

      io.to(roomId).emit('message', `${pseudo} a créé la room avec les paramètres: ${JSON.stringify(quizParams)}`);
    socket.emit('roomCreated', { roomId, roomPin, pseudo });

  });

  // Quand un utilisateur rejoint une room
  socket.on('joinRoom', (roomId: string, pseudo: string, roomPin: string | null) => {
    const room = rooms[roomId];
    
    if (room) {
      if (room.room_pin && room.room_pin !== roomPin) {
        socket.emit('error', 'Pin incorrect ou manquant pour la room privée.');
        return;
      }

      // Ajouter l'utilisateur à la room
      room.users.push({
        pseudo: pseudo,
        role: 'player',       // Rôle initial
        uuid: socket.id,      // ID unique
        points: 0,
        alive: true
      });
      socket.join(roomId);
      console.log(`${pseudo} a rejoint la room ${roomId}`);

      // Envoyer les informations du quiz à l'utilisateur qui rejoint
      socket.emit('startQuiz', room.options);

      // Informer les autres utilisateurs dans la room que quelqu'un a rejoint
      io.to(roomId).emit('message', `${pseudo} a rejoint la room`);

      // Mettre à jour la liste des utilisateurs dans la room
      io.to(roomId).emit('updateUsers', room.users);
    } else {
      socket.emit('error', 'La room n\'existe pas.');
    }
  });

  // Afficher les rooms existantes
  socket.on('getRooms', () => {
    // Envoyer toutes les rooms disponibles au client
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
    // Rechercher une room par le PIN
    let roomFound = null;
    for (let roomId in rooms) {
      const room = rooms[roomId];
      // Si le PIN de la room correspond au PIN envoyé par l'utilisateur
      if (room.room_pin === enteredPin) {
        roomFound = room;
        break; // La room a été trouvée, on sort de la boucle
      }
    }

    if (roomFound) {
      // Si la room a été trouvée, ajouter l'utilisateur à la room
      roomFound.users.push({
        pseudo: pseudo,
        role: 'player',       // Rôle initial
        uuid: socket.id,      // ID unique
        points: 0,
        alive: true
      });

      socket.join(roomFound.room_id); // Ajouter l'utilisateur à la room via Socket.io
      console.log(`${pseudo} a rejoint la room ${roomFound.room_id}`);

      // Informer l'utilisateur que la room a démarré
      socket.emit('startQuiz', roomFound.options);

      // Informer les autres utilisateurs dans la room
      io.to(roomFound.room_id).emit('message', `${pseudo} a rejoint la room`);

      // Mettre à jour la liste des utilisateurs dans la room
      io.to(roomFound.room_id).emit('updateUsers', roomFound.users);

    } else {
      // Si aucune room n'a été trouvée avec ce PIN, renvoyer une erreur
      socket.emit('error', 'Pin incorrect ou manquant pour la room privée.');
    }
  });

    
  // Lorsqu'un utilisateur se déconnecte
  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté', socket.id);

    // Rechercher la room à laquelle l'utilisateur appartient
    for (let roomId in rooms) {
      const room = rooms[roomId];

      // Trouver l'utilisateur avec le socketId correspondant et le retirer
      const userIndex = room.users.findIndex(user => user.uuid === socket.id);
      if (userIndex !== -1) {
        const disconnectedUser = room.users[userIndex].pseudo;
        room.users.splice(userIndex, 1); // Retirer l'utilisateur de la liste des utilisateurs

        // Informer les autres utilisateurs que quelqu'un s'est déconnecté
        io.to(roomId).emit('message', `${disconnectedUser} s'est déconnecté`);

        // Mettre à jour la liste des utilisateurs dans la room
        io.to(roomId).emit('updateUsers', room.users);

        break; // Sortir de la boucle une fois l'utilisateur trouvé
      }
    }
  });
});

// Lancer le serveur
server.listen(4000, () => {
  console.log('Serveur démarré sur http://localhost:4000');
});