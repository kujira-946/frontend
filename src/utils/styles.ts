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

export const transition = "transition: 0.1s ease-in;";

type Pixels = keyof typeof Sizes.pxAsRem;
type Weights = keyof typeof Sizes.fontWeights;
export function setText(fontSize: Pixels, fontWeight: Weights) {
  return css`
    ${transition};
    color: ${(props: ThemeProps) => props.theme.backgroundEight};
    font-size: ${Sizes.pxAsRem[fontSize]};
    font-weight: ${Sizes.fontWeights[fontWeight]};

    @media (hover: hover) {
      :hover {
        color: ${(props: ThemeProps) => props.theme.text};
        text-decoration: none;
      }
    }
  `;
}

export const basicButtonStyles = css`
  ${transition};
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
  inside: boolean = false
) {
  return css`
    ${basicButtonStyles};
    display: flex;
    justify-content: center;
    align-items: center;
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
    border-radius: ${inside ? "4px" : "6px"};
    font-size: ${(props) => {
      if (buttonSize === "smaller") return Sizes.fontSizes.smallerButtonFont;
      else if (buttonSize === "small") return Sizes.fontSizes.smallButtonFont;
      else if (buttonSize === "medium") return Sizes.fontSizes.mediumButtonFont;
      else return Sizes.fontSizes.largeButtonFont;
    }};
    font-weight: ${Sizes.fontWeights.semiBold};

    @media (hover: hover) {
      :hover {
        color: ${outlined ? hoverBackgroundColor : Colors.background.light.one};
        background-color: ${hoverBackgroundColor};
        border: ${outlined
          ? `${hoverBackgroundColor} solid 1px`
          : "transparent solid 1px"};
      }
    }
  `;
}
