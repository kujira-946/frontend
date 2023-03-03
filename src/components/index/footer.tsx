import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import { ThemeProps } from "../layout";
import { useContext } from "react";
import { SignalsStoreContext } from "@/pages/_app";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  padding: 100px 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100%;
  max-width: ${Sizes.widths.content}px;
`;

const Body = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const BodyLinks = styled.div`
  display: flex;
  gap: 40px;
`;

const BodyLinkGroup = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Sizes.pxAsRem.eight};
`;

const BodyLinkHeader = styled.h5`
  ${(props: ThemeProps) => {
    return Styles.setText("fourteen", "semiBold", props.theme.text);
  }};
  margin: 0 0 ${Sizes.pxAsRem.four}; ;
`;

const BodyLinkRegister = styled(Link)`
  ${(props: ThemeProps) => {
    return Styles.setText(
      "twelve",
      "medium",
      props.theme.primaryMain,
      props.theme.primaryDark
    );
  }};
`;

const BodyLink = styled(Link)`
  ${(props: ThemeProps) => {
    return Styles.setText(
      "twelve",
      "medium",
      props.theme.backgroundSeven,
      props.theme.text
    );
  }};
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
  gap: ${Sizes.pxAsRem.twenty};
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

const legalLinks = {
  privacy: "Privacy Policy",
  terms: "Terms",
  refunds: "Refunds",
};

export const Footer = () => {
  const { ui } = useContext(SignalsStoreContext);

  return (
    <Container>
      <Content>
        <Body>
          <Image
            src={
              ui.theme.value === "light"
                ? "/logo-text-outlined-light.svg"
                : "/logo-text-outlined-dark.svg"
            }
            alt="Logo Text"
            width={100}
            height={30.55}
          />
          <BodyLinks>
            <BodyLinkGroup>
              <BodyLinkHeader>Navigation</BodyLinkHeader>
              <BodyLinkRegister href="/register">Register</BodyLinkRegister>
              <BodyLink href="/login">Log In</BodyLink>
            </BodyLinkGroup>
          </BodyLinks>
        </Body>

        <CopyrightAndLegal>
          <Copyright>© 2023 Kujira. All rights reserved.</Copyright>
          <LegalLinks>
            {Object.entries(legalLinks).map((link: [string, string]) => {
              return (
                <LegalLink key={`/${link[0]}`} href={`/${link[0]}`}>
                  {link[1]}
                </LegalLink>
              );
            })}
          </LegalLinks>
        </CopyrightAndLegal>
      </Content>
    </Container>
  );
};
