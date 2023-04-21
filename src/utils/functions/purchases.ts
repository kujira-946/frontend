import * as Drag from "react-beautiful-dnd";

import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import {
  deletePurchaseRequest,
  updatePurchaseRequest,
} from "@/sagas/purchases.saga";

export function onDragEnd(
  result: Drag.DropResult,
  provided: Drag.ResponderProvided
): void {
  console.log("Onboarding Dragged");
  const previousIndex = result.source.index;
  const newIndex = result.destination?.index;
  if (newIndex && newIndex !== previousIndex) {
    const purchaseId = Number(result.draggableId);
    const updatedPlacement = newIndex + 1;
    console.log("Purchase Id:", purchaseId);
    console.log("Updated Placement:", updatedPlacement);
    // dispatch(
    //   PurchasesSagas.updatePurchaseRequest(purchaseId, { placement: updatedPlacement })
    // );
  }
}

export function calculateNewTotalSpent(
  oldTotalSpent: number,
  oldPurchaseCost: number,
  newPurchaseCost: number
): number {
  const purchaseDelta = newPurchaseCost - oldPurchaseCost;
  let newTotalSpent = oldTotalSpent + purchaseDelta;
  if (newTotalSpent < 0) newTotalSpent = 0;
  return Number(Functions.roundNumber(newTotalSpent, 2));
}

export function updatePurchase(
  purchase: Types.Purchase,
  description: string,
  cost: string,
  association: "overviewGroup" | "logbookEntry",
  associationId: number,
  associationTotalSpent: number,
  dispatch: any
) {
  // On purchase description update.
  if (description !== purchase.description) {
    dispatch(updatePurchaseRequest(purchase.id, { description }));
  }
  // On purchase cost update.
  if (Number(cost) && Number(cost) !== purchase.cost) {
    const formattedCost = Number(Functions.roundNumber(Number(cost), 2));
    const purchaseUpdateData = { cost: formattedCost };
    const newTotalSpent = calculateNewTotalSpent(
      associationTotalSpent,
      purchase.cost || 0,
      Number(cost)
    );
    const associationUpdateData = {
      [association]: { id: associationId, totalSpent: newTotalSpent },
    };
    dispatch(
      updatePurchaseRequest(
        purchase.id,
        purchaseUpdateData,
        associationUpdateData
      )
    );
  }
}

export function deletePurchase(
  purchase: Types.Purchase,
  association: "overviewGroup" | "logbookEntry",
  associationId: number,
  associationTotalSpent: number,
  dispatch: any
) {
  if (purchase.cost) {
    const newTotalSpent = calculateNewTotalSpent(
      associationTotalSpent,
      purchase.cost,
      0
    );
    dispatch(
      deletePurchaseRequest(purchase.id, {
        [association]: {
          id: associationId,
          totalSpent: newTotalSpent,
        },
      })
    );
  } else {
    dispatch(deletePurchaseRequest(purchase.id));
  }
}
