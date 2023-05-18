import * as Drag from "react-beautiful-dnd";
import styled from "styled-components";
import { useCallback, useEffect } from "react";

import * as Globals from "@/components";
import * as Sagas from "@/sagas";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { LogbookEntry } from "./logbook-entry";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twenty};
  min-width: 540px;
  width: 100%;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  selectedLogbookId: number;
};

export const LogbookEntries = (props: Props) => {
  console.log("Logbook entries rendered");

  const dispatch = Functions.useAppDispatch();

  const { logbookTotalSpent } = Functions.useSignalsStore().dashboard;
  const { loadingLogbookEntries } = Functions.useUiSlice();
  const logbookEntries = Functions.useGetLogbookLogbookEntries(
    props.selectedLogbookId
  );

  const onDragEnd = useCallback(
    (result: Drag.DropResult, provided: Drag.ResponderProvided): void => {
      return Functions.onDragEnd(result, provided, "Logbook Entry", dispatch);
    },
    []
  );

  const deleteSelectedPurchases = useCallback(
    (purchaseIds: number[], associationId: number): void => {
      dispatch(
        Sagas.bulkDeletePurchasesRequest(
          purchaseIds,
          "Logbook Entry",
          associationId
        )
      );
    },
    []
  );

  const deleteAllPurchases = useCallback(
    (purchaseIds: number[], logbookEntryId: number): void => {
      dispatch(
        Sagas.deleteAssociatedPurchasesRequest(purchaseIds, {
          logbookEntryId,
        })
      );
    },
    []
  );

  const addPurchase = useCallback((logbookEntryId: number): void => {
    dispatch(Sagas.createPurchaseRequest({ logbookEntryId }));
  }, []);

  useEffect(() => {
    if (logbookEntries) {
      let totalSpentSum = 0;
      logbookEntries.forEach((logbookEntry: Types.LogbookEntry) => {
        totalSpentSum += logbookEntry.totalSpent;
      });
      logbookTotalSpent.value = totalSpentSum;
    }
  }, [logbookEntries]);

  return (
    <Drag.DragDropContext onDragEnd={onDragEnd}>
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
                  deleteSelectedPurchases={deleteSelectedPurchases}
                  deleteAllPurchases={deleteAllPurchases}
                  addPurchase={addPurchase}
                />
              );
            }
          )
        )}
      </Container>
    </Drag.DragDropContext>
  );
};
