import Head from "next/head";
import styled from "styled-components";
import { ReactElement, useCallback, useEffect, useMemo } from "react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as Dashboard from "@/components/dashboard";
import * as Components from "@/components/logbook";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import * as LogbookEntrySagas from "@/sagas/logbook-entries.saga";
import * as PurchasesSagas from "@/sagas/purchases.saga";
import { fetchUserLogbooksRequest } from "@/sagas/logbooks.saga";
import { NextPageWithLayout } from "../_app";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Body = styled.section`
  padding: ${Styles.pxAsRem.sixteen};
`;

// ========================================================================================= //
// [ EXPORTED PAGE ] ======================================================================= //
// ========================================================================================= //

const Logbooks: NextPageWithLayout = () => {
  const dispatch = Functions.useAppDispatch();

  const { selectedLogbookId } = Functions.useSignalsStore().dashboard;
  const { loadingLogbooks } = Functions.useUiSlice();
  const { currentUser, logbooks } = Functions.useEntitiesSlice();

  const currentUserLogbooks = Functions.useGetCurrentUserLogbooks();

  const logbookEntries = Functions.useGetLogbookEntries(
    selectedLogbookId.value
  );

  const logbookElements = useMemo(() => {
    if (currentUserLogbooks) {
      return (
        <>
          {currentUserLogbooks.map((logbook: Types.Logbook, index: number) => {
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
        </>
      );
    } else {
      return null;
    }
  }, [currentUserLogbooks, selectedLogbookId.value]);

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

  const onDragEnd = useCallback(Functions.onDragEnd, []);

  const deleteLogbookEntry = useCallback((logbookEntryId: number): void => {
    dispatch(LogbookEntrySagas.deleteLogbookEntryRequest(logbookEntryId));
  }, []);

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
          createText="Create Log Entry"
        >
          {logbookElements}
        </Globals.PageHeader>

        <Body>
          {logbookEntries &&
            logbookEntries.map((logbookEntry: Types.LogbookEntry) => {
              return (
                <Components.LogbookEntryDropdown
                  key={`dashboard-logbooks-logbook-entry-dropdown-${logbookEntry.id}`}
                  logbookEntryId={logbookEntry.id}
                  onDragEnd={onDragEnd}
                  deleteLogbookEntry={deleteLogbookEntry}
                  deleteAllPurchases={deleteAllPurchases}
                  addPurchase={addPurchase}
                />
              );
            })}
        </Body>
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
