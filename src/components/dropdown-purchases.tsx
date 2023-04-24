import * as Drag from "react-beautiful-dnd";
import styled from "styled-components";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const PurchaseCells = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  type: "Overview Groups" | "Logbook Entries";
  opened: boolean;
  loadingPurchases: boolean;
  purchases: Types.Purchase[];

  onDragEnd: (
    result: Drag.DropResult,
    provided: Drag.ResponderProvided
  ) => void;
  update: (purchaseId: number, description: string, cost: string) => void;
  delete: (purchaseId: number) => void;
  setPurchaseCategory?: (purchaseId: number, category: Types.Category) => void;
  onCheckActive?: (purchaseId: number) => void;
  onCheckInactive?: (purchaseId: number) => void;

  hideCheck?: true;
  hideCategories?: true;
};

export const DropdownPurchases = (props: Props) => {
  return (
    <Drag.Droppable
      droppableId={
        props.type === "Overview Groups"
          ? Styles.overviewDropdownDroppableId
          : Styles.logbookEntryDropdownDroppableId
      }
    >
      {(
        provided: Drag.DroppableProvided,
        snapshot: Drag.DroppableStateSnapshot
      ) => {
        return (
          <PurchaseCells {...provided.droppableProps} ref={provided.innerRef}>
            {props.loadingPurchases ? (
              <>
                <Globals.Shimmer borderRadius="six" height={40} />
                <Globals.Shimmer borderRadius="six" height={40} />
                <Globals.Shimmer borderRadius="six" height={40} />
                <Globals.Shimmer borderRadius="six" height={40} />
              </>
            ) : (
              props.purchases &&
              props.purchases.map((purchase: Types.Purchase, index: number) => {
                return (
                  <Drag.Draggable
                    key={`${props.type}-dropdown-purchase-${purchase.id}`}
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
                            key={`${props.type}-dropdown-purchase-cell-${purchase.id}-${index}`}
                            borderRadius="four"
                            provided={provided}
                            purchaseId={purchase.id}
                            category={purchase.category}
                            description={purchase.description}
                            cost={
                              purchase.cost
                                ? Functions.roundNumber(purchase.cost, 2)
                                : ""
                            }
                            setPurchaseCategory={props.setPurchaseCategory}
                            update={props.update}
                            delete={props.delete}
                            onCheckActive={props.onCheckActive}
                            onCheckInactive={props.onCheckInactive}
                            costForwardText="$"
                            hideCheck={props.hideCheck}
                            hideCategories={props.hideCategories}
                          />
                        </Globals.DraggablePortalItem>
                      );
                    }}
                  </Drag.Draggable>
                );
              })
            )}
          </PurchaseCells>
        );
      }}
    </Drag.Droppable>
  );
};
