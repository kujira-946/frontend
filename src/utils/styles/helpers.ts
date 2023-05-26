import { css } from "styled-components";

import * as Sizes from "./sizes";
import { PxAsRem } from "../types";

export function setMediaPaddings(
  desktopVerticalPadding?: PxAsRem,
  tabletVerticalPadding?: PxAsRem,
  mobileVerticalPadding?: PxAsRem
) {
  return css`
    @media (max-width: ${Sizes.widths.desktop + 48}px) {
      padding: ${desktopVerticalPadding
          ? Sizes.pxAsRem[desktopVerticalPadding]
          : "0rem"}
        ${Sizes.pxAsRem.twentyFour};
    }

    @media (max-width: ${Sizes.widths.tablet}px) {
      padding: ${tabletVerticalPadding
          ? Sizes.pxAsRem[tabletVerticalPadding]
          : desktopVerticalPadding
          ? Sizes.pxAsRem[desktopVerticalPadding]
          : "0rem"}
        ${Sizes.pxAsRem.twenty};
    }

    @media (max-width: ${Sizes.widths.mobile}px) {
      padding: ${mobileVerticalPadding
          ? Sizes.pxAsRem[mobileVerticalPadding]
          : desktopVerticalPadding
          ? Sizes.pxAsRem[desktopVerticalPadding]
          : "0rem"}
        ${Sizes.pxAsRem.sixteen};
    }
  `;
}

export const transition = css`
  transition: 0.1s ease-in;
`;

export const clearButton = css`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  border-radius: 0;
  outline: none;
  cursor: pointer;

  ${transition};

  @media (hover: hover) {
    :hover {
      color: inherit;
      text-decoration: none;
    }
  }
`;

export const clearLink = css`
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-decoration: none;
  cursor: pointer;

  ${transition};

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
