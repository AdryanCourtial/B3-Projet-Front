import { atom } from 'jotai';
import { Room } from '../types/room.type';
import { QuizParams } from '../types/quiz.type';

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
    category: "tv_cinema",
    difficulty: "facile",
    gamemode: "classic",
  });

