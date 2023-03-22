import { css } from "styled-components";

import * as Sizes from "./styles.sizes";

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
  user-select: none;
`;
