import * as Drag from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useCallback, useEffect } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { fetchLogbookEntryPurchasesRequest } from "@/sagas/purchases.saga";
import { ThemeProps } from "../layout";

import { Header } from "./entry-dropdown-header";
import { Purchases } from "./entry-dropdown-purchases";
import { DeleteButtons } from "./entry-dropdown-delete-buttons";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type SharedProps = { opened: boolean };

const Container = styled.section<SharedProps>`
  position: relative;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border: ${(props: SharedProps & ThemeProps) => {
    return props.opened
      ? `${props.theme.backgroundSix} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  border-radius: ${Styles.pxAsRem.six};
  overflow: hidden;
`;

const Body = styled(motion.article)`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.eight};
`;

// ========================================================================================= //
// [ DYNAMIC IMPORT ] ====================================================================== //
// ========================================================================================= //

const DynamicDeleteConfirmation = dynamic(() =>
  import("../modals/delete-confirmation").then((mod) => mod.DeleteConfirmation)
);

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  logbookEntryId: number;

  onDragEnd: (
    result: Drag.DropResult,
    provided: Drag.ResponderProvided
  ) => void;
  deleteLogbookEntry: (logbookEntryId: number) => void;
  deleteSelectedPurchases: (logbookEntryIds: number[]) => void;
  deleteAllPurchases: (logbookEntryId: number) => void;
  addPurchase: (logbookEntryId: number) => void;
};

export const LogbookEntryDropdown = (props: Props) => {
  Functions.consoleLog("Logbook Entry Dropdown Loaded", false);

  const dispatch = Functions.useAppDispatch();

  const { purchases } = Functions.useEntitiesSlice();
  const logbookEntry = Functions.useGetLogbookEntry(props.logbookEntryId);
  const logbookEntryPurchases = Functions.useGetLogbookEntryPurchases(
    props.logbookEntryId
  );

  const opened = useSignal(false);
  const loadingPurchases = useSignal(false);
  const confirmLogbookEntryDelete = useSignal(false);
  const confirmPurchasesDelete = useSignal(false);
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
    if (opened.value && !logbookEntryPurchases) {
      loadingPurchases.value = true;
      dispatch(fetchLogbookEntryPurchasesRequest(props.logbookEntryId));
    } else if (loadingPurchases.value && logbookEntryPurchases) {
      loadingPurchases.value = false;
    }
  }, [opened.value, logbookEntryPurchases]);

  if (!logbookEntry) {
    return null;
  } else {
    return (
      <>
        <AnimatePresence>
          {confirmLogbookEntryDelete.value && (
            <DynamicDeleteConfirmation
              title="Are you sure you want to delete this logbook entry?"
              open={confirmLogbookEntryDelete}
              onClose={() => (confirmLogbookEntryDelete.value = false)}
              onConfirm={() => props.deleteLogbookEntry(props.logbookEntryId)}
              fixed
            />
          )}
        </AnimatePresence>

        <Container opened={opened.value}>
          <AnimatePresence>
            {confirmPurchasesDelete.value && (
              <DynamicDeleteConfirmation
                title="Delete all purchases for this entry?"
                open={confirmPurchasesDelete}
                onClose={() => (confirmPurchasesDelete.value = false)}
                onConfirm={() => props.deleteAllPurchases(props.logbookEntryId)}
                borderRadius="four"
                fixed
              />
            )}
          </AnimatePresence>

          <Header
            opened={opened}
            confirmLogbookEntryDelete={confirmLogbookEntryDelete}
            logbookEntry={logbookEntry}
          />

          <AnimatePresence>
            {opened.value && (
              <Drag.DragDropContext onDragEnd={props.onDragEnd}>
                <Body>
                  {logbookEntryPurchases && logbookEntryPurchases.length > 0 ? (
                    <>
                      <Purchases
                        opened={opened.value}
                        loadingPurchases={loadingPurchases.value}
                        logbookEntryPurchases={logbookEntryPurchases}
                        onDragEnd={props.onDragEnd}
                        update={updatePurchase}
                        delete={deletePurchase}
                        onCheckActive={onCheckActive}
                        onCheckInactive={onCheckInactive}
                      />
                      <DeleteButtons
                        purchasesSelected={purchasesSelected.value}
                        selectedPurchaseIds={selectedPurchaseIds.value}
                        confirmPurchasesDelete={confirmPurchasesDelete}
                        logbookEntryId={props.logbookEntryId}
                        deleteSelectedPurchases={props.deleteSelectedPurchases}
                        addPurchase={props.addPurchase}
                      />
                    </>
                  ) : null}

                  <Globals.NeutralButton
                    onClick={() => props.addPurchase(props.logbookEntryId)}
                    size="medium"
                    borderRadius="four"
                  >
                    Add
                  </Globals.NeutralButton>
                </Body>
              </Drag.DragDropContext>
            )}
          </AnimatePresence>
        </Container>
      </>
    );
  }
};
