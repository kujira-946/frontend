import Head from "next/head";
import { ReactElement, useEffect } from "react";
import { useSignal } from "@preact/signals-react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as Components from "@/components/logbook";
import * as LogbookEntrySagas from "@/sagas/logbook-entries.saga";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { DashboardLayout } from "@/components/dashboard";
import { fetchUserLogbooksRequest } from "@/sagas/logbooks.saga";
import { NextPageWithLayout } from "../_app";

const Logbooks: NextPageWithLayout = () => {
  const dispatch = Functions.useAppDispatch();

  const { loadingLogbooks } = Functions.useUiSlice();
  const { currentUser, logbooks } = Functions.useEntitiesSlice();
  const currentUserLogbooks = Functions.useGetCurrentUserLogbooks();

  const selectedLogbookId = useSignal<number | null>(null);

  function createLogbookEntry(): void {
    if (selectedLogbookId.value) {
      dispatch(
        LogbookEntrySagas.createLogbookEntryRequest({
          date: Functions.generateFormattedDate(new Date(), true),
          logbookId: selectedLogbookId.value,
        })
      );
    }
  }

  Functions.useDetectAuthorizedUser();

  // ↓↓↓ Fetching current user's logbooks on load. ↓↓↓ //
  useEffect(() => {
    if (currentUser) {
      if (!logbooks) {
        dispatch(Redux.uiActions.setLoadingLogbooks(true));
        dispatch(fetchUserLogbooksRequest(currentUser.id));
      }
    }
  }, [currentUser, logbooks]);

  // ↓↓↓ Fetching the currently-selected logbook's associated logbook entries. ↓↓↓ //
  useEffect(() => {
    if (selectedLogbookId.value) {
      dispatch(Redux.uiActions.setLoadingLogbookEntries(true));
      dispatch(
        LogbookEntrySagas.fetchLogbookLogbookEntriesRequest(
          selectedLogbookId.value
        )
      );
    }
  }, [selectedLogbookId.value]);

  if (!currentUser) {
    return null;
  } else if (loadingLogbooks) {
    return <Globals.Loading text="Loading your logbooks..." />;
  } else {
    return (
      <>
        <Head>
          <title>Kujira | Logbooks</title>
          <meta name="description" content="Kujira app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Globals.PageHeader
          infoClick={() => console.log("Logbooks Info Clicked")}
          createClick={createLogbookEntry}
          createText="Create Logbook Entry"
        >
          {currentUserLogbooks &&
            currentUserLogbooks.map((logbook: Types.Logbook, index: number) => {
              if (index === 0) selectedLogbookId.value = logbook.id;
              return (
                <Globals.NeutralPillButton
                  key={`dashboard-navbar-logbook-${logbook.id}-${index}`}
                  onClick={() => (selectedLogbookId.value = logbook.id)}
                  size="smaller"
                  selected={selectedLogbookId.value === logbook.id}
                  compact
                >
                  {logbook.name}
                </Globals.NeutralPillButton>
              );
            })}
        </Globals.PageHeader>

        {selectedLogbookId.value && (
          <Components.LogbookEntries logbookId={selectedLogbookId.value} />
        )}
      </>
    );
  }
};

Logbooks.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout page="Logbooks">{page}</DashboardLayout>;
};

export default Logbooks;
