import styled from "styled-components";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

import { LogbooksOverview } from "./logbooks-overview";
import { ReviewsSidebar } from "./reviews-sidebar";
import { SettingsSidebar } from "./settings-sidebar";
import { useEffect } from "react";
import { fetchUserOverviewRequest } from "@/sagas/overviews.saga";
import { fetchOverviewOverviewGroupsRequest } from "@/sagas/overview-groups.saga";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = {
  page: Types.DashboardPage;
};

const Container = styled.aside<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.page === "Logbooks" ? "300px" : "auto")};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
`;

const Header = styled.header``;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage;
};

export const DashboardSidebar = (props: Props) => {
  const dispatch = Functions.useAppDispatch();
  const { currentUser, overview, overviewGroups } =
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

  return (
    <Container page={props.page}>
      {props.page === "Logbooks" ? (
        <LogbooksOverview />
      ) : props.page === "Reviews" ? (
        <ReviewsSidebar />
      ) : (
        <SettingsSidebar />
      )}
    </Container>
  );
};
