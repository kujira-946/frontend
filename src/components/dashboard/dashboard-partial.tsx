import styled from "styled-components";
import { useEffect } from "react";

import * as Functions from "@/utils/functions";
import { fetchUserOverviewsRequest } from "@/sagas/overviews.saga";
import { ThemeProps } from "../layout";

import { OverviewNavbar } from "./overview-navbar";
import { OverviewHeader } from "./overview-header";

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
  width: 400px;
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
  page: "Logbooks" | "Reviews" | "Settings";
  children: React.ReactNode;
};

export const DashboardPartial = (props: Props) => {
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
      </Overview>

      <Children>{props.children}</Children>
    </Container>
  );
};
