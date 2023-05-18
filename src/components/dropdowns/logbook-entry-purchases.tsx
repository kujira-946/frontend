import * as Drag from "react-beautiful-dnd";
import { AnimatePresence } from "framer-motion";

import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";

import { PurchaseCells } from "./purchase-cells";
import { PurchaseCellsUpdateLoader } from "./purchase-cells-update-loader";
import { PurchaseCell } from "./purchase-cell";

type Props = {
  purchases: Types.Purchase[];
  selectPurchase: (purchaseId: number) => void;
  setPurchaseCategory: (purchaseId: number, category: Types.Category) => void;
  updatePurchase: (
    purchaseId: number,
    purchaseDescription: string,
    purchaseCost: number,
    description: string,
    cost: string
  ) => void;
  deletePurchase: (purchaseId: number, purchaseCost: number) => void;
};

export const LogbookEntryPurchases = (props: Props) => {
  const { loadingPurchases } = Functions.useUiSlice();

  return (
    <Drag.Droppable droppableId={Styles.logbookEntryDropdownDroppableId}>
      {(
        provided: Drag.DroppableProvided,
        snapshot: Drag.DroppableStateSnapshot
      ) => {
        return (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <PurchaseCells updatingPurchases={loadingPurchases}>
              <AnimatePresence>
                {loadingPurchases && <PurchaseCellsUpdateLoader />}
              </AnimatePresence>

              {props.purchases.map(
                (purchase: Types.Purchase, index: number) => {
                  return (
                    <Drag.Draggable
                      key={`logbook-entry-dropdown-purchases-draggable-${purchase.id}-${index}`}
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
                            <PurchaseCell
                              key={`logbook-entry-dropdown-purchase-${purchase.id}-${index}`}
                              purchaseId={purchase.id}
                              provided={provided}
                              selectAction={props.selectPurchase}
                              category={purchase.category}
                              setPurchaseCategory={props.setPurchaseCategory}
                              description={purchase.description}
                              cost={purchase.cost ? purchase.cost : 0}
                              updatePurchase={props.updatePurchase}
                              deletePurchase={props.deletePurchase}
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
          </div>
        );
      }}
    </Drag.Droppable>
  );
};
