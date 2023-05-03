import styled from "styled-components";

import { clearButton } from "@/utils/styles";

type Props = {
  cursor?: "pointer" | "grab" | "default";
};

export const IconContainer = styled.button.attrs(() => ({
  type: "button",
  tabIndex: -1,
}))<Props>`
  ${clearButton};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => props.cursor || "pointer"};
`;
