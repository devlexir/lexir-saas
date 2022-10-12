import { atom } from "jotai";

export const startDateAtom = atom(new Date("2020-01-01"));

export const endDateAtom = atom(new Date());

//moment().format("YYYY-MM-DD h:mm:ss")
