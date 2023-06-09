import * as Dashboard from "@/components/dashboard";
import * as Functions from "@/utils/functions";

import { MobileMenuModal } from "./mobile-menu-modal";
import styled from "styled-components";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const LogbookOverviewGroupsScrollContainer = styled.div`
  position: relative;
  flex: 1;
  overflow-y: auto;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const MobileLogbooksOverview = () => {
  const { mobileOverviewOpen } = Functions.useSignalsStore().dashboard;

  return (
    <MobileMenuModal
      page="Your Overview"
      closeAction={() => (mobileOverviewOpen.value = false)}
      noHeader
    >
      <Container>
        <Dashboard.LogbooksUserSummary inModal />
        <LogbookOverviewGroupsScrollContainer>
          <Dashboard.LogbookOverviewGroups inModal />
        </LogbookOverviewGroupsScrollContainer>
      </Container>
    </MobileMenuModal>
  );
};
