import styled from "styled-components";

import * as Colors from "@/utils/colors";
import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type Size = "smaller" | "small" | "medium" | "large";
type FontWeight = keyof typeof Sizes.fontWeights;

type Props = {
  size: Size;
  maxWidth?: string;
  borderRadius?: Types.PxAsRem;
  borderThickness?: number;
  fontWeight?: FontWeight;

  color?: string;
  hoverColor?: string;

  background?: string;
  hoverBackground?: string;

  border?: string;
  hoverBorder?: string;

  disabled?: boolean;
  compact?: true;
};

export const Button = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Sizes.pxAsRem.eight};

  width: ${(props) => (props.compact ? "auto" : "100%")};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => {
    if (props.size === "smaller") return Sizes.pxAsRem.twentySix;
    else if (props.size === "small") return Sizes.pxAsRem.thirtyTwo;
    else if (props.size === "medium") return Sizes.pxAsRem.thirtyEight;
    else return Sizes.pxAsRem.fortyEight;
  }};

  margin: 0;
  padding: ${(props) => {
    if (props.size === "smaller") {
      return `${Sizes.pxAsRem.six} ${Sizes.pxAsRem.ten}`;
    } else if (props.size === "small") {
      return `${Sizes.pxAsRem.eight} ${Sizes.pxAsRem.twelve}`;
    } else if (props.size === "medium") {
      return `${Sizes.pxAsRem.ten} ${Sizes.pxAsRem.fourteen}`;
    } else {
      return `${Sizes.pxAsRem.twelve} ${Sizes.pxAsRem.eighteen}`;
    }
  }};

  color: ${(props) => props.color || Colors.text.button};
  background-color: ${(props) => props.background || "transparent"};

  border: ${(props) => {
    return props.border
      ? `${props.border} solid ${props.borderThickness || 1}px`
      : `transparent solid ${props.borderThickness || 1}px`;
  }};
  border-radius: ${(props) => {
    return props.borderRadius
      ? Sizes.pxAsRem[props.borderRadius]
      : Sizes.pxAsRem.six;
  }};

  font-size: ${(props) => {
    if (props.size === "smaller") return Sizes.pxAsRem.ten;
    else if (props.size === "small") return Sizes.pxAsRem.twelve;
    else if (props.size === "medium") return Sizes.pxAsRem.fourteen;
    else return Sizes.pxAsRem.eighteen;
  }};
  font-weight: ${(props) => props.fontWeight || Sizes.fontWeights.semiBold};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  outline: none;
  cursor: pointer;

  ${(props) => props.disabled && Styles.preventUserInteraction};

  @media (hover: hover) {
    :hover {
      color: ${(props) => {
        return props.hoverColor || props.color || Colors.text.button;
      }};
      background-color: ${(props) => {
        return props.hoverBackground || props.background || "transparent";
      }};
      border: ${(props) => {
        return props.hoverBorder
          ? `${props.hoverBorder} solid ${props.borderThickness || 1}px`
          : props.border
          ? `${props.border} solid ${props.borderThickness || 1}px`
          : `transparent solid ${props.borderThickness || 1}px`;
      }};
    }
  }
`;
