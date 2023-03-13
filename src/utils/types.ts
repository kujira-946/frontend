import { ChangeEvent, FormEvent } from "react";
import { pxAsRem } from "./sizes";

// ↓↓↓ Form ↓↓↓ //

export type Input = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type Submit = FormEvent<HTMLFormElement>;

// ↓↓↓ Logbook ↓↓↓ //

export type Category = "Need" | "Planned" | "Impulse" | "Regret";

export type Purchase = {
  description: string;
  cost: string;
};

// ↓↓↓ SVG ↓↓↓ //

export type SVGProps = {
  height: number;
  fill: string;
  hovered?: boolean;
  hoveredFill?: string;
};

// ↓↓↓ Styles ↓↓↓ //

export type PxAsRem = keyof typeof pxAsRem;

// ↓↓↓ Sagas ↓↓↓ //

export type SagaAction<Payload> = {
  type: string;
  payload: Payload;
};
