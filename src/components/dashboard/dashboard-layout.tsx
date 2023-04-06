import styled from "styled-components";
import { memo, useEffect } from "react";

import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { fetchUserOverviewsRequest } from "@/sagas/overviews.saga";
import { ThemeProps } from "../layout";

import { OverviewNavbar } from "./overview-navbar";
import { OverviewHeader } from "./overview-header";
import { OverviewGroups } from "./overview-groups";

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
`;

const Overview = styled.section`
  position: relative;
  width: 18.75rem;
  height: 100%;
  border-right: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  overflow-y: auto;
`;

const Children = styled.section`
  flex: 1;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  children: React.ReactNode;
  page: Types.DashboardPage;
};

const ExportedComponent = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { currentUser, overviews } = Functions.useEntitiesSlice();

  useEffect(() => {
    if (currentUser && !overviews) {
      dispatch(fetchUserOverviewsRequest(currentUser.id));
    }
  }, [currentUser, overviews]);

  return (
    <Container>
      <Overview>
        <OverviewNavbar />
        <OverviewHeader page={props.page} />
        <OverviewGroups />
      </Overview>

      <Children>{props.children}</Children>
    </Container>
  );
};

export const DashboardLayout = memo(ExportedComponent);
