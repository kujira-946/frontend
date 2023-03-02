import { ThemeProps } from "@/components/layout";

export type SVGProps = {
  height: number;
  fill: string;
  hovered?: boolean;
  hoveredFill?: string;
};

export type IconProps = SVGProps & ThemeProps;
