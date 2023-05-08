import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${Styles.pxAsRem.twelve};
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.twenty};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;

  ${Styles.setMediaPaddings("eight")};
`;

const PageAndCaption = styled.section`
  display: flex;
  flex-direction: column;
`;

const Page = styled.h1`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.bold};

  @media (max-height: ${Styles.breakpoints.navbarHeight}px) {
    font-size: ${Styles.pxAsRem.fourteen};
  }
`;

const Caption = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.regular};

  @media (max-height: ${Styles.breakpoints.navbarHeight}px) {
    font-size: ${Styles.pxAsRem.twelve};
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.MobileNavbarPage;
  caption?: string;
  children: React.ReactNode; // Icon button
};

export const MobileNavbarContainer = (props: Props) => {
  return (
    <Container>
      <PageAndCaption>
        <Page>{props.page}</Page>
        {props.caption && <Caption>{props.caption}</Caption>}
      </PageAndCaption>

      {props.children}
    </Container>
  );
};
