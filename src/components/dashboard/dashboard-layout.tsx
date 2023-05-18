import dynamic from "next/dynamic";
import styled from "styled-components";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import * as Navbars from "@/components/navbars";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "@/components/layout";

import { DashboardSidebar } from "./dashboard-sidebar";
import { MobileLogbooksOverviewHeader } from "./mobile-logbooks-overview-header";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  gap: ${Styles.pxAsRem.twenty};
  max-width: ${Styles.widths.desktop}px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow-x: auto;

  ${Styles.setMediaPaddings()};
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
  margin: ${Styles.pxAsRem.twenty} 0;
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  border-radius: ${Styles.pxAsRem.eight};
  overflow: hidden;

  @media (max-width: ${Styles.breakpoints.dashboardWidth}px) {
    display: none;
  }
`;

const Children = styled.div`
  position: relative;
  flex: 1;
  padding: ${Styles.pxAsRem.twenty} 0;
  overflow-y: auto;

  @media (max-width: ${Styles.widths.mobile}px) {
    padding: ${Styles.pxAsRem.fourteen} 0;
  }
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

  // ↓↓↓ Fetching current user's overview and logbooks. ↓↓↓ //
  useEffect(() => {
    if (currentUser) {
      if (!overview) {
        dispatch(Sagas.fetchUserOverviewRequest(currentUser.id));
      } else if (!logbooks) {
        dispatch(Sagas.fetchUserLogbooksRequest(currentUser.id));
      }
    }
  }, [currentUser, overview, logbooks]);

  // ↓↓↓ Fetching overview overview groups. ↓↓↓ //
  useEffect(() => {
    if (overview && !overviewGroups) {
      dispatch(Redux.uiActions.setLoadingOverviewGroups(true));
      dispatch(Sagas.fetchOverviewOverviewGroupsRequest(overview.id));
    }
  }, [overview, overviewGroups]);

  // ↓↓↓ Fetching logbook entries. ↓↓↓ //
  useEffect(() => {
    if (selectedLogbookId.value) {
      dispatch(Redux.uiActions.setLoadingLogbookEntries(true));
      dispatch(
        Sagas.fetchLogbookLogbookEntriesRequest(selectedLogbookId.value)
      );
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

          <Children>{props.children}</Children>
        </Main>
      </Container>
    </>
  );
};
