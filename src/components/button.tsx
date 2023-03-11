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

type Props = {
  size: Size;
  maxWidth?: number;
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
  width: 100%;
  max-width: ${(props) => props.maxWidth}px;
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
  color: ${(props: Props & ThemeProps) => {
    return props.outlined ? props.color : Colors.text.button;
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
          : Colors.text.button;
      }};
      background-color: ${(props) => {
        return props.outlined ? "transparent" : props.hoverColor || props.color;
      }};
      border: ${(props) => `${props.hoverColor || props.color} solid 1px`};
    }
  }
`;
