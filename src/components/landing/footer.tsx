import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useContext } from "react";

import * as Globals from "@/components";
import * as Styles from "@/utils/styles";
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
  max-width: ${Styles.widths.content}px;
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
  gap: ${Styles.pxAsRem.eight};
  color: ${(props: ThemeProps) => props.theme.text};
`;

const BodyLinkHeader = styled.h5`
  margin: 0 0 ${Styles.pxAsRem.four};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const BodyLinkRegister = styled(Link)`
  color: ${(props: ThemeProps) => props.theme.primaryMain};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.medium};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.primaryDark};
    }
  }
`;

const BodyLink = styled(Link)`
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.medium};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.text};
    }
  }
`;

const BackToTopButton = styled(Globals.Button)`
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border: ${(props: ThemeProps) => props.theme.backgroundThree} solid 1px;
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.medium};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.text};
      background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
      border: ${(props: ThemeProps) => props.theme.backgroundThree} solid 1px;
    }
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
  font-size: ${Styles.pxAsRem.ten};
  font-weight: ${Styles.fontWeights.medium};
`;

const LegalLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.twenty};
`;

const LegalLink = styled(Link)`
  color: ${(props: ThemeProps) => props.theme.backgroundSeven};
  font-size: ${Styles.pxAsRem.ten};
  font-weight: ${Styles.fontWeights.medium};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.text};
    }
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

        {/* <BackToTopButton onClick={scrollToTop} size="small">
          Back To Top
        </BackToTopButton> */}

        <Globals.Button
          onClick={scrollToTop}
          size="small"
          fontWeight="medium"
          color={Styles.background[ui.theme.value].seven}
          hoverColor={Styles.background[ui.theme.value].eight}
          background={Styles.background[ui.theme.value].two}
          hoverBackground={Styles.background[ui.theme.value].three}
          border={Styles.background[ui.theme.value].four}
          hoverBorder={Styles.background[ui.theme.value].six}
          compact
        >
          Back To Top
        </Globals.Button>

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
