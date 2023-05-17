import styled from "styled-components";
import { Signal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";
import { createLogbookEntryRequest } from "@/sagas/logbook-entries.saga";

import { DashboardSidebarHeader } from "./dashboard-sidebar-header";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${Styles.pxAsRem.twelve};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  filtersOpen: Signal<boolean>;
};

export const LogbooksOverviewHeader = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { selectedLogbookId } = Functions.useSignalsStore().dashboard;
  const { logbooks } = Functions.useEntitiesSlice(true);

  function createLogbookEntry(): void {
    if (selectedLogbookId.value) {
      dispatch(
        createLogbookEntryRequest({
          date: Functions.generateFormattedDate(new Date(), true),
          logbookId: selectedLogbookId.value,
        })
      );
    }
  }

  return (
    <Container>
      <DashboardSidebarHeader
        page="Logbooks"
        caption={
          logbooks && selectedLogbookId.value
            ? logbooks[selectedLogbookId.value].name
            : "Select a logbook."
        }
        openModal={() => (props.filtersOpen.value = true)}
      />

      <Globals.Button
        type="button"
        disabled={!selectedLogbookId.value}
        onClick={createLogbookEntry}
        size="medium"
        borderRadius="six"
        style={{ marginTop: Styles.pxAsRem.twelve }}
        primary
      >
        Create Logbook Entry
      </Globals.Button>
    </Container>
  );
};
