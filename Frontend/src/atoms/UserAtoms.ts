import { atom } from 'jotai';

export const userPseudo = atom<string>("")

export const currentviewEtat = atom<string>("")

export const pin = atom<string | null>('')

export const etatRoom = atom<boolean>(false)

export const usersInRoomAtom = atom<{ pseudo: string; role: string }[]>([]);

export const roomIdAtom = atom<string>("")

