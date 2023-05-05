import styled from "styled-components";
import { Signal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { createLogbookEntryRequest } from "@/sagas/logbook-entries.saga";
import { ThemeProps } from "../layout";

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

  return (
    <Container>
      <DashboardSidebarHeader
        title="Logbooks"
        caption={
          logbooks && selectedLogbookId.value
            ? logbooks[selectedLogbookId.value].name
            : "Select a logbook using the button to the right."
        }
        openModal={() => (props.filtersOpen.value = true)}
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
    </Container>
  );
};
