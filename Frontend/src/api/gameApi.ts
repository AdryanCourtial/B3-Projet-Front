import { socket } from "../config/socket.config";

export const nextQuestionForTimer = (roomId: string) => {
  socket.emit('nextQuestion', roomId);
};

export const restartGame = (roomId: string) => {
  socket.emit('restartGame', roomId);
};

export const returnLobby = (roomId: string) => {
  socket.emit('leaveRoom', roomId); 
};

export const RedirectToLobby = (roomId: string) => {
    socket.emit('redirectToLobby', roomId);
};