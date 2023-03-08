import * as React from "react";
import { pxAsRem } from "./sizes";

// ↓↓↓ Form ↓↓↓ //

export type Input = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type Submit = React.FormEvent<HTMLFormElement>;

// ↓↓↓ Logbook ↓↓↓ //

export type Category = "Need" | "Planned" | "Impulse";

// ↓↓↓ SVG ↓↓↓ //

export type SVGProps = {
  height: number;
  fill: string;
  hovered?: boolean;
  hoveredFill?: string;
};

// ↓↓↓ Styles ↓↓↓ //

export type PxAsRem = keyof typeof pxAsRem;
