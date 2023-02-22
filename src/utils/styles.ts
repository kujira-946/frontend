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

export function setText(fontSize: number) {
  return css`
    ${transition};
    color: ${(props: ThemeProp) => props.theme.backgroundSix};
    font-size: ${fontSize}px;

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
      if (buttonSize === "small") return "6px 12px";
      else if (buttonSize === "medium") return "8px 16px";
      else return "10px 20px";
    }};
    background-color: ${(props: ThemeProp) => {
      if (buttonType === "primary") {
        return props.theme.primaryMain;
      } else {
        return props.theme.secondaryMain;
      }
    }};
    font-size: ${(props) => {
      if (buttonSize === "small") return "12px";
      else if (buttonSize === "medium") return "14px";
      else return "18px";
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
