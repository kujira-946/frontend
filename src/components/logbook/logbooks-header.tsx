import { useEffect } from "react";
import { Signal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { fetchUserLogbooksRequest } from "@/sagas/logbooks.saga";
import { createLogbookEntryRequest } from "@/sagas/logbook-entries.saga";

type Props = {
  selectedLogbookId: Signal<number | null>;
};

export const LogbooksHeader = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { currentUser, logbooks } = Functions.useEntitiesSlice();
  const currentUserLogbooks = Functions.useGetCurrentUserLogbooks();

  // ↓↓↓ Fetching current user's logbooks on load. ↓↓↓ //
  useEffect(() => {
    if (currentUser && !logbooks) {
      dispatch(fetchUserLogbooksRequest(currentUser.id));
    }
  }, [currentUser, logbooks]);

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
    <Globals.PageHeader
      infoClick={() => console.log("Logbooks Info Clicked")}
      createClick={createLogbookEntry}
      createText="Create Logbook Entry"
    >
      {currentUserLogbooks &&
        currentUserLogbooks.map((logbook: Types.Logbook, index: number) => {
          if (index === 0) props.selectedLogbookId.value = logbook.id;
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
    </Globals.PageHeader>
  );
};
