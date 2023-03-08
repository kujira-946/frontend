import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type Size = "smaller" | "small" | "medium" | "large";

type Props = {
  size: Size;
  borderRadius?: Types.PxAsRem;
  color: string;
  hoverColor?: string;
  outlined?: true;
  disabled?: boolean;
};

export const Button = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Sizes.pxAsRem.eight};
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
  height: ${(props) => {
    if (props.size === "smaller") return Sizes.pxAsRem.fortyEight;
    else if (props.size === "small") return Sizes.pxAsRem.thirtyEight;
    else if (props.size === "medium") return Sizes.pxAsRem.thirtyTwo;
    else return Sizes.pxAsRem.twentySix;
  }};
  color: ${(props: Props & ThemeProps) => {
    return props.outlined ? props.color : props.theme.text;
  }};
  background-color: ${(props) => {
    return props.outlined ? "transparent" : props.color;
  }};
  border: ${(props) => `${props.color} solid 1px`};
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
  font-weight: ${Sizes.fontWeights.semiBold};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  outline: none;
  cursor: pointer;

  ${(props) => props.disabled && Styles.preventUserInteraction};

  @media (hover: hover) {
    :hover {
      color: ${(props: Props & ThemeProps) => {
        return props.outlined
          ? props.hoverColor || props.color
          : props.theme.text;
      }};
      background-color: ${(props) => {
        return props.outlined ? "transparent" : props.hoverColor || props.color;
      }};
      border: ${(props) => `${props.hoverColor || props.color} solid 1px`};
    }
  }
`;
