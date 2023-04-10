import * as React from "react";

export type Input = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type Submit = React.FormEvent<HTMLFormElement>;
export type KeyPress = React.KeyboardEvent<HTMLTextAreaElement>;
export type OnClick = React.MouseEvent<HTMLElement>;
