import { ChangeEvent, FormEvent, KeyboardEvent, MouseEvent } from "react";

export type Input = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type Submit = FormEvent<HTMLFormElement>;
export type KeyPress = KeyboardEvent<HTMLTextAreaElement>;
export type OnClick = MouseEvent<HTMLElement>;
