import { atom } from "jotai";
import { QuizQuestionsResponseInterface, QuizStatus } from "../types/quizQuestions";

export const questionAtom = atom<QuizQuestionsResponseInterface | null>(null)

export const questionIndexAtom = atom<number>(0)

export const quizStatusAtom = atom<QuizStatus>("question")

