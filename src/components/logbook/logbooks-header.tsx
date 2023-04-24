import { useEffect } from "react";
import { Signal, effect } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { fetchUserLogbooksRequest } from "@/sagas/logbooks.saga";
import {
  createLogbookEntryRequest,
  fetchLogbookLogbookEntriesRequest,
} from "@/sagas/logbook-entries.saga";

type Props = {
  selectedLogbookId: Signal<number | null>;
  noCreate?: true;
};

export const LogbooksHeader = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { currentUser } = Functions.useEntitiesSlice();
  const currentUserLogbooks = Functions.useGetCurrentUserLogbooks();

  // ↓↓↓ Fetching current user's logbooks on load. ↓↓↓ //
  useEffect(() => {
    if (currentUser && currentUser.logbookIds.length === 0) {
      dispatch(fetchUserLogbooksRequest(currentUser.id));
    }
  }, [currentUser]);

  // ↓↓↓ Fetching the currently-selected logbook's associated logbook entries. ↓↓↓ //
  useEffect(() => {
    if (props.selectedLogbookId.value) {
      dispatch(
        fetchLogbookLogbookEntriesRequest(props.selectedLogbookId.value)
      );
    }
  }, [props.selectedLogbookId.value]);

  function createLogbookEntry(): void {
    if (props.selectedLogbookId.value) {
      dispatch(
        createLogbookEntryRequest({
          date: Functions.generateFormattedDate(new Date(), true),
          logbookId: props.selectedLogbookId.value,
        })
      );
    }
  }

  return (
    <Globals.DashboardPageHeader
      createClick={props.noCreate ? undefined : createLogbookEntry}
      createText="Create Logbook Entry"
      canCreate={!!props.selectedLogbookId.value}
    >
      {currentUserLogbooks &&
        currentUserLogbooks.map((logbook: Types.Logbook, index: number) => {
          return (
            <Globals.NeutralPillButton
              key={`dashboard-navbar-logbook-${logbook.id}-${index}`}
              onClick={() => (props.selectedLogbookId.value = logbook.id)}
              size="smaller"
              selected={props.selectedLogbookId.value === logbook.id}
              compact
            >
              {logbook.name}
            </Globals.NeutralPillButton>
          );
        })}
    </Globals.DashboardPageHeader>
  );
};
