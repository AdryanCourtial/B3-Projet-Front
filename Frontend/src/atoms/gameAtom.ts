import { atom } from "jotai";
import { QuizQuestionsResponseInterface, QuizStatus } from "../types/quizQuestions";
import { shuffle } from "../services/utils";

export const questionAtom = atom<QuizQuestionsResponseInterface | null>(null)

export const questionIndexAtom = atom<number>(0)

export const quizStatusAtom = atom<QuizStatus>("question")

export const answerChoosedAtom = atom<string | null>(null)

export const arrayRandomizeAtom = atom<Array<number>>(shuffle([0, 1, 2, 3]))

export const randomizeArrayAswerAtom = atom(
    null,
    (_, set) => {
      set(arrayRandomizeAtom, shuffle([0, 1, 2, 3]));
      console.log("TESSSST")
    }
  );
