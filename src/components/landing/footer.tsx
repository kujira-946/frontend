import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useContext } from "react";

import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "@/components/layout";

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
  align-items: flex-start;
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
  color: ${(props: ThemeProps) => props.theme.text};
`;

const BodyLinkHeader = styled.h5`
  margin: 0 0 ${Sizes.pxAsRem.four};
  font-size: ${Sizes.pxAsRem.fourteen};
  font-weight: ${Sizes.fontWeights.semiBold};
`;

const BodyLinkRegister = styled(Link)`
  color: ${(props: ThemeProps) => props.theme.primaryMain};
  font-size: ${Sizes.pxAsRem.twelve};
  font-weight: ${Sizes.fontWeights.medium};

  :hover {
    color: ${(props: ThemeProps) => props.theme.primaryDark};
  }
`;

const BodyLink = styled(Link)`
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  font-size: ${Sizes.pxAsRem.twelve};
  font-weight: ${Sizes.fontWeights.medium};

  :hover {
    color: ${(props: ThemeProps) => props.theme.text};
  }
`;

const BackToTopButton = styled.button`
  ${(props: ThemeProps) => {
    return Styles.setButton(
      "medium",
      props.theme.backgroundOne,
      props.theme.backgroundThree
    );
  }};
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border: ${(props: ThemeProps) => props.theme.backgroundThree} solid 1px;
  font-size: ${Sizes.pxAsRem.twelve};
  font-weight: ${Sizes.fontWeights.medium};

  :hover {
    background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
    border: ${(props: ThemeProps) => props.theme.backgroundThree} solid 1px;
  }
`;

const CopyrightAndLegal = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  transition: 0.1s ease-in;
`;

const Copyright = styled.span`
  color: ${(props: ThemeProps) => props.theme.backgroundFive};
  font-size: ${Sizes.pxAsRem.ten};
  font-weight: ${Sizes.fontWeights.medium};
`;

const LegalLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${Sizes.pxAsRem.twenty};
`;

const LegalLink = styled(Link)`
  color: ${(props: ThemeProps) => props.theme.backgroundSeven};
  font-size: ${Sizes.pxAsRem.ten};
  font-weight: ${Sizes.fontWeights.medium};

  :hover {
    color: ${(props: ThemeProps) => props.theme.text};
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

const legalLinks = {
  privacy: "Privacy Policy",
  terms: "Terms",
  refunds: "Refunds",
};

function scrollToTop(): void {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export const Footer = () => {
  const { ui } = useContext(SignalsStoreContext);

  return (
    <Container>
      <Content>
        <Body>
          {ui.theme.value === "light" ? (
            <Image
              src="/logo-text-outlined-light.svg"
              alt="Logo Text"
              width={100}
              height={30.55}
            />
          ) : (
            <Image
              src="/logo-text-outlined-dark.svg"
              alt="Logo Text"
              width={100}
              height={30.55}
            />
          )}

          <BodyLinks>
            <BodyLinkGroup>
              <BodyLinkHeader>Navigation</BodyLinkHeader>
              <BodyLinkRegister href="/register">Register</BodyLinkRegister>
              <BodyLink href="/login">Log In</BodyLink>
            </BodyLinkGroup>
          </BodyLinks>
        </Body>

        <BackToTopButton onClick={scrollToTop}>Back To Top</BackToTopButton>

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
