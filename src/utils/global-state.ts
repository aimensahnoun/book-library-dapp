import { atom } from "jotai";

export type Event = {
  type: "add" | "borrow" | "return";
  bookId: string;
  name?: string;
  user?: string;
  transcationHash: string;
};

export const navbarHeightAtom = atom<number>(0);
export const transactionHashesAtom = atom<string[]>([]);
export const eventsAtom = atom<Event[]>([]);