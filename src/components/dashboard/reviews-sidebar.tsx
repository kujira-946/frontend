import styled from "styled-components";
import { DashboardSidebarHeader } from "./dashboard-sidebar-header";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article``;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const ReviewsSidebar = () => {
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
