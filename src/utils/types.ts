import { ThemeProps } from "@/components/layout";

export type SVGProps = {
  height: number;
  fill: string;
  hovered?: boolean;
};

export type IconProps = SVGProps & ThemeProps;
