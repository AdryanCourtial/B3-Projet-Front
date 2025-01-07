import { QuizParams } from "./quizParameter.interface";
import { User } from "./users.interface";

export interface Room {
    name: string;
    room_id: string;
    room_pin: string | null; 
    users: User[];
    options: QuizParams;
  }