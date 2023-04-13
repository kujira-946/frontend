import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

import { OverviewNavbar } from "./overview-navbar";
import { UserSummary } from "./user-summary";
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

  /* border: blue solid 1px; */
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage;
  children: React.ReactNode;
};

export const DashboardLayout = (props: Props) => {
  return (
    <Container>
      <Overview>
        <OverviewNavbar />
        <UserSummary page={props.page} />
        <OverviewGroups />
      </Overview>

      <Children>{props.children}</Children>
    </Container>
  );
};
