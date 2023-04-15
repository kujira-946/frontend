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
  Functions.consoleLog("Logbook Page Rendered", false);

  const dispatch = Functions.useAppDispatch();

  const { loadingLogbooks } = Functions.useUiSlice();
  const { currentUser, logbooks } = Functions.useEntitiesSlice();

  const selectedLogbookId = useSignal<number | null>(null);

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

        <Components.LogbooksHeader selectedLogbookId={selectedLogbookId} />

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
