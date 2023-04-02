import { ChangeEvent, FormEvent, KeyboardEvent } from "react";

export type Input = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type Submit = FormEvent<HTMLFormElement>;
export type KeyPress = KeyboardEvent<HTMLTextAreaElement>;
