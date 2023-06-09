import dynamic from "next/dynamic";
import styled from "styled-components";
import { useSignal } from "@preact/signals-react";
import { DragDropContext } from "react-beautiful-dnd";
import { AnimatePresence } from "framer-motion";

import { ThemeProps } from "@/components/layout";

import { LogbooksOverviewHeader } from "./logbooks-overview-header";
import { LogbooksUserSummary } from "./logbooks-user-summary";
import { LogbookOverviewGroups } from "./logbooks-overview-groups";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
`;

const LogbookOverviewGroupsScrollContainer = styled.div`
  position: relative;
  flex: 1;
  overflow-y: auto;
`;

// ========================================================================================= //
// [ DYNAMIC IMPORT ] ====================================================================== //
// ========================================================================================= //

const DynamicLogbookFiltersModal = dynamic(() =>
  import("../modals/logbooks-filters-modal").then(
    (mod) => mod.LogbooksFiltersModal
  )
);

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const LogbooksOverview = () => {
  const filtersOpen = useSignal(false);

  return (
    <Container>
      <LogbooksOverviewHeader filtersOpen={filtersOpen} />

      <LogbooksUserSummary />

      <LogbookOverviewGroupsScrollContainer>
        {/* <DragDropContext onDragEnd={() => console.log("")}> */}
        <LogbookOverviewGroups />
        {/* </DragDropContext> */}
      </LogbookOverviewGroupsScrollContainer>

      <AnimatePresence>
        {filtersOpen.value && <DynamicLogbookFiltersModal open={filtersOpen} />}
      </AnimatePresence>
    </Container>
  );
};
