import styled from "styled-components";
import { DashboardSidebarHeader } from "./dashboard-sidebar-header";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article``;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const SettingsSidebar = () => {
  return (
    <Container>
      <DashboardSidebarHeader
        title="Settings"
        caption="Navigate your settings below."
      />
    </Container>
  );
};
