import styled from "styled-components";

import * as Functions from "@/utils/functions";
import { ThemeProps } from "../layout";

import { DashboardSidebarHeader } from "./dashboard-sidebar-header";
import { UserSummary } from "./user-summary-new";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article`
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const LogbooksOverview = () => {
  const { selectedLogbookId } = Functions.useSignalsStore().dashboard;
  const logbook = Functions.useGetLogbook(selectedLogbookId.value);

  return (
    <Container>
      <DashboardSidebarHeader
        title="Logbooks"
        caption={logbook ? logbook.name : "Select a logbook."}
      />

      <UserSummary />
    </Container>
  );
};
