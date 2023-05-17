import * as Drag from "react-beautiful-dnd";
import styled, { css } from "styled-components";
import { useCallback, useEffect } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";

import * as Globals from "@/components";
import * as Sagas from "@/sagas";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

import { OverviewHeader } from "./overview-header";
import { LogbookEntryHeader } from "./logbook-entry-header";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = { open: boolean };

const Container = styled.section<ContainerProps>`
  display: flex;
  flex-direction: column;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border: ${(props: ContainerProps & ThemeProps) => {
    return props.open
      ? `${props.theme.backgroundEight} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  border-radius: ${Styles.pxAsRem.eight};
  overflow: hidden;
`;

type HeaderProps = { open: boolean };

const Header = styled.button<HeaderProps>`
  ${Styles.clearButton};
  border-bottom: ${(props: HeaderProps & ThemeProps) => {
    return props.open
      ? `${props.theme.backgroundFour} solid 1px`
      : "transparent solid 1px";
  }};
`;

const Body = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

type PurchaseCellsProps = { updatingPurchases: boolean };

const PurchaseCells = styled.article<PurchaseCellsProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
  padding: ${Styles.pxAsRem.twelve};
  max-height: 400px;
  overflow-y: auto;

  ${(props) =>
    props.updatingPurchases &&
    css`
      ${Styles.preventUserInteraction};
      opacity: 0.5;
    `};
`;

const PurchaseCellsUpdateLoader = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: ${Styles.pxAsRem.four};
  background-color: ${(props: ThemeProps) => props.theme.primaryMain};
  transform-origin: left;
`;

const Buttons = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.twelve};
  border-top: ${(props: ThemeProps) => {
    return `${props.theme.backgroundFour} solid 1px`;
  }};
`;

const buttonStyles = css`
  ${Styles.clearButton};
  ${Styles.transition};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.fourteen};
  border-radius: ${Styles.pxAsRem.six};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const DeleteButton = styled.button`
  ${buttonStyles};
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  border: ${(props: ThemeProps) => `${props.theme.backgroundSix} solid 1px`};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.backgroundTen};
      border: ${(props: ThemeProps) => {
        return `${props.theme.backgroundEight} solid 1px;`;
      }};
    }
  }
`;

const AddButton = styled.button`
  ${buttonStyles};
  color: ${(props: ThemeProps) => props.theme.backgroundNine};
  background-color: ${(props: ThemeProps) => props.theme.backgroundThree};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.text};
      background-color: ${(props: ThemeProps) => props.theme.backgroundFour};
    }
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  type: "overview" | "logbook";
  title?: string;
  associationId: number; // overview group or logbook entry
  associationTotalSpent: number;
  purchases: Types.Purchase[] | undefined;
  purchaseIds: number[];

  deleteSelectedPurchases?: (purchaseIds: number[]) => void;
  deleteAllPurchases: (purchaseIds: number[], associationId: number) => void;
  addPurchase: (associationId: number) => void;

  startOpened?: boolean;
};

type PurchaseIds = { [key: string]: number };

export const PurchaseDropdown = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { loadingPurchases } = Functions.useUiSlice();

  const open = useSignal(!!props.startOpened);
  const loadingPurchasesLocal = useSignal(false);
  const selectedPurchases = useSignal<PurchaseIds>({});
  const purchasesSelected = useSignal(false);

  const selectPurchase = useCallback((purchaseId: number): void => {
    if (selectedPurchases.value[purchaseId]) {
      delete selectedPurchases.value[purchaseId];
      if (Object.values(selectedPurchases.value).length === 0) {
        purchasesSelected.value = false;
      }
    } else {
      selectedPurchases.value[purchaseId] = purchaseId;
      purchasesSelected.value = true;
    }
  }, []);

  function deleteSelectedPurchases(): void {
    if (props.deleteSelectedPurchases) {
      props.deleteSelectedPurchases(Object.values(selectedPurchases.value));
    }
  }

  const setPurchaseCategory = useCallback(
    (purchaseId: number, category: Types.Category): void => {
      dispatch(Sagas.updatePurchaseRequest(purchaseId, { category }));
    },
    []
  );

  const updatePurchase = useCallback(
    Functions.debounce(
      (
        purchaseId: number,
        purchaseDescription: string,
        purchaseCost: number,
        description: string,
        cost: string
      ): void => {
        return Functions.updatePurchase(
          purchaseId,
          purchaseDescription,
          purchaseCost,
          description,
          cost,
          props.type === "overview" ? "overviewGroup" : "logbookEntry",
          props.associationId,
          props.associationTotalSpent,
          dispatch
        );
      }
    ),
    [props.associationTotalSpent]
  );

  const deletePurchase = useCallback(
    (purchaseId: number, purchaseCost: number): void => {
      return Functions.deletePurchase(
        purchaseId,
        purchaseCost,
        props.type === "overview" ? "overviewGroup" : "logbookEntry",
        props.associationId,
        props.associationTotalSpent,
        dispatch
      );
    },
    [props.associationTotalSpent]
  );

  useEffect(() => {
    if (open.value) {
      loadingPurchasesLocal.value = true;
      if (props.type === "overview") {
        dispatch(Sagas.fetchOverviewGroupPurchasesRequest(props.associationId));
      } else {
        dispatch(Sagas.fetchLogbookEntryPurchasesRequest(props.associationId));
      }
    }
  }, [open.value]);

  useEffect(() => {
    if (props.purchases && loadingPurchasesLocal.value) {
      loadingPurchasesLocal.value = false;
    }
  }, [props.purchases]);

  return (
    <Container open={open.value}>
      <Header
        type="button"
        onClick={() => (open.value = !open.value)}
        open={open.value}
      >
        {props.type === "overview" && props.title ? (
          <OverviewHeader
            title={props.title}
            totalSpent={props.associationTotalSpent}
          />
        ) : (
          <LogbookEntryHeader logbookEntryId={props.associationId} />
        )}
      </Header>

      <AnimatePresence>
        {open.value && (
          <Body>
            {loadingPurchasesLocal.value ? (
              <PurchaseCells updatingPurchases={false}>
                <Globals.PurchaseShimmer borderRadius="six" />
                <Globals.PurchaseShimmer borderRadius="six" />
                <Globals.PurchaseShimmer borderRadius="six" />
              </PurchaseCells>
            ) : (
              props.purchases &&
              props.purchases.length > 0 && (
                <Drag.Droppable
                  droppableId={
                    props.type === "overview"
                      ? Styles.overviewDropdownDroppableId
                      : Styles.logbookEntryDropdownDroppableId
                  }
                >
                  {(
                    provided: Drag.DroppableProvided,
                    snapshot: Drag.DroppableStateSnapshot
                  ) => {
                    return (
                      <PurchaseCells
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        updatingPurchases={loadingPurchases}
                      >
                        <AnimatePresence>
                          {loadingPurchases && (
                            <PurchaseCellsUpdateLoader
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              exit={{ width: "0%" }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </AnimatePresence>

                        {props.purchases &&
                          props.purchases.map(
                            (purchase: Types.Purchase, index: number) => {
                              return (
                                <Drag.Draggable
                                  key={`${props.type}-dropdown-purchase-${purchase.id}-${index}`}
                                  draggableId={`${purchase.id}`}
                                  index={index}
                                >
                                  {(
                                    provided: Drag.DraggableProvided,
                                    snapshot: Drag.DraggableStateSnapshot
                                  ) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                      >
                                        <Globals.PurchaseCell
                                          key={`${props.type}-purchase-dropdown-purchases-${purchase.id}-${index}`}
                                          purchaseId={purchase.id}
                                          provided={provided}
                                          selectAction={
                                            props.type === "logbook"
                                              ? selectPurchase
                                              : undefined
                                          }
                                          category={purchase.category}
                                          setPurchaseCategory={
                                            props.type === "logbook"
                                              ? setPurchaseCategory
                                              : undefined
                                          }
                                          description={purchase.description}
                                          cost={
                                            purchase.cost ? purchase.cost : 0
                                          }
                                          updatePurchase={updatePurchase}
                                          deletePurchase={deletePurchase}
                                          showDrag={props.type === "logbook"}
                                          showCategories={
                                            props.type === "logbook"
                                          }
                                          showDelete
                                        />
                                      </div>
                                    );
                                  }}
                                </Drag.Draggable>
                              );
                            }
                          )}
                      </PurchaseCells>
                    );
                  }}
                </Drag.Droppable>
              )
            )}

            <Buttons>
              {props.deleteSelectedPurchases && purchasesSelected.value && (
                <DeleteButton type="button" onClick={deleteSelectedPurchases}>
                  Delete Selected
                </DeleteButton>
              )}

              <DeleteButton
                type="button"
                onClick={() => {
                  props.deleteAllPurchases(
                    props.purchaseIds,
                    props.associationId
                  );
                }}
              >
                Delete All
              </DeleteButton>

              <AddButton
                type="button"
                onClick={() => props.addPurchase(props.associationId)}
              >
                Add
              </AddButton>
            </Buttons>
          </Body>
        )}
      </AnimatePresence>
    </Container>
  );
};
