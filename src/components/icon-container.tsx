import styled from "styled-components";

import { clearButton } from "@/utils/styles";

export const IconContainer = styled.button.attrs(() => ({
  type: "button",
}))`
  ${clearButton};
  display: flex;
  justify-content: center;
  align-items: center;
`;
