import styled from "styled-components";
import { DashboardSidebarHeader } from "./dashboard-sidebar-header";

import * as Functions from "@/utils/functions";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article``;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const ReviewsSidebar = () => {
  const logbooks = Functions.useGetUserLogbooks();

  return (
    <Container>
      <DashboardSidebarHeader
        title="Reviews"
        caption="Select a logbook below to review your purchasing habits."
        standalone
      />
    </Container>
  );
};
