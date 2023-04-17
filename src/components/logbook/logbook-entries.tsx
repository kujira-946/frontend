import styled from "styled-components";
import { memo, useCallback, useEffect } from "react";

import * as LogbookEntriesSagas from "@/sagas/logbook-entries.saga";
import * as PurchasesSagas from "@/sagas/purchases.saga";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";

import { LogbookEntryDropdown } from "./entry-dropdown";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.sixteen};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  logbookId: number;
};

const ExportedComponent = (props: Props) => {
  // Functions.consoleLog("Logbook Entries Rendered", false);

  const dispatch = Functions.useAppDispatch();

  const logbook = Functions.useGetLogbook(props.logbookId);

  const onDragEnd = useCallback(Functions.onDragEnd, []);

  const deleteLogbookEntry = useCallback((logbookEntryId: number): void => {
    dispatch(LogbookEntriesSagas.deleteLogbookEntryRequest(logbookEntryId));
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

  // ↓↓↓ Fetching the currently-selected logbook's associated logbook entries. ↓↓↓ //
  useEffect(() => {
    dispatch(
      LogbookEntriesSagas.fetchLogbookLogbookEntriesRequest(props.logbookId)
    );
  }, []);

  return (
    <Container>
      {logbook &&
        logbook.logbookEntryIds &&
        Functions.deepCopy(logbook.logbookEntryIds)
          .reverse()
          .map((logbookEntryId: number) => {
            return (
              <LogbookEntryDropdown
                key={`dashboard-logbooks-logbook-entry-dropdown-${logbookEntryId}`}
                logbookEntryId={logbookEntryId}
                onDragEnd={onDragEnd}
                deleteLogbookEntry={deleteLogbookEntry}
                deleteSelectedPurchases={deleteSelectedPurchases}
                deleteAllPurchases={deleteAllPurchases}
                addPurchase={addPurchase}
              />
            );
          })}
    </Container>
  );
};

export const LogbookEntries = memo(ExportedComponent);
