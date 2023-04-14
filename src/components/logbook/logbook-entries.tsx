import styled from "styled-components";
import { useCallback } from "react";

import * as Globals from "@/components";
import * as PurchasesSagas from "@/sagas/purchases.saga";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { deleteLogbookEntryRequest } from "@/sagas/logbook-entries.saga";

import { LogbookEntryDropdown } from "./logbook-entry-dropdown";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.sixteen};

  border: red solid 1px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  logbookId: number;
};

export const LogbookEntries = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { loadingLogbookEntries } = Functions.useUiSlice();
  const logbookEntries = Functions.useGetLogbookEntries(props.logbookId);

  const onDragEnd = useCallback(Functions.onDragEnd, []);

  const deleteLogbookEntry = useCallback((logbookEntryId: number): void => {
    dispatch(deleteLogbookEntryRequest(logbookEntryId));
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

  return (
    <Container>
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
            <LogbookEntryDropdown
              key={`dashboard-logbooks-logbook-entry-dropdown-${logbookEntry.id}`}
              logbookEntryId={logbookEntry.id}
              onDragEnd={onDragEnd}
              deleteLogbookEntry={deleteLogbookEntry}
              deleteSelectedPurchases={deleteSelectedPurchases}
              deleteAllPurchases={deleteAllPurchases}
              addPurchase={addPurchase}
            />
          );
        })
      ) : null}
    </Container>
  );
};
