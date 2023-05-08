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

  const { loadingLogbookEntries } = Functions.useUiSlice();
  const logbookEntries = Functions.useGetLogbookLogbookEntries(
    props.selectedLogbookId
  );

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
        logbookEntries.map(
          (logbookEntry: Types.LogbookEntry, index: number) => {
            return (
              <LogbookEntry
                key={`logbooks-logbook-entries-entry-${logbookEntry.id}-${index}`}
                logbookEntryId={logbookEntry.id}
                logbookEntryTotalSpent={logbookEntry.totalSpent}
                logbookEntryPurchaseIds={logbookEntry.purchaseIds || []}
                deleteAllPurchases={deleteAllPurchases}
                addPurchase={addPurchase}
              />
            );
          }
        )
      )}
    </Container>
  );
};