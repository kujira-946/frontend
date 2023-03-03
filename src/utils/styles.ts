import { css } from "styled-components";

import * as Colors from "./colors";
import * as Sizes from "./sizes";
import { ThemeProps } from "@/components/layout";

export function setMediaPaddings(verticalPadding?: number) {
  return css`
    @media (max-width: ${Sizes.widths.desktop}px) {
      padding: ${verticalPadding || 0}px 24px;
    }

    @media (max-width: ${Sizes.widths.tablet}px) {
      padding: ${verticalPadding || 0}px 20px;
    }

    @media (max-width: ${Sizes.widths.mobile}px) {
      padding: ${verticalPadding || 0}px 14px;
    }
  `;
}

export const basicButtonStyles = css`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  border-radius: 0;
  outline: none;
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      color: inherit;
      text-decoration: none;
    }
  }
`;

type BorderRadius = keyof typeof Sizes.pxAsRem;

type ButtonSize = "smaller" | "small" | "medium" | "large";
export function setButton(
  buttonSize: ButtonSize,
  backgroundColor: string,
  hoverBackgroundColor: string,
  outlined: boolean = false,
  borderRadius: BorderRadius = "six"
) {
  return css`
    ${basicButtonStyles};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    height: ${(props) => {
      if (buttonSize === "smaller") return Sizes.heights.smallerButtonHeight;
      else if (buttonSize === "small") return Sizes.heights.smallButtonHeight;
      else if (buttonSize === "medium") return Sizes.heights.mediumButtonHeight;
      else return Sizes.heights.largeButtonHeight;
    }};
    padding: ${(props) => {
      if (buttonSize === "smaller") {
        return `${Sizes.pxAsRem.four} ${Sizes.pxAsRem.ten}`;
      } else if (buttonSize === "small") {
        return `${Sizes.pxAsRem.six} ${Sizes.pxAsRem.twelve}`;
      } else if (buttonSize === "medium") {
        return `${Sizes.pxAsRem.eight} ${Sizes.pxAsRem.fourteen}`;
      } else {
        return `${Sizes.pxAsRem.ten} ${Sizes.pxAsRem.eighteen}`;
      }
    }};
    color: ${outlined ? backgroundColor : Colors.background.light.one};
    background-color: ${outlined ? "transparent" : backgroundColor};
    border: ${outlined
      ? `${backgroundColor} solid 1px`
      : "transparent solid 1px"};
    border-radius: ${Sizes.pxAsRem[borderRadius]};
    font-size: ${(props) => {
      if (buttonSize === "smaller") return Sizes.fontSizes.smallerButtonFont;
      else if (buttonSize === "small") return Sizes.fontSizes.smallButtonFont;
      else if (buttonSize === "medium") return Sizes.fontSizes.mediumButtonFont;
      else return Sizes.fontSizes.largeButtonFont;
    }};
    font-weight: ${Sizes.fontWeights.semiBold};
    transition: 0.1s ease-in;

    @media (hover: hover) {
      :hover {
        color: ${(props: ThemeProps) => {
          return outlined ? props.theme.text : Colors.background.light.one;
        }};
        background-color: ${outlined ? "transparent" : hoverBackgroundColor};
        border: ${(props: ThemeProps) => {
          return outlined
            ? `${props.theme.text} solid 1px`
            : "transparent solid 1px";
        }};
      }
    }
  `;
}

export const preventUserInteraction = css`
  pointer-events: none;
  user-select: none;
`;

export function inputStyles(
  borderRadius: BorderRadius = "six",
  hasValue: boolean = false
) {
  return css`
    color: ${(props: ThemeProps) => props.theme.text};
    background-color: ${(props: ThemeProps) => {
      return hasValue ? props.theme.backgroundTwo : props.theme.backgroundOne;
    }};
    border: ${(props: ThemeProps) => {
      return hasValue
        ? `${props.theme.backgroundTwo} solid 1px`
        : `${props.theme.backgroundFour} solid 1px`;
    }};
    border-radius: ${Sizes.pxAsRem[borderRadius]};
    outline: none;

    ::placeholder {
      ${(props: ThemeProps) => props.theme.backgroundSeven};
    }

    :hover {
      color: ${(props: ThemeProps) => props.theme.text};
      background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
      border: ${(props: ThemeProps) => props.theme.backgroundSix} solid 1px;
    }
  `;
}
