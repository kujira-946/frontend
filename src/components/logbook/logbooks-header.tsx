import { memo } from "react";
import { Signal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { createLogbookEntryRequest } from "@/sagas/logbook-entries.saga";

type Props = {
  selectedLogbookId: Signal<number | null>;
};

const ExportedComponent = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const currentUserLogbooks = Functions.useGetCurrentUserLogbooks();

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

export const LogbooksHeader = memo(ExportedComponent);
