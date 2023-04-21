import styled from "styled-components";

import * as Styles from "@/utils/styles";
import { PxAsRem } from "@/utils/types";
import { ThemeProps } from "./layout";

type Props = {
  borderRadius?: PxAsRem;
  disabled?: boolean;
};

export const SubmitButton = styled.button.attrs(() => ({
  type: "submit",
}))<Props>`
  ${Styles.clearButton};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${Styles.pxAsRem.fortyFour};
  color: ${Styles.text.button};
  background-color: ${(props: ThemeProps) => props.theme.primaryMain};
  border-radius: ${(props) => {
    return props.borderRadius
      ? Styles.pxAsRem[props.borderRadius]
      : Styles.pxAsRem.six;
  }};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.semiBold};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: pointer;

  ${(props) => props.disabled && Styles.preventUserInteraction};
  ${Styles.transition};

  @media (hover: hover) {
    :hover {
      color: ${Styles.text.button};
      background-color: ${(props: ThemeProps) => props.theme.primaryDark};
    }
  }
`;
