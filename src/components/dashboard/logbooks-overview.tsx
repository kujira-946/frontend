import styled from "styled-components";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "../layout";

import { DashboardSidebarHeader } from "./dashboard-sidebar-header";
import { UserSummary } from "./user-summary-new";
import { createLogbookEntryRequest } from "@/sagas/logbook-entries.saga";
import { LogbooksFiltersModal } from "../modals/logbooks-filters-modal";
import { AnimatePresence } from "framer-motion";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article`
  position: relative;
  height: 100%;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${Styles.pxAsRem.twelve};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const LogbooksOverview = () => {
  const dispatch = Functions.useAppDispatch();

  const { selectedLogbookId } = Functions.useSignalsStore().dashboard;
  const { logbooks } = Functions.useEntitiesSlice();
  const filtersOpen = useSignal(false);

  return (
    <Container>
      <AnimatePresence>
        {filtersOpen.value && (
          <LogbooksFiltersModal
            open={filtersOpen}
            selectedLogbookId={selectedLogbookId}
          />
        )}
      </AnimatePresence>

      <Header>
        <DashboardSidebarHeader
          title="Logbooks"
          caption={
            logbooks && selectedLogbookId.value
              ? logbooks[selectedLogbookId.value].name
              : "Select a logbook."
          }
          openModal={() => (filtersOpen.value = true)}
          standalone
        />
        {selectedLogbookId.value && (
          <Globals.Button
            type="button"
            onClick={() => {
              if (selectedLogbookId.value) {
                dispatch(
                  createLogbookEntryRequest({
                    date: Functions.generateFormattedDate(new Date(), true),
                    logbookId: selectedLogbookId.value,
                  })
                );
              }
            }}
            size="medium"
            borderRadius="six"
            style={{ marginTop: Styles.pxAsRem.twelve }}
            primary
          >
            Create Logbook Entry
          </Globals.Button>
        )}
      </Header>

      <UserSummary />
    </Container>
  );
};
