import { atom } from "jotai";

const userAtom = atom<any>(null)
const socketAtom = atom<any>(null)

export {
    userAtom,
    socketAtom
}