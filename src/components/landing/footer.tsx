import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
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

  ${Styles.transition};

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

  ${Styles.transition};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.text};
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

  ${Styles.transition};

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
  const { theme } = Functions.useSignalsStore().ui;

  return (
    <Container>
      <Content>
        <Body>
          {theme.value === "light" ? (
            <Image
              src="/logo-text-outlined-light.svg"
              alt="Logo Text"
              width={100}
              height={30.55}
            />
          ) : theme.value === "dark" ? (
            <Image
              src="/logo-text-outlined-dark.svg"
              alt="Logo Text"
              width={100}
              height={30.55}
            />
          ) : null}

          <BodyLinks>
            <BodyLinkGroup>
              <BodyLinkHeader>Navigation</BodyLinkHeader>
              <BodyLinkRegister href="/register">Register</BodyLinkRegister>
              <BodyLink href="/login">Log In</BodyLink>
            </BodyLinkGroup>
          </BodyLinks>
        </Body>

        <Globals.NeutralButtonOutlined
          onClick={scrollToTop}
          size="small"
          fontWeight="medium"
          compact
        >
          Back To Top
        </Globals.NeutralButtonOutlined>

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
