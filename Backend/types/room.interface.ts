import { User } from "./user.interface";
import { QuizParams } from "./quizParams.interface";
import { GameState } from "./game.enum";

export interface Room {
    name: string;
    room_id: string;
    room_pin: string | null; 
    users: User[];
    options: QuizParams;
    gameState: GameState
}