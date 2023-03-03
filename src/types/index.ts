import * as React from "react";

// ↓↓↓ Form ↓↓↓ //

export type Input = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type Submit = React.FormEvent<HTMLFormElement>;

// ↓↓↓ Logbook ↓↓↓ //

export type Category = "need" | "planned" | "impulse";
