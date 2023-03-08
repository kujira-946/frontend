import styled from "styled-components";

import * as Colors from "@/utils/colors";
import * as Sizes from "@/utils/sizes";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type Size = "smaller" | "small" | "medium" | "large";

type ContainerProps = {
  size: Size;
  color: string;
  hoverColor?: string;
  outlined?: true;
};

const Container = styled.button<ContainerProps>`
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
  color: ${(props: ContainerProps & ThemeProps) => {
    return props.outlined ? props.color : props.theme.text;
  }};
  background-color: ${(props) => {
    return props.outlined ? "transparent" : props.color;
  }};
  border: ${(props) => `${props.color} solid 1px`};
  font-size: ${(props) => {
    if (props.size === "smaller") return Sizes.pxAsRem.ten;
    else if (props.size === "small") return Sizes.pxAsRem.twelve;
    else if (props.size === "medium") return Sizes.pxAsRem.fourteen;
    else return Sizes.pxAsRem.eighteen;
  }};
  font-weight: ${Sizes.fontWeights.semiBold};
  outline: none;
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      color: ${(props: ContainerProps & ThemeProps) => {
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

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  onClick?: VoidFunction;
  size: Size;
  borderRadius?: Types.PxAsRem;
  color: string;
  hoverColor?: string;
  outlined?: true;
  children: React.ReactNode;
};

export const Button = (props: Props) => {
  return (
    <Container
      onClick={props.onClick}
      style={{
        borderRadius: props.borderRadius
          ? Sizes.pxAsRem[props.borderRadius]
          : Sizes.pxAsRem.six,
      }}
      size={props.size}
      color={props.color}
      hoverColor={props.hoverColor}
      outlined={props.outlined}
    >
      {props.children}
    </Container>
  );
};
