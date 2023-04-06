import { pxAsRem } from "../styles";

export type SVGProps = {
  width?: number | string;
  height: number | string;
  fill: string;
  hoveredFill?: string;
  addHover?: true;
};

export type PxAsRem = keyof typeof pxAsRem;
