import styled from "styled-components";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import * as Navbars from "@/components/navbars";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { uiActions } from "@/redux";
import { fetchUserOverviewRequest } from "@/sagas/overviews.saga";
import { fetchOverviewOverviewGroupsRequest } from "@/sagas/overview-groups.saga";
import { fetchUserLogbooksRequest } from "@/sagas/logbooks.saga";
import { ThemeProps } from "../layout";

import { DashboardSidebar } from "./dashboard-sidebar";
import dynamic from "next/dynamic";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Main = styled.main`
  display: flex;
  gap: ${Styles.pxAsRem.twenty};
  max-width: ${Styles.widths.desktop}px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: ${Styles.pxAsRem.twenty} 0;

  ${Styles.setMediaPaddings("twenty")};
`;

const Sidebar = styled.section`
  display: flex;
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  border-radius: ${Styles.pxAsRem.eight};
  overflow: hidden;

  @media (max-width: ${Styles.breakpoints.navbarWidth}px) {
    display: none;
  }
`;

const Body = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Children = styled.div`
  position: relative;
  flex: 1;
`;

// ========================================================================================= //
// [ DYNAMIC IMPORT ] ====================================================================== //
// ========================================================================================= //

const DynamicNavigationModal = dynamic(() =>
  import("../modals/navigation-modal").then((mod) => mod.NavigationModal)
);

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage;
  children: React.ReactNode;
};

export const DashboardLayout = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { mobileMenuOpen } = Functions.useSignalsStore().dashboard;
  const { currentUser, overview, overviewGroups, logbooks } =
    Functions.useEntitiesSlice(true);

  // ↓↓↓ Fetching current user's overview. ↓↓↓ //
  useEffect(() => {
    if (currentUser && !overview) {
      dispatch(fetchUserOverviewRequest(currentUser.id));
    }
  }, [currentUser, overview]);

  // ↓↓↓ Fetching overview overview groups. ↓↓↓ //
  useEffect(() => {
    if (overview && !overviewGroups) {
      dispatch(uiActions.setLoadingOverviewGroups(true));
      dispatch(fetchOverviewOverviewGroupsRequest(overview.id));
    }
  }, [overview, overviewGroups]);

  // ↓↓↓ Fetching current user's logbooks. ↓↓↓ //
  useEffect(() => {
    if (currentUser && !logbooks) {
      dispatch(fetchUserLogbooksRequest(currentUser.id));
    }
  }, [currentUser, logbooks]);

  return (
    <>
      <AnimatePresence>
        {mobileMenuOpen.value && <DynamicNavigationModal page={props.page} />}
      </AnimatePresence>

      <Container>
        <Navbars.DashboardMobileNavbar page={props.page} />

        <Main>
          <Sidebar>
            <Navbars.DashboardDesktopNavbar page={props.page} />
            <DashboardSidebar page={props.page} />
          </Sidebar>

          <Body>
            <Children>{props.children}</Children>
          </Body>
        </Main>
      </Container>
    </>
  );
};
