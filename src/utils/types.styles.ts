import { pxAsRem } from "./sizes";

export type SVGProps = {
  height: number;
  fill: string;
  hovered?: boolean;
  hoveredFill?: string;
};

export type PxAsRem = keyof typeof pxAsRem;
