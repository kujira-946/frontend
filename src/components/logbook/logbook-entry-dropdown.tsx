import * as Drag from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useEffect } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";
import { fetchLogbookEntryPurchasesRequest } from "@/sagas/purchases.saga";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  position: relative;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border-radius: ${Styles.pxAsRem.six};
`;

type HeaderProps = { opened: boolean };

const Header = styled.header<HeaderProps>`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
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

const Body = styled(motion.article)``;

const PurchaseCells = styled.div``;

// ========================================================================================= //
// [ DYNAMIC IMPORT ] ====================================================================== //
// ========================================================================================= //

const DynamicLogbookEntryDeleteConfirmation = dynamic(() =>
  import("./logbook-entry-delete-confirmation").then(
    (mod) => mod.LogbookEntryDeleteConfirmation
  )
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
  deleteAllPurchases: (logbookEntryId: number) => void;
  addPurchase: (logbookEntryId: number) => void;
};

export const LogbookEntryDropdown = (props: Props) => { const dispatch = Functions.useAppDispatch();

  const logbookEntry = Functions.useGetLogbookEntry(props.logbookEntryId);
  const logbookEntryPurchases = Functions.useGetLogbookEntryPurchases(
    props.logbookEntryId
  );

  const opened = useSignal(false);
  const loadingPurchases = useSignal(false);
  const deleteConfirmationOpen = useSignal(false);

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
      <Container>
        <AnimatePresence>
          {deleteConfirmationOpen.value && (
            <DynamicLogbookEntryDeleteConfirmation />
          )}
        </AnimatePresence>

        <Drag.DragDropContext onDragEnd={props.onDragEnd}>
          <Header
            onClick={() => (opened.value = !opened.value)}
            opened={opened.value}
          ></Header>

          <AnimatePresence>
            {opened.value && (
              <Body
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0, delay: 0 }}
              >
                {logbookEntryPurchases && logbookEntryPurchases.length > 0 && (
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
                            logbookEntryPurchases.map(
                              (purchase: Types.Purchase, index: number) => {
                                return (
                                  <Drag.Draggable
                                    key={`logbook-entries-dropdown-purchase-${purchase.id}`}
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
                                            key={`logbook-entry-dropdown-purchase-${purchase.id}`}
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
                                            costForwardText="$"
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
                )}

                <Globals.NeutralButtonOutlined
                  onClick={() => (deleteConfirmationOpen.value = true)}
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
    );
  }
};
