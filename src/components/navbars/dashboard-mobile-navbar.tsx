import styled from "styled-components";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.nav`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.twenty};
	background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;

  ${Styles.setMediaPaddings("eight")};

  @media (max-width: ${Styles.breakpoints.navbar}px) {
    display: flex;
  }
`;

const PageAndCaption = styled.section`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.twenty};
`;

const Page = styled.h1`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const Caption = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.regular};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage;
  caption: string;
};

export const DashboardMobileNavbar = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;

  return (
    <Container>
      <PageAndCaption>
        <Page>{props.page}</Page>
        <Caption>{props.caption}</Caption>
      </PageAndCaption>

      {theme.value && (
        <Globals.IconButton type="button">
          <Icons.Hamburger
            width={16}
            height={16}
            fill={Styles.background[theme.value].eight}
            addHover
          />
        </Globals.IconButton>
      )}
    </Container>
  );
};
