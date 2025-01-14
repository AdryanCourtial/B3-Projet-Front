import { atom } from 'jotai';
import { Room } from '../types/room.type';
import { QuizParams } from '../types/quiz.type';
import { QuizCategory, QuizDifficulty, QuizGameMode } from '../types/quiz.enum';

export const userPseudo = atom<string>("")

export const currentviewEtat = atom<string>("")

export const pin = atom<string | null>('')

export const etatRoom = atom<boolean>(false)

export const usersInRoomAtom = atom<{ pseudo: string; role: string; points: number }[]>([]);

export const roomIdAtom = atom<string>("")

export const messageServer = atom<string>('')

export const isPrivateAtom = atom<boolean>(false)

export const availableRoomsAtom = atom<Room[]>([]);

export const quizParamsData = atom<QuizParams>({
    limit: 5,
    category: QuizCategory.cinema,
    difficulty: QuizDifficulty.facile,
    gamemode: QuizGameMode.classic,
});
  
export const remainingTimeAtom = atom<number>(0)

export const isTimeUpAtom = atom<boolean>(false)

export const lisPublicRoomAtom = atom<boolean>(false) 
