import { QuizCategory, QuizDifficulty, QuizGameMode } from "./quiz.enum";

export interface QuizParams {
  limit: number;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  gamemode: QuizGameMode;
}

