import styled from "styled-components";
import { useEffect } from "react";
import { Signal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { fetchUserOverviewRequest } from "@/sagas/overviews.saga";
import { fetchOverviewOverviewGroupsRequest } from "@/sagas/overview-groups.saga";
import { fetchUserLogbooksRequest } from "@/sagas/logbooks.saga";
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
  const { currentUser, overview, overviewGroups, logbooks } =
    Functions.useEntitiesSlice(true);

  // ↓↓↓ Fetching current user's overview. ↓↓↓ //
  useEffect(() => {
    if (currentUser && !overview) {
      dispatch(fetchUserOverviewRequest(currentUser.id));
    }
  }, [currentUser, overview]);

  // ↓↓↓ Fetching overview overview groups. ↓↓↓ //
  useEffect(() => {
    if (overview && !overviewGroups) {
      dispatch(fetchOverviewOverviewGroupsRequest(overview.id));
    }
  }, [overview, overviewGroups]);

  // ↓↓↓ Fetching current user's logbooks. ↓↓↓ //
  useEffect(() => {
    if (currentUser && !logbooks) {
      dispatch(fetchUserLogbooksRequest(currentUser.id));
    }
  }, [currentUser, logbooks]);

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
