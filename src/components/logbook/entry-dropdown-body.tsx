import * as Drag from "react-beautiful-dnd";
import styled from "styled-components";
import { useCallback, useEffect } from "react";
import { Signal, useSignal } from "@preact/signals-react";
import { motion } from "framer-motion";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { fetchLogbookEntryPurchasesRequest } from "@/sagas/purchases.saga";

import { DeleteButtons } from "./entry-dropdown-delete-buttons";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled(motion.article)`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.eight};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  logbookEntryId: number;
  opened: boolean;
  confirmPurchasesDelete: Signal<boolean>;

  onDragEnd: (
    result: Drag.DropResult,
    provided: Drag.ResponderProvided
  ) => void;
  deleteLogbookEntry: (logbookEntryId: number) => void;
  deleteSelectedPurchases: (logbookEntryIds: number[]) => void;
  deleteAllPurchases: (logbookEntryId: number) => void;
  addPurchase: (logbookEntryId: number) => void;
};

export const EntryDropdownBody = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { purchases } = Functions.useEntitiesSlice();
  const logbookEntry = Functions.useGetLogbookEntry(props.logbookEntryId);
  const logbookEntryPurchases = Functions.useGetLogbookEntryPurchases(
    props.logbookEntryId
  );

  const loadingPurchases = useSignal(false);
  const selectedPurchaseIds = useSignal<{ [key: string]: number }>({});
  const purchasesSelected = useSignal(false);

  const updatePurchase = useCallback(
    (purchaseId: number, description: string, cost: string) => {
      if (logbookEntry && purchases && purchases[purchaseId]) {
        return Functions.updatePurchase(
          purchases[purchaseId],
          description,
          cost,
          "logbookEntry",
          logbookEntry.id,
          logbookEntry.totalSpent,
          dispatch
        )();
      }
    },
    [logbookEntry, purchases]
  );

  const deletePurchase = useCallback(
    (purchaseId: number) => {
      if (logbookEntry && purchases && purchases[purchaseId]) {
        return Functions.deletePurchase(
          purchases[purchaseId],
          "logbookEntry",
          logbookEntry.id,
          logbookEntry.totalSpent,
          dispatch
        );
      }
    },
    [logbookEntry, purchases]
  );

  const onCheckActive = useCallback((purchaseId: number) => {
    selectedPurchaseIds.value[purchaseId] = purchaseId;
    purchasesSelected.value = true;
  }, []);

  const onCheckInactive = useCallback((purchaseId: number) => {
    delete selectedPurchaseIds.value[purchaseId];
    if (Object.values(selectedPurchaseIds.value).length === 0) {
      purchasesSelected.value = false;
    }
  }, []);

  // ↓↓↓ Fetching logbook entry purchases when dropdown opened. ↓↓↓ //
  useEffect(() => {
    if (props.opened && !logbookEntryPurchases) {
      loadingPurchases.value = true;
      dispatch(fetchLogbookEntryPurchasesRequest(props.logbookEntryId));
    } else if (loadingPurchases.value && logbookEntryPurchases) {
      loadingPurchases.value = false;
    }
  }, [props.opened, logbookEntryPurchases]);

  return (
    <Container>
      <Drag.DragDropContext onDragEnd={props.onDragEnd}>
        {logbookEntryPurchases && logbookEntryPurchases.length > 0 && (
          <>
            <Globals.DropdownPurchases
              type="Logbook Entries"
              opened={props.opened}
              loadingPurchases={loadingPurchases.value}
              purchases={logbookEntryPurchases}
              onDragEnd={props.onDragEnd}
              update={updatePurchase}
              delete={deletePurchase}
              onCheckActive={onCheckActive}
              onCheckInactive={onCheckInactive}
            />
            <DeleteButtons
              purchasesSelected={purchasesSelected.value}
              selectedPurchaseIds={selectedPurchaseIds.value}
              confirmPurchasesDelete={props.confirmPurchasesDelete}
              logbookEntryId={props.logbookEntryId}
              deleteSelectedPurchases={props.deleteSelectedPurchases}
              addPurchase={props.addPurchase}
            />
          </>
        )}

        <Globals.NeutralButton
          onClick={() => props.addPurchase(props.logbookEntryId)}
          size="medium"
          borderRadius="four"
        >
          Add
        </Globals.NeutralButton>
      </Drag.DragDropContext>
    </Container>
  );
};
