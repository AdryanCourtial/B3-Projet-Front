import { Categories, Difficulties } from "./gameOptions"

export interface QuizQuestionsResponseInterface {
    count: number,
    quizzes: Question[]
}

export type Question = {
    _id: string,
    question: string,
    answer: string,
    badAnswers: string[],
    category: Categories,
    difficulty: Difficulties
}

export type QuizStatus = "finish" | "stat" | "question"