import { socket } from "../config/socket.config";

export const nextQuestionForTimer = (roomId: string) => {
  socket.emit('nextQuestion', roomId);
};