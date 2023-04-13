import * as Drag from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useCallback, useEffect } from "react";
import { effect, useSignal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { fetchLogbookEntryPurchasesRequest } from "@/sagas/purchases.saga";
import { ThemeProps } from "../layout";

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

const Header = styled.header<SharedProps>`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  gap: ${Styles.pxAsRem.forty};
  padding: ${Styles.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps & SharedProps) => {
    return props.opened
      ? `${props.theme.backgroundFour} solid 1px`
      : `transparent solid 1px`;
  }};
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
    }
  }
`;

const HeaderSection = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
`;

const HeaderSectionTitle = styled.span`
  display: block;
  color: ${(props: ThemeProps) => props.theme.backgroundSeven};
  font-size: ${Styles.pxAsRem.ten};
  font-weight: ${Styles.fontWeights.bold};
`;

const DeleteButton = styled.button`
  ${Styles.clearButton};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Body = styled(motion.article)`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.eight};
`;

const PurchaseCells = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
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

const headerSections = ["Date", "Spent", "Budget", "Status"] as const;

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
  const dispatch = Functions.useAppDispatch();

  const { theme } = Functions.useSignalsStore().ui;
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
            onClick={() => (opened.value = !opened.value)}
            opened={opened.value}
          >
            {headerSections.map((section: typeof headerSections[number]) => {
              return (
                <HeaderSection key={`logbook-entry-dropdown-header-${section}`}>
                  <HeaderSectionTitle>{section}</HeaderSectionTitle>
                  <Globals.InputMini
                    borderRadius="six"
                    placeholder={section === "Date" ? "MM/DD/YYYY" : "Budget"}
                    userInput=""
                    setUserInput={() => console.log("foo")}
                  />
                </HeaderSection>
              );
            })}
            <DeleteButton
              type="button"
              name="Logbook Entry Dropdown Delete Button"
              tabIndex={-1}
              onClick={(event: Types.OnClick) => {
                event.stopPropagation();
                confirmLogbookEntryDelete.value = true;
              }}
            >
              <Icons.Close
                height={12}
                fill={Styles.background[theme.value].seven}
                hoveredFill={Styles.text[theme.value]}
                addHover
              />
            </DeleteButton>
          </Header>

          <Drag.DragDropContext onDragEnd={props.onDragEnd}>
            <AnimatePresence>
              {opened.value && (
                <Body
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0, delay: 0 }}
                >
                  <Drag.Droppable
                    droppableId={Styles.logbookEntryDropdownDroppableId}
                  >
                    {(
                      provided: Drag.DroppableProvided,
                      snapshot: Drag.DroppableStateSnapshot
                    ) => {
                      return (
                        <PurchaseCells
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {loadingPurchases.value ? (
                            <>
                              <Globals.Shimmer borderRadius="six" height={40} />
                              <Globals.Shimmer borderRadius="six" height={40} />
                              <Globals.Shimmer borderRadius="six" height={40} />
                              <Globals.Shimmer borderRadius="six" height={40} />
                            </>
                          ) : logbookEntryPurchases ? (
                            <Globals.DropdownPurchases
                              type="Logbook Entries"
                              purchases={logbookEntryPurchases}
                              update={updatePurchase}
                              delete={deletePurchase}
                              onCheckActive={onCheckActive}
                              onCheckInactive={onCheckInactive}
                            />
                          ) : null}
                        </PurchaseCells>
                      );
                    }}
                  </Drag.Droppable>

                  {purchasesSelected.value && (
                    <Globals.NeutralButtonOutlined
                      onClick={() =>
                        props.deleteSelectedPurchases(
                          Object.values(selectedPurchaseIds.value)
                        )
                      }
                      size="medium"
                      borderRadius="four"
                    >
                      Delete Selected
                    </Globals.NeutralButtonOutlined>
                  )}

                  <Globals.NeutralButtonOutlined
                    onClick={() => (confirmPurchasesDelete.value = true)}
                    size="medium"
                    borderRadius="four"
                  >
                    Delete All
                  </Globals.NeutralButtonOutlined>

                  <Globals.NeutralButton
                    onClick={() => props.addPurchase(props.logbookEntryId)}
                    size="medium"
                    borderRadius="four"
                  >
                    Add
                  </Globals.NeutralButton>
                </Body>
              )}
            </AnimatePresence>
          </Drag.DragDropContext>
        </Container>
      </>
    );
  }
};
