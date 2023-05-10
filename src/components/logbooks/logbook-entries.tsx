import styled from "styled-components";
import { useCallback, useEffect } from "react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { uiActions } from "@/redux";
import { fetchLogbookLogbookEntriesRequest } from "@/sagas/logbook-entries.saga";
import { LogbookEntry } from "./logbook-entry";
import {
  createPurchaseRequest,
  deleteAssociatedPurchasesRequest,
} from "@/sagas/purchases.saga";
import { batchDeletePurchasesRequest } from "@/sagas/purchases.saga";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twenty};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  selectedLogbookId: number;
};

export const LogbookEntries = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { logbookTotalSpent } = Functions.useSignalsStore().dashboard;
  const { loadingLogbookEntries } = Functions.useUiSlice();
  const logbookEntries = Functions.useGetLogbookLogbookEntries(
    props.selectedLogbookId
  );

  const deleteSelectedPurchases = useCallback((purchaseIds: number[]): void => {
    dispatch(batchDeletePurchasesRequest(purchaseIds));
  }, []);

  const deleteAllPurchases = useCallback(
    (purchaseIds: number[], logbookEntryId: number): void => {
      dispatch(
        deleteAssociatedPurchasesRequest(purchaseIds, {
          logbookEntryId,
        })
      );
    },
    []
  );

  const addPurchase = useCallback((logbookEntryId: number): void => {
    dispatch(createPurchaseRequest({ placement: 0, logbookEntryId }));
  }, []);

  useEffect(() => {
    if (!logbookEntries) {
      dispatch(uiActions.setLoadingLogbookEntries(true));
      dispatch(fetchLogbookLogbookEntriesRequest(props.selectedLogbookId));
    } else {
      let totalSpentSum = 0;
      logbookEntries.forEach((logbookEntry: Types.LogbookEntry) => {
        totalSpentSum += logbookEntry.totalSpent;
      });
      logbookTotalSpent.value = totalSpentSum;
    }
  }, [logbookEntries]);

  return (
    <Container>
      {loadingLogbookEntries ? (
        <>
          <Globals.LogbookEntryShimmer />
          <Globals.LogbookEntryShimmer />
        </>
      ) : (
        logbookEntries &&
        Functions.deepCopy(logbookEntries)
          .reverse()
          .map((logbookEntry: Types.LogbookEntry, index: number) => {
            return (
              <LogbookEntry
                key={`logbooks-logbook-entries-entry-${logbookEntry.id}-${index}`}
                logbookEntryId={logbookEntry.id}
                logbookEntryTotalSpent={logbookEntry.totalSpent}
                logbookEntryPurchaseIds={logbookEntry.purchaseIds || []}
                deleteSelectedPurchases={deleteSelectedPurchases}
                deleteAllPurchases={deleteAllPurchases}
                addPurchase={addPurchase}
              />
            );
          })
      )}
    </Container>
  );
};
