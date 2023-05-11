import dynamic from "next/dynamic";
import styled from "styled-components";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import * as Navbars from "@/components/navbars";
import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { uiActions } from "@/redux";
import { fetchUserOverviewRequest } from "@/sagas/overviews.saga";
import { fetchOverviewOverviewGroupsRequest } from "@/sagas/overview-groups.saga";
import { fetchUserLogbooksRequest } from "@/sagas/logbooks.saga";
import { ThemeProps } from "../layout";

import { DashboardSidebar } from "./dashboard-sidebar";
import { MobileLogbooksOverviewHeader } from "./mobile-logbooks-overview-header";
import { fetchLogbookLogbookEntriesRequest } from "@/sagas/logbook-entries.saga";

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

const Mobile = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  display: none;
  flex-direction: column;

  @media (max-width: ${Styles.breakpoints.dashboardWidth}px) {
    display: flex;
  }
`;

const Sidebar = styled.section`
  display: flex;
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  border-radius: ${Styles.pxAsRem.eight};
  overflow: hidden;

  @media (max-width: ${Styles.breakpoints.dashboardWidth}px) {
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

const DynamicMobileNavigationModal = dynamic(() =>
  import("../modals/mobile-navigation-modal").then(
    (mod) => mod.MobileNavigationModal
  )
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

  const { selectedLogbookId, mobileMenuOpen } =
    Functions.useSignalsStore().dashboard;
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

  // ↓↓↓ Fetching logbook entries. ↓↓↓ //
  useEffect(() => {
    if (selectedLogbookId.value) {
      dispatch(Redux.uiActions.setLoadingLogbookEntries(true));
      dispatch(fetchLogbookLogbookEntriesRequest(selectedLogbookId.value));
    }
  }, [selectedLogbookId.value]);

  return (
    <>
      <AnimatePresence>
        {mobileMenuOpen.value && (
          <DynamicMobileNavigationModal page={props.page} />
        )}
      </AnimatePresence>

      <Container>
        <Mobile>
          <Navbars.DashboardMobileNavbar page={props.page} />
          {props.page === "Logbooks" && <MobileLogbooksOverviewHeader />}
        </Mobile>

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
