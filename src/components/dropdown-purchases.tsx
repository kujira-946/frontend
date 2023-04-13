import * as Drag from "react-beautiful-dnd";
import styled from "styled-components";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article``;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  type: "Overview Groups" | "Logbook Entries";
  purchases: Types.Purchase[];

  update?: (purchaseId: number, description: string, cost: string) => void;
  delete?: (purchaseId: number) => void;

  hideCheck?: true;
  hideCategories?: true;
};

export const DropdownPurchases = (props: Props) => {
  return (
    <Container>
      {props.purchases.map((purchase: Types.Purchase, index: number) => {
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
                    description={purchase.description}
                    cost={
                      purchase.cost
                        ? Functions.roundNumber(purchase.cost, 2)
                        : ""
                    }
                    update={props.update}
                    delete={props.delete}
                    costForwardText="$"
                    hideCheck={props.hideCheck}
                    hideCategories={props.hideCategories}
                  />
                </Globals.DraggablePortalItem>
              );
            }}
          </Drag.Draggable>
        );
      })}
    </Container>
  );
};
