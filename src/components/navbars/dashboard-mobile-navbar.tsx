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
  gap: ${Styles.pxAsRem.twelve};
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.twenty};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;

  ${Styles.setMediaPaddings("eight")};

  @media (max-width: ${Styles.breakpoints.navbarWidth}px) {
    display: flex;
  }
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
  page: Types.DashboardPage;
};

export const DashboardMobileNavbar = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;
  const { menuOpen, selectedLogbookId } = Functions.useSignalsStore().dashboard;
  const { logbooks } = Functions.useEntitiesSlice();

  function handlePageText(): string {
    if (menuOpen.value && props.page === "Logbooks") {
      return "Logbooks Filter";
    } else {
      return props.page;
    }
  }

  function handleCaptionText(): string {
    if (menuOpen.value) {
      if (props.page === "Logbooks") {
        return "Select a logbook below.";
      } else if (props.page === "Reviews") {
        return "Select a logbook below to review your purchasing habits.";
      } else {
        return "Navigate your settings below.";
      }
    } else {
      if (props.page !== "Logbooks") {
        return "Select a logbook using the button to the right.";
      } else if (
        logbooks &&
        selectedLogbookId.value &&
        logbooks[selectedLogbookId.value]
      ) {
        return logbooks[selectedLogbookId.value].name;
      } else {
        return "...";
      }
    }
  }

  return (
    <Container>
      <PageAndCaption>
        <Page>{handlePageText()}</Page>
        <Caption>{handleCaptionText()}</Caption>
      </PageAndCaption>

      {theme.value &&
        (menuOpen.value ? (
          <Globals.IconButton
            type="button"
            onClick={() => (menuOpen.value = false)}
          >
            <Icons.Close
              width={16}
              height={16}
              fill={Styles.background[theme.value].eight}
              addHover
            />
          </Globals.IconButton>
        ) : (
          <Globals.IconButton
            type="button"
            onClick={() => (menuOpen.value = true)}
          >
            <Icons.Hamburger
              width={16}
              height={16}
              fill={Styles.background[theme.value].eight}
              addHover
            />
          </Globals.IconButton>
        ))}
    </Container>
  );
};
