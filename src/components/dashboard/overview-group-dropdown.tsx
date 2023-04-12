import * as Drag from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { memo, useCallback, useEffect } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";

import * as Globals from "@/components";
import * as PurchasesSagas from "@/sagas/purchases.saga";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = {
  borderRadius?: Types.PxAsRem;
  opened: boolean;
};

const Container = styled.section<ContainerProps>`
  position: relative;
  width: 100%;
  border: ${(props: ThemeProps & ContainerProps) => {
    return props.opened
      ? `${props.theme.backgroundSix} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  border-radius: ${(props) => {
    return props.borderRadius
      ? Styles.pxAsRem[props.borderRadius]
      : Styles.pxAsRem.six;
  }};
  overflow-y: auto;

  @media (hover: hover) {
    :hover {
      border: ${(props: ThemeProps) => {
        return `${props.theme.backgroundSix} solid 1px`;
      }};
    }
  }
`;

type HeaderProps = { opened: boolean };

const Header = styled.header<HeaderProps>`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps & HeaderProps) => {
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

const Title = styled.h3`
  margin: 0;
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const Total = styled.h3`
  margin: 0;
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const Body = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.eight};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
`;

const PurchaseCells = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
`;

// ========================================================================================= //
// [ DYNAMIC IMPORT ] ====================================================================== //
// ========================================================================================= //

const DynamicOverviewDeleteConfirmation = dynamic(() =>
  import("./overview-delete-confirmation").then(
    (mod) => mod.OverviewDeleteConfirmation
  )
);

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  borderRadius?: Types.PxAsRem;
  overviewGroupId: number;

  onDragEnd: (
    result: Drag.DropResult,
    provided: Drag.ResponderProvided
  ) => void;
  deleteAllPurchases: (overviewGroupId: number) => void;
  addPurchase: (overviewGroupId: number) => void;

  initiallyOpen?: true;
};

const ExportedComponent = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { purchases } = Functions.useEntitiesSlice();
  const overviewGroup = Functions.useGetOverviewGroup(props.overviewGroupId);
  const overviewGroupPurchases = Functions.useGetOverviewGroupPurchases(
    props.overviewGroupId
  );

  const opened = useSignal(!!props.initiallyOpen);
  const loadingPurchases = useSignal(false);
  const deleteConfirmationOpen = useSignal(false);

  function calculateNewTotalSpent(
    oldTotalSpent: number,
    oldPurchaseCost: number,
    newPurchaseCost: number
  ): number {
    const purchaseDelta = newPurchaseCost - oldPurchaseCost;
    let newTotalSpent = oldTotalSpent + purchaseDelta;
    if (newTotalSpent < 0) newTotalSpent = 0;
    return Number(Functions.roundNumber(newTotalSpent, 2));
  }

  const updatePurchase = useCallback(
    Functions.debounce(
      (purchaseId: number, description: string, cost: string) => {
        if (overviewGroup && purchases && purchases[purchaseId]) {
          const purchase = purchases[purchaseId];
          // On purchase description update
          if (description !== purchase.description) {
            dispatch(
              PurchasesSagas.updatePurchaseRequest(purchaseId, { description })
            );
          }
          // On purchase cost update
          if (Number(cost) && Number(cost) !== purchase.cost) {
            const purchaseUpdateData = {
              cost: Number(Functions.roundNumber(Number(cost), 2)),
            };

            const newTotalSpent = calculateNewTotalSpent(
              overviewGroup.totalSpent,
              purchase?.cost || 0,
              Number(cost)
            );
            const overviewGroupUpdateData = {
              overviewGroup: {
                id: overviewGroup.id,
                totalSpent: newTotalSpent,
              },
            };

            dispatch(
              PurchasesSagas.updatePurchaseRequest(
                purchaseId,
                purchaseUpdateData,
                overviewGroupUpdateData
              )
            );
          }
        }
      },
      500
    ),
    [overviewGroup, purchases]
  );

  const deletePurchase = useCallback(
    (purchaseId: number) => {
      if (overviewGroup && purchases && purchases[purchaseId]) {
        const purchase = purchases[purchaseId];
        if (purchase.cost) {
          const newTotalSpent = calculateNewTotalSpent(
            overviewGroup.totalSpent,
            purchase.cost,
            0
          );

          dispatch(
            PurchasesSagas.deletePurchaseRequest(purchaseId, {
              overviewGroup: {
                id: props.overviewGroupId,
                totalSpent: newTotalSpent,
              },
            })
          );
        } else {
          dispatch(PurchasesSagas.deletePurchaseRequest(purchaseId));
        }
      }
    },
    [overviewGroup, purchases]
  );

  useEffect(() => {
    if (opened.value && !overviewGroupPurchases) {
      loadingPurchases.value = true;
      dispatch(
        PurchasesSagas.fetchOverviewGroupPurchasesRequest(props.overviewGroupId)
      );
    } else if (loadingPurchases.value && overviewGroupPurchases) {
      loadingPurchases.value = false;
    }
  }, [opened.value, overviewGroupPurchases]);

  return (
    <Container borderRadius={props.borderRadius} opened={opened.value}>
      <AnimatePresence>
        {deleteConfirmationOpen.value && (
          <DynamicOverviewDeleteConfirmation
            open={deleteConfirmationOpen}
            onClose={() => (deleteConfirmationOpen.value = false)}
            onConfirm={() => props.deleteAllPurchases(props.overviewGroupId)}
          />
        )}
      </AnimatePresence>

      <Drag.DragDropContext onDragEnd={props.onDragEnd}>
        <Header
          onClick={() => (opened.value = !opened.value)}
          opened={opened.value}
        >
          <Title>
            {overviewGroup && overviewGroup.name}{" "}
            {overviewGroup?.purchaseIds &&
              overviewGroup.purchaseIds.length > 0 &&
              `(${overviewGroup.purchaseIds.length})`}
          </Title>
          <Total>
            ${Functions.roundNumber(overviewGroup?.totalSpent || 0, 2)}
          </Total>
        </Header>

        <AnimatePresence>
          {opened.value && (
            <Body
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0, delay: 0 }}
            >
              <Drag.Droppable droppableId={Styles.overviewDropdownDroppableId}>
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
                      ) : overviewGroupPurchases ? (
                        overviewGroupPurchases.map(
                          (purchase: Types.Purchase, index: number) => {
                            return (
                              <Drag.Draggable
                                key={`overview-dropdown-purchase-${purchase.id}`}
                                draggableId={`${purchase.id}`}
                                index={index}
                              >
                                {(
                                  provided: Drag.DraggableProvided,
                                  snapshot: Drag.DraggableStateSnapshot
                                ) => {
                                  return (
                                    <Globals.DraggablePortalItem
                                      provided={provided}
                                      snapshot={snapshot}
                                      preventEntireElementDrag
                                    >
                                      <Globals.PurchaseCell
                                        key={`overview-dropdown-purchase-cell-${purchase.id}-${index}`}
                                        borderRadius="four"
                                        provided={provided}
                                        purchaseId={purchase.id}
                                        description={purchase.description}
                                        cost={
                                          purchase.cost
                                            ? Functions.roundNumber(
                                                purchase.cost,
                                                2
                                              )
                                            : ""
                                        }
                                        update={updatePurchase}
                                        delete={deletePurchase}
                                        costForwardText="$"
                                        hideCheck
                                        hideCategories
                                      />
                                    </Globals.DraggablePortalItem>
                                  );
                                }}
                              </Drag.Draggable>
                            );
                          }
                        )
                      ) : null}
                    </PurchaseCells>
                  );
                }}
              </Drag.Droppable>

              {overviewGroup?.purchaseIds &&
                overviewGroup.purchaseIds.length > 0 && (
                  <Globals.NeutralButtonOutlined
                    onClick={() => (deleteConfirmationOpen.value = true)}
                    size="medium"
                  >
                    Delete All
                  </Globals.NeutralButtonOutlined>
                )}

              <Globals.NeutralButton
                onClick={() => props.addPurchase(props.overviewGroupId)}
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
  );
};

export const OverviewGroupDropdown = memo(ExportedComponent);
