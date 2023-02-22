import { css } from "styled-components";

import * as Colors from "./colors";
import * as Sizes from "./sizes";
import { ThemeProp } from "./../pages/_app";

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

const transition = "transition: 0.1s ease-in;";

type Pixels = keyof typeof Sizes.pxAsRem;
export function setText(fontSize: Pixels) {
  return css`
    ${transition};
    color: ${(props: ThemeProp) => props.theme.backgroundSix};
    font-size: ${Sizes.pxAsRem[fontSize]};

    @media (hover: hover) {
      :hover {
        color: ${(props: ThemeProp) => props.theme.text};
        text-decoration: none;
      }
    }
  `;
}

const buttonStyles = css`
  ${transition};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.text.dark};
  border-radius: 4px;
  font-weight: ${Sizes.fontWeights.semiBold};

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
    ${buttonStyles};
    padding: ${(props) => {
      return buttonSize === "small"
        ? `${Sizes.pxAsRem.six} ${Sizes.pxAsRem.twelve}`
        : buttonSize === "medium"
        ? `${Sizes.pxAsRem.eight} ${Sizes.pxAsRem.sixteen}`
        : `${Sizes.pxAsRem.ten} ${Sizes.pxAsRem.twenty}`;
    }};
    background-color: ${(props: ThemeProp) => {
      if (buttonType === "primary") {
        return props.theme.primaryMain;
      } else {
        return props.theme.secondaryMain;
      }
    }};
    font-size: ${(props) => {
      if (buttonSize === "small") return Sizes.pxAsRem.twelve;
      else if (buttonSize === "medium") return Sizes.pxAsRem.fourteen;
      else return Sizes.pxAsRem.eighteen;
    }};

    @media (hover: hover) {
      :hover {
        background-color: ${(props: ThemeProp) => {
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
