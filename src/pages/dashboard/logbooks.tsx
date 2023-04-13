import Head from "next/head";
import styled from "styled-components";
import { ReactElement, useCallback, useEffect } from "react";
import { useSignal } from "@preact/signals-react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as Components from "@/components/logbook";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import * as LogbookEntrySagas from "@/sagas/logbook-entries.saga";
import * as PurchasesSagas from "@/sagas/purchases.saga";
import { DashboardLayout } from "@/components/dashboard";
import { fetchUserLogbooksRequest } from "@/sagas/logbooks.saga";
import { NextPageWithLayout } from "../_app";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Body = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.sixteen};
`;

// ========================================================================================= //
// [ EXPORTED PAGE ] ======================================================================= //
// ========================================================================================= //

const Logbooks: NextPageWithLayout = () => {
  const dispatch = Functions.useAppDispatch();

  const { loadingLogbooks, loadingLogbookEntries } = Functions.useUiSlice();
  const { currentUser, logbooks, purchases } = Functions.useEntitiesSlice();

  const selectedLogbookId = useSignal<number | null>(null);

  const currentUserLogbooks = Functions.useGetCurrentUserLogbooks();
  const logbookEntries = Functions.useGetLogbookEntries(
    selectedLogbookId.value
  );

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

  const deleteSelectedPurchases = useCallback(
    (logbookEntryIds: number[]): void => {
      dispatch(PurchasesSagas.batchDeletePurchasesRequest(logbookEntryIds));
    },
    []
  );

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
        dispatch(Redux.uiActions.setLoadingLogbooks(true));
        dispatch(fetchUserLogbooksRequest(currentUser.id));
      }
    }
  }, [currentUser, logbooks]);

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
          createText="Create Log Entry"
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

        <Body>
          {loadingLogbookEntries ? (
            <>
              <Globals.Shimmer height={78} borderRadius="six" />
              <Globals.Shimmer height={78} borderRadius="six" />
              <Globals.Shimmer height={78} borderRadius="six" />
              <Globals.Shimmer height={78} borderRadius="six" />
            </>
          ) : logbookEntries ? (
            logbookEntries.map((logbookEntry: Types.LogbookEntry) => {
              return (
                <Components.LogbookEntryDropdown
                  key={`dashboard-logbooks-logbook-entry-dropdown-${logbookEntry.id}`}
                  logbookEntryId={logbookEntry.id}
                  onDragEnd={onDragEnd}
                  deleteSelectedPurchases={deleteSelectedPurchases}
                  deleteLogbookEntry={deleteLogbookEntry}
                  deleteAllPurchases={deleteAllPurchases}
                  addPurchase={addPurchase}
                />
              );
            })
          ) : null}
        </Body>
      </>
    );
  }
};

Logbooks.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout page="Logbooks">{page}</DashboardLayout>;
};

export default Logbooks;
