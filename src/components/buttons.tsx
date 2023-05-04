import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";

type ButtonProps = {
  type: "button" | "submit";
  size: "large" | "medium" | "small" | "smaller";
  borderRadius?: Types.PxAsRem;

  textColor?: string;
  textColorHover?: string;
  backgroundColor?: string;
  backgroundColorHover?: string;
  borderColor?: string;
  borderColorHover?: string;

  disabled?: boolean;
  primary?: true;
  outlined?: true;
};

export const Button = styled.button.attrs((props: ButtonProps) => ({
  type: props.type || "button",
}))<ButtonProps>`
  ${Styles.clearButton};
  ${Styles.transition};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Styles.pxAsRem.eight};
  width: 100%;
  padding: ${(props) => {
    if (props.size === "large") {
      return `${Styles.pxAsRem.eight} ${Styles.pxAsRem.sixteen}`;
    } else if (props.size === "medium") {
      return `${Styles.pxAsRem.eight} ${Styles.pxAsRem.fourteen}`;
    } else if (props.size === "small") {
      return `${Styles.pxAsRem.six} ${Styles.pxAsRem.ten}`;
    } else {
      return `${Styles.pxAsRem.four} ${Styles.pxAsRem.eight}`;
    }
  }};
  color: ${(props: ButtonProps & ThemeProps) => {
    return props.textColor || props.theme.text;
  }};
  background-color: ${(props: ButtonProps & ThemeProps) => {
    if (props.outlined) return "transparent";
    else if (props.primary) return props.theme.primaryMain;
    else if (props.backgroundColor) return props.backgroundColor;
    else return props.theme.backgroundOne;
  }};
  border: ${(props: ButtonProps & ThemeProps) => {
    if (props.outlined) {
      if (props.primary) return `${props.theme.primaryMain} solid 1px`;
      else if (props.borderColor) return `${props.borderColor} solid 1px`;
      else return `${props.theme.text} solid 1px`;
    } else {
      return "transparent";
    }
  }};
  border-radius: ${(props) => {
    return props.borderRadius
      ? Styles.pxAsRem[props.borderRadius]
      : Styles.pxAsRem.eight;
  }};
  font-size: ${(props) => {
    return props.size === "large"
      ? Styles.pxAsRem.sixteen
      : props.size === "medium"
      ? Styles.pxAsRem.fourteen
      : props.size === "small"
      ? Styles.pxAsRem.twelve
      : Styles.pxAsRem.ten;
  }};
  font-weight: ${Styles.fontWeights.semiBold};
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};

  ${(props) => props.disabled && Styles.preventUserInteraction};

  @media (hover: hover) {
    :hover {
      color: ${(props: ButtonProps & ThemeProps) => {
        return props.textColorHover || props.theme.text;
      }};
      background-color: ${(props: ButtonProps & ThemeProps) => {
        if (props.outlined) return "transparent";
        else if (props.primary) return props.theme.primaryDark;
        else if (props.backgroundColorHover) return props.backgroundColorHover;
        else return props.theme.backgroundTwo;
      }};
      border: ${(props: ButtonProps & ThemeProps) => {
        if (props.outlined) {
          if (props.primary) {
            return `${props.theme.primaryDark} solid 1px`;
          } else if (props.borderColorHover) {
            return `${props.borderColorHover} solid 1px`;
          } else {
            return `${props.theme.text} solid 1px`;
          }
        } else {
          return "transparent";
        }
      }};
    }
  }
`;

type IconButtonProps = {
  type: "button" | "submit";
  borderRadius?: Types.PxAsRem;
};

export const IconButton = styled.button.attrs((props: IconButtonProps) => ({
  type: props.type || "button",
}))<IconButtonProps>`
  ${Styles.clearButton};
  ${Styles.transition};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: ${Styles.pxAsRem.forty};
  height: ${Styles.pxAsRem.forty};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-radius: ${(props) => {
    return props.borderRadius
      ? Styles.pxAsRem[props.borderRadius]
      : Styles.pxAsRem.eight;
  }};

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
    }
  }
`;