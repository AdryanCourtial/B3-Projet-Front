import { atom } from "jotai";
import { ChatInterface } from "../types/chat.interface";

export const inputChatAtom = atom<Array<ChatInterface>>([])

export const nameColorAtom = atom<string>('hsl(0, 50%, 50%)')