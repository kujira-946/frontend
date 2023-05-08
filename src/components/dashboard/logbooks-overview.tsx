import dynamic from "next/dynamic";
import styled from "styled-components";

import { useSignal } from "@preact/signals-react";
import { AnimatePresence } from "framer-motion";

import { ThemeProps } from "../layout";

import { LogbooksOverviewHeader } from "./logbooks-overview-header";
import { LogbooksUserSummary } from "./logbooks-user-summary";
import { LogbookOverviewGroups } from "./logbooks-overview-groups";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article`
  position: relative;
  height: 100%;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
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

      <LogbookOverviewGroups />

      <AnimatePresence>
        {filtersOpen.value && <DynamicLogbookFiltersModal open={filtersOpen} />}
      </AnimatePresence>
    </Container>
  );
};
