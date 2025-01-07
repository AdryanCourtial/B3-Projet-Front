import { atom } from "jotai";
import { QuizQuestionsResponseInterface } from "../types/quizQuestions";

export const questionAtom = atom<QuizQuestionsResponseInterface | null>(null)
