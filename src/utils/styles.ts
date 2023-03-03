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
  border: none;
  outline: none;
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      color: inherit;
      text-decoration: none;
    }
  }
`;

type ButtonSize = "smaller" | "small" | "medium" | "large";
export function setButton(
  buttonSize: ButtonSize,
  backgroundColor: string,
  hoverBackgroundColor: string,
  outlined: boolean = false,
  borderRadius: number = 6
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
    border-radius: ${borderRadius}px;
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

export const inputStyles = css`
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;

  ::placeholder {
    ${(props: ThemeProps) => props.theme.backgroundSeven};
  }

  :hover {
    background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
    border: ${(props: ThemeProps) => props.theme.backgroundSix} solid 1px;
  }
`;

export const cardStyles = css`
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;

  :hover {
    background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
    border: ${(props: ThemeProps) => props.theme.backgroundSix} solid 1px;
  }
`;
