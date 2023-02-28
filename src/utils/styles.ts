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
export function setText(fontSize: Pixels) {
  return css`
    ${transition};
    color: ${(props: ThemeProps) => props.theme.backgroundSix};
    font-size: ${Sizes.pxAsRem[fontSize]};

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

type ButtonType = "primary" | "secondary";
type ButtonSize = "small" | "medium" | "large";
export function setButton(buttonType: ButtonType, buttonSize: ButtonSize) {
  return css`
    ${basicButtonStyles};
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => {
      return buttonSize === "small"
        ? Sizes.widths.smallButtonHeight
        : buttonSize === "medium"
        ? Sizes.widths.mediumButtonHeight
        : Sizes.widths.largeButtonHeight;
    }};
    padding: ${(props) => {
      return buttonSize === "small"
        ? `0 ${Sizes.pxAsRem.twelve}`
        : buttonSize === "medium"
        ? `0 ${Sizes.pxAsRem.sixteen}`
        : `0 ${Sizes.pxAsRem.twenty}`;
    }};
    color: ${Colors.background.light.one};
    background-color: ${(props: ThemeProps) => {
      if (buttonType === "primary") {
        return props.theme.primaryMain;
      } else {
        return props.theme.secondaryMain;
      }
    }};
    border-radius: 4px;
    font-size: ${(props) => {
      if (buttonSize === "small") return Sizes.pxAsRem.twelve;
      else if (buttonSize === "medium") return Sizes.pxAsRem.fourteen;
      else return Sizes.pxAsRem.eighteen;
    }};
    font-weight: ${Sizes.fontWeights.semiBold};

    @media (hover: hover) {
      :hover {
        color: ${Colors.text.dark};
        background-color: ${(props: ThemeProps) => {
          if (buttonType === "primary") {
            return props.theme.primaryDark;
          } else {
            return props.theme.secondaryDark;
          }
        }};
      }
    }
  `;
}
