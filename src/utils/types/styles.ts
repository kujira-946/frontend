import { pxAsRem } from "../styles";

export type SVGProps = {
  height: number;
  fill: string;
  hovered?: boolean;
  hoveredFill?: string;
};

export type PxAsRem = keyof typeof pxAsRem;
