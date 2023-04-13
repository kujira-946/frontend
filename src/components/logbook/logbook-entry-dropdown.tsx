import styled from "styled-components";

import * as Styles from "@/utils/styles";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  border-radius: ${Styles.pxAsRem.six};
`;

const Header = styled.header`
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const LogbookEntryDropdown = () => {
  return (
    <Container>
      <Header></Header>
    </Container>
  );
};
