import styled from "styled-components";

import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type Size = "smaller" | "small" | "medium" | "large";
type FontWeight = keyof typeof Styles.fontWeights;

type SharedProps = {
  size: Size;
  maxWidth?: string;
  borderRadius?: Types.PxAsRem;
  borderThickness?: number;
  fontWeight?: FontWeight;
  disabled?: boolean;
  compact?: true;
};

type Props = {
  color?: string;
  hoverColor?: string;

  background?: string;
  hoverBackground?: string;

  border?: string;
  hoverBorder?: string;
} & SharedProps;

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

type ButtonProps = {
  type?: "submit" | "button";
  onClick?: () => void;
  selected?: boolean;
  children: React.ReactNode;
} & SharedProps;

export const NeutralButton = (props: ButtonProps) => {
  const { theme } = Functions.useSignalsStore().ui;
  return (
    <Button
      type={props.type || "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      size={props.size}
      maxWidth={props.maxWidth}
      borderRadius={props.borderRadius}
      borderThickness={props.borderThickness}
      fontWeight={props.fontWeight}
      color={Styles.background[theme.value].eight}
      hoverColor={Styles.text[theme.value]}
      background={Styles.background[theme.value].four}
      hoverBackground={Styles.background[theme.value].five}
      compact={props.compact}
    >
      {props.children}
    </Button>
  );
};

export const NeutralButtonOutlined = (props: ButtonProps) => {
  const { theme } = Functions.useSignalsStore().ui;
  return (
    <Button
      type={props.type || "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      size={props.size}
      maxWidth={props.maxWidth}
      borderRadius={props.borderRadius}
      borderThickness={props.borderThickness}
      color={Styles.background[theme.value].seven}
      hoverColor={Styles.text[theme.value]}
      background={Styles.background[theme.value].one}
      hoverBackground={Styles.background[theme.value].two}
      border={Styles.background[theme.value].four}
      hoverBorder={Styles.background[theme.value].five}
      compact={props.compact}
    >
      {props.children}
    </Button>
  );
};

export const NeutralPillButton = (props: ButtonProps) => {
  const { theme } = Functions.useSignalsStore().ui;
  return (
    <Button
      type={props.type || "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      size={props.size}
      maxWidth={props.maxWidth}
      borderRadius="fortyEight"
      color={
        props.selected
          ? Styles.background[theme.value].one
          : Styles.background[theme.value].seven
      }
      hoverColor={
        props.selected
          ? Styles.background[theme.value].one
          : Styles.text[theme.value]
      }
      background={
        props.selected
          ? Styles.text[theme.value]
          : Styles.background[theme.value].one
      }
      hoverBackground={
        props.selected
          ? Styles.text[theme.value]
          : Styles.background[theme.value].three
      }
      border={
        props.selected
          ? Styles.text[theme.value]
          : Styles.background[theme.value].four
      }
      hoverBorder={
        props.selected
          ? Styles.text[theme.value]
          : Styles.background[theme.value].six
      }
      compact={props.compact}
    >
      {props.children}
    </Button>
  );
};

export const PrimaryButton = (props: ButtonProps) => {
  const { theme } = Functions.useSignalsStore().ui;
  return (
    <Button
      type={props.type || "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      size={props.size}
      maxWidth={props.maxWidth}
      borderRadius={props.borderRadius}
      borderThickness={props.borderThickness}
      color={Styles.text.button}
      background={Styles.primary[theme.value].main}
      hoverBackground={Styles.primary[theme.value].darker}
      compact={props.compact}
    >
      {props.children}
    </Button>
  );
};

export const PrimaryButtonOutlined = (props: ButtonProps) => {
  const { theme } = Functions.useSignalsStore().ui;
  return (
    <Button
      type={props.type || "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      size={props.size}
      maxWidth={props.maxWidth}
      borderRadius={props.borderRadius}
      borderThickness={props.borderThickness}
      color={Styles.primary[theme.value].main}
      border={Styles.primary[theme.value].main}
      hoverBorder={Styles.primary[theme.value].darker}
      compact={props.compact}
    >
      {props.children}
    </Button>
  );
};

export const SecondaryButton = (props: ButtonProps) => {
  const { theme } = Functions.useSignalsStore().ui;
  return (
    <Button
      type={props.type || "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      size={props.size}
      maxWidth={props.maxWidth}
      borderRadius={props.borderRadius}
      borderThickness={props.borderThickness}
      color={Styles.text.button}
      background={Styles.secondary[theme.value].main}
      hoverBackground={Styles.secondary[theme.value].darker}
      compact={props.compact}
    >
      {props.children}
    </Button>
  );
};

export const SecondaryButtonOutlined = (props: ButtonProps) => {
  const { theme } = Functions.useSignalsStore().ui;
  return (
    <Button
      type={props.type || "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      size={props.size}
      maxWidth={props.maxWidth}
      borderRadius={props.borderRadius}
      borderThickness={props.borderThickness}
      color={Styles.primary[theme.value].main}
      border={Styles.primary[theme.value].main}
      hoverBorder={Styles.primary[theme.value].darker}
      compact={props.compact}
    >
      {props.children}
    </Button>
  );
};
