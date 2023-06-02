import Image from "next/image";
import styled from "styled-components";

import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

import { FooterLinkGroup } from "./footer-link-group";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};

  ${Styles.setMediaPaddings()};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${Styles.pxAsRem.eighty};
  width: 100%;
  max-width: ${Styles.widths.content}px;
  padding: ${Styles.pxAsRem.hundred} 0rem;

  @media (max-width: ${Styles.widths.mobile}px) {
    gap: ${Styles.pxAsRem.forty};
    padding: ${Styles.pxAsRem.forty} 0rem;
  }
`;

const Body = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  width: 100%;

  @media (max-width: 690px) {
    flex-direction: column;
  }
`;

const Copyright = styled.span`
  color: ${(props: ThemeProps) => props.theme.backgroundSix};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.regular};
`;

const FooterLinkGroups = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${Styles.pxAsRem.hundred}, 1fr)
  );
  gap: ${Styles.pxAsRem.forty};
  flex: 1;
`;

const BackToTopButton = styled.button`
  ${Styles.clearButton};
  ${Styles.transition};

  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.fourteen};
  color: ${(props: ThemeProps) => props.theme.primaryMain};
  border: ${(props: ThemeProps) => props.theme.primaryMain} solid 1px;
  border-radius: ${Styles.pxAsRem.eight};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.semiBold};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.primaryDark};
      border: ${(props: ThemeProps) => props.theme.primaryDark} solid 1px;
    }
  }

  @media (max-width: ${Styles.widths.mobile}px) {
    width: 100%;
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type FooterLinkGroup = {
  title: string;
  links: string[];
};

const footerLinkGroups: FooterLinkGroup[] = [
  // { title: "Product", links: ["Pricing", "Blog", "Releases", "Support"] },
  // { title: "Company", links: ["About", "Contract", "Careers", "Media"] },
  // { title: "Social", links: ["LinkedIn", "AngelList", "GitHub", "Twitter"] },
  // { title: "Legal", links: ["Terms", "Privacy", "Cookie", "Refunds"] },
  { title: "Legal", links: ["Terms", "Privacy", "Cookie"] },
];

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
          <FooterLinkGroups>
            {footerLinkGroups.map(
              (linkGroup: FooterLinkGroup, index: number) => {
                return (
                  <FooterLinkGroup
                    key={`footer-link-group-${linkGroup.title}-${index}`}
                    title={linkGroup.title}
                    links={linkGroup.links}
                  />
                );
              }
            )}
          </FooterLinkGroups>

          {theme.value === "light" ? (
            <Image
              src="/logo-full-vertical-light.svg"
              alt="Logo Text"
              width={72.07}
              height={80}
            />
          ) : theme.value === "dark" ? (
            <Image
              src="/logo-full-vertical-dark.svg"
              alt="Logo Text"
              width={72.07}
              height={80}
            />
          ) : null}
        </Body>

        <BackToTopButton type="button" onClick={scrollToTop}>
          Back To Top
        </BackToTopButton>

        <Copyright>© 2023 Kujira. All rights reserved.</Copyright>
      </Content>
    </Container>
  );
};
