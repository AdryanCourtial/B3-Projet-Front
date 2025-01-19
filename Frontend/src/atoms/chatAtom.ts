import { atom } from "jotai";
import { ChatInterface } from "../types/chat.interface";

export const inputChatAtom = atom<Array<ChatInterface>>([])