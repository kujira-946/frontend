import { ChangeEvent, FormEvent } from "react";

export type Input = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type Submit = FormEvent<HTMLFormElement>;
