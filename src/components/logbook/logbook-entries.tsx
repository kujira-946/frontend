import styled from "styled-components";
import { useCallback, useEffect } from "react";

import * as PurchasesSagas from "@/sagas/purchases.saga";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { deleteLogbookEntryRequest } from "@/sagas/logbook-entries.saga";

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

export const LogbookEntries = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { logbookTotalSpent } = Functions.useSignalsStore().dashboard;
  const logbook = Functions.useGetLogbook(props.logbookId);
  const totalSpent = Functions.useGetLogbookTotalSpent(props.logbookId);

  const onDragEnd = useCallback(Functions.onDragEnd, []);

  // const deleteLogbookEntry = useCallback((logbookEntryId: number): void => {
  //   dispatch(deleteLogbookEntryRequest(logbookEntryId));
  // }, []);

  // const deleteSelectedPurchases = useCallback((purchaseIds: number[]): void => {
  //   dispatch(PurchasesSagas.batchDeletePurchasesRequest(purchaseIds));
  // }, []);

  // const deleteAllPurchases = useCallback((logbookEntryId: number): void => {
  //   dispatch(
  //     PurchasesSagas.deleteAssociatedPurchasesRequest({ logbookEntryId })
  //   );
  // }, []);

  const addPurchase = useCallback((logbookEntryId: number): void => {
    dispatch(
      PurchasesSagas.createPurchaseRequest({ placement: 0, logbookEntryId })
    );
  }, []);

  useEffect(() => {
    if (totalSpent) logbookTotalSpent.value = totalSpent;
  }, [totalSpent]);

  return (
    <Container>
      {/* {logbook &&
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
          })} */}
    </Container>
  );
};
