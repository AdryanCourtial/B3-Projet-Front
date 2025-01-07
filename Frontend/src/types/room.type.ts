import { type QuizParams } from './quiz.type';


export interface Room {
  roomId: string;
  roomPin: string | null;
  quizParams: QuizParams;
  users: { pseudo: string, socketId: string }[];
  usersCount: number;
}
