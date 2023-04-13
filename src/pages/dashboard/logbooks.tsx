import Head from "next/head";
import { ReactElement, useCallback, useEffect } from "react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as Dashboard from "@/components/dashboard";
import * as Components from "@/components/logbook";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import * as PurchasesSagas from "@/sagas/purchases.saga";
import { fetchUserLogbooksRequest } from "@/sagas/logbooks.saga";
import { NextPageWithLayout } from "../_app";
import { fetchLogbookLogbookEntriesRequest } from "@/sagas/logbook-entries.saga";

const Logbooks: NextPageWithLayout = () => {
  const dispatch = Functions.useAppDispatch();

  const { selectedLogbookId } = Functions.useSignalsStore().dashboard;
  const { loadingLogbooks } = Functions.useUiSlice();
  const { currentUser, logbooks } = Functions.useEntitiesSlice();

  const logbook = Functions.useGetLogbook(selectedLogbookId.value);
  const logbookEntries = Functions.useGetLogbookEntries(
    selectedLogbookId.value
  );

  const onDragEnd = useCallback(Functions.onDragEnd, []);

  const deleteAllPurchases = useCallback((logbookEntryId: number): void => {
    dispatch(
      PurchasesSagas.deleteAssociatedPurchasesRequest({ logbookEntryId })
    );
  }, []);

  const addPurchase = useCallback((logbookEntryId: number): void => {
    dispatch(
      PurchasesSagas.createPurchaseRequest({ placement: 0, logbookEntryId })
    );
  }, []);

  Functions.useDetectAuthorizedUser();

  useEffect(() => {
    if (currentUser) {
      if (!logbooks) {
        dispatch(Redux.uiActions.setLoadingLogbooks);
        dispatch(fetchUserLogbooksRequest(currentUser.id));
      }
    }
  }, [currentUser, logbooks]);

  useEffect(() => {
    if (selectedLogbookId.value) {
      dispatch(fetchLogbookLogbookEntriesRequest(selectedLogbookId.value));
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

        {logbookEntries &&
          logbookEntries.map((logbookEntry: Types.LogbookEntry) => {
            return (
              <Components.LogbookEntryDropdown
                key={`dashboard-logbooks-logbook-entry-dropdown-${logbookEntry.id}`}
                logbookEntryId={logbookEntry.id}
                onDragEnd={onDragEnd}
                deleteAllPurchases={deleteAllPurchases}
                addPurchase={addPurchase}
              />
            );
          })}
      </>
    );
  }
};

Logbooks.getLayout = function getLayout(page: ReactElement) {
  return (
    <Dashboard.DashboardLayout page="Logbooks">
      {page}
    </Dashboard.DashboardLayout>
  );
};

export default Logbooks;
