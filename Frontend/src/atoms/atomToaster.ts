import { atom } from "jotai";
import { Toaster } from "../types/Toaster";

export const toasterArrayAtom = atom<Array<Toaster>>([])