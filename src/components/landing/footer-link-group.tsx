import Link from "next/link";
import styled from "styled-components";

import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.sixteen};
`;

const Title = styled.h5`
  margin: 0;
  font-size: ${Styles.pxAsRem.eighteen};
  font-weight: ${Styles.fontWeights.semiBold};
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
`;

const Links = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
`;

const FooterLink = styled(Link)`
  ${Styles.clearLink};
  ${Styles.transition};
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.regular};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.primaryMain};
    }
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  title: string;
  links: string[];
};

export const FooterLinkGroup = (props: Props) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Links>
        {props.links.map((link: string, index: number) => {
          return (
            <FooterLink
              key={`landing-footer-legal-link-${link}-${index}`}
              href={`/${link.toLowerCase()}`}
              target="_blank"
            >
              {link}
            </FooterLink>
          );
        })}
      </Links>
    </Container>
  );
};
