import { css } from "styled-components";

import * as Sizes from "./sizes";
import { PxAsRem } from "../types";

export function setMediaPaddings(verticalPadding?: PxAsRem) {
  return css`
    @media (max-width: ${Sizes.widths.desktop}px) {
      padding: ${verticalPadding ? Sizes.pxAsRem[verticalPadding] : "0rem"} 24px;
    }

    @media (max-width: ${Sizes.widths.tablet}px) {
      padding: ${verticalPadding ? Sizes.pxAsRem[verticalPadding] : "0rem"}rem
        20px;
    }

    @media (max-width: ${Sizes.widths.mobile}px) {
      padding: ${verticalPadding ? Sizes.pxAsRem[verticalPadding] : "0rem"}rem
        14px;
    }
  `;
}

export const clearButton = css`
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

export const preventUserInteraction = css`
  pointer-events: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const transition = css`
  transition: 0.1s ease-in;
`;
