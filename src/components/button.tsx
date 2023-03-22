import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type Size = "smaller" | "small" | "medium" | "large";
type FontWeight = keyof typeof Styles.fontWeights;

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
  gap: ${Styles.pxAsRem.eight};

  width: ${(props) => (props.compact ? "auto" : "100%")};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => {
    if (props.size === "smaller") return Styles.pxAsRem.twentySix;
    else if (props.size === "small") return Styles.pxAsRem.thirtyTwo;
    else if (props.size === "medium") return Styles.pxAsRem.thirtyEight;
    else return Styles.pxAsRem.fortyEight;
  }};

  margin: 0;
  padding: ${(props) => {
    if (props.size === "smaller") {
      return `${Styles.pxAsRem.six} ${Styles.pxAsRem.ten}`;
    } else if (props.size === "small") {
      return `${Styles.pxAsRem.eight} ${Styles.pxAsRem.twelve}`;
    } else if (props.size === "medium") {
      return `${Styles.pxAsRem.ten} ${Styles.pxAsRem.fourteen}`;
    } else {
      return `${Styles.pxAsRem.twelve} ${Styles.pxAsRem.eighteen}`;
    }
  }};

  color: ${(props) => props.color || Styles.text.button};
  background-color: ${(props) => props.background || "transparent"};

  border: ${(props) => {
    return props.border
      ? `${props.border} solid ${props.borderThickness || 1}px`
      : `transparent solid ${props.borderThickness || 1}px`;
  }};
  border-radius: ${(props) => {
    return props.borderRadius
      ? Styles.pxAsRem[props.borderRadius]
      : Styles.pxAsRem.six;
  }};

  font-size: ${(props) => {
    if (props.size === "smaller") return Styles.pxAsRem.ten;
    else if (props.size === "small") return Styles.pxAsRem.twelve;
    else if (props.size === "medium") return Styles.pxAsRem.fourteen;
    else return Styles.pxAsRem.eighteen;
  }};
  font-weight: ${(props) => props.fontWeight || Styles.fontWeights.semiBold};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  outline: none;
  cursor: pointer;

  ${(props) => props.disabled && Styles.preventUserInteraction};

  @media (hover: hover) {
    :hover {
      color: ${(props) => {
        return props.hoverColor || props.color || Styles.text.button;
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
