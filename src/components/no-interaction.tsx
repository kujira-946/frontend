import styled from "styled-components";

import * as Styles from "@/utils/styles";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.div`
  ${Styles.preventUserInteraction};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = { children: React.ReactNode };

export const NoInteraction = (props: Props) => {
  return <Container>{props.children}</Container>;
};
