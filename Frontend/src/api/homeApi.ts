// homeApi.ts

import { socket } from "../config/socket.config";
import { QuizParams } from "../types/quiz.type";


// Fonction pour créer une room
export const createRoom = (roomId: string, pseudo: string, quizParams: QuizParams, isPrivate: boolean) => {
  socket.emit('createRoom', roomId, pseudo, quizParams, isPrivate);
};

// Fonction pour rejoindre une room
export const joinRoom = (roomId: string, pseudo: string) => {
  socket.emit('joinRoom', roomId, pseudo);
};

// Fonction pour rejoindre une room en utilisant un PIN
export const joinRoomByPin = (enteredPin: string, pseudo: string) => {
  socket.emit('joinRoomByPin', enteredPin, pseudo);
};

// Fonction pour récupérer toutes les rooms disponibles
export const getRooms = () => {
  socket.emit('getRooms');
};

// Fonction pour démarrer le jeu
export const startGame = (roomId: string) => {
  socket.emit('startGame', roomId);
};


export const endRoom = (roomId: string) => {
   socket.emit('endRoom', roomId)
}

export const onMessage = (message: string, users: string, roomId: string) => {
  socket.emit('onMessage', message, users, roomId)
}