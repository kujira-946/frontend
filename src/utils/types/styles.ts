import { pxAsRem } from "../styles";

export type SVGProps = {
  width?: number | string;
  height: number | string;
  fill: string;
  hovered?: boolean;
  hoveredFill?: string;
};

export type PxAsRem = keyof typeof pxAsRem;
