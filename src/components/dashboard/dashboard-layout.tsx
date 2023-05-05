import styled from "styled-components";

import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

import { OverviewNavbar } from "./overview-navbar";
import { UserSummary } from "./user-summary";
import { OverviewGroups } from "./overview-groups";
import { DashboardHeader } from "./dashboard-header";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { useEffect } from "react";
import { fetchUserOverviewRequest } from "@/sagas/overviews.saga";
import { fetchOverviewOverviewGroupsRequest } from "@/sagas/overview-groups.saga";
import { fetchUserLogbooksRequest } from "@/sagas/logbooks.saga";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.main`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  gap: ${Styles.pxAsRem.twenty};
  max-width: ${Styles.widths.desktop}px;
  width: 100%;
  margin: 0 auto;
  padding: ${Styles.pxAsRem.twenty} 0;

  ${Styles.setMediaPaddings()};
`;

const Sidebar = styled.section`
  display: flex;
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  border-radius: ${Styles.pxAsRem.eight};
  overflow: hidden;
`;

const Overview = styled.section`
  position: relative;
  width: 18.75rem;
  height: 100%;
  border-right: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  overflow-y: auto;
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
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage;
  children: React.ReactNode;
};

export const DashboardLayout = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

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
    <Container>
      <Sidebar>
        <DashboardNavbar page={props.page} />
        <DashboardSidebar page={props.page} />
      </Sidebar>

      {/* <Overview>
        <OverviewNavbar />
        <UserSummary page={props.page} />
        <OverviewGroups />
      </Overview> */}

      <Body>
        {/* {props.page !== "Settings" && <DashboardHeader page={props.page} />} */}
        <Children>{props.children}</Children>
      </Body>
    </Container>
  );
};
