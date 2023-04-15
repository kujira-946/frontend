import styled from "styled-components";
import { memo, useCallback } from "react";

import * as Globals from "@/components";
import * as PurchasesSagas from "@/sagas/purchases.saga";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
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
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  logbookId: number;
};

const ExportedComponent = (props: Props) => {
  Functions.consoleLog("Logbook Entries Loaded", false);

  const dispatch = Functions.useAppDispatch();

  const { loadingLogbookEntries } = Functions.useUiSlice();
  const logbook = Functions.useGetLogbook(props.logbookId);

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
      ) : logbook && logbook.logbookEntryIds ? (
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
          })
      ) : null}
    </Container>
  );
};

export const LogbookEntries = memo(ExportedComponent);
