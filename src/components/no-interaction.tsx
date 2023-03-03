import styled from "styled-components";

import { preventUserInteraction } from "@/utils/styles";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.div`
  ${preventUserInteraction};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = { children: React.ReactNode };

export const NoInteraction = (props: Props) => {
  return <Container>{props.children}</Container>;
};
