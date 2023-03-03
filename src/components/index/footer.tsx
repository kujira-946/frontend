import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import { ThemeProps } from "../layout";
import Link from "next/link";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100%;
  max-width: ${Sizes.widths.content}px;

  border: red solid 1px;
`;

const CopyrightAndLegal = styled.section`
  display: flex;
  justify-content: space-between;
  transition: 0.1s ease-in;
`;

const Copyright = styled.span`
  ${(props: ThemeProps) => {
    return Styles.setText("ten", "medium", props.theme.backgroundSix);
  }};
  color: ${(props: ThemeProps) => props.theme.backgroundSix};
`;

const LegalLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LegalLink = styled(Link)`
  ${(props: ThemeProps) => {
    return Styles.setText(
      "ten",
      "medium",
      props.theme.backgroundSeven,
      props.theme.text
    );
  }};
  color: ${(props: ThemeProps) => props.theme.backgroundSeven};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const Footer = () => {
  return (
    <Container>
      <Content>
        <CopyrightAndLegal>
          <Copyright>© 2023 Kujira. All rights reserved.</Copyright>
          <LegalLinks>
            <LegalLink href="privacy-policy">Privacy Policy</LegalLink>
            <LegalLink href="terms">Terms</LegalLink>
            <LegalLink href="refunds">Refunds</LegalLink>
          </LegalLinks>
        </CopyrightAndLegal>
      </Content>
    </Container>
  );
};
