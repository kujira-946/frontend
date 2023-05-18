import * as Drag from "react-beautiful-dnd";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import {
  Association,
  deletePurchaseRequest,
  updatePurchasePlacementRequest,
  updatePurchaseRequest,
} from "@/sagas/purchases.saga";

export function onDragEnd(
  result: Drag.DropResult,
  provided: Drag.ResponderProvided,
  association: Association,
  dispatch: any
): void {
  const previousIndex = result.source.index;
  const newIndex = result.destination?.index;

  if (newIndex && newIndex !== previousIndex) {
    const purchaseId = Number(result.draggableId);
    const previousPlacement = previousIndex + 1;
    const updatedPlacement = newIndex + 1;

    dispatch(
      updatePurchasePlacementRequest(
        purchaseId,
        previousPlacement,
        updatedPlacement
      )
    );
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
  purchaseId: number,
  purchaseDescription: string,
  purchaseCost: number,
  description: string,
  cost: string,
  association: "overviewGroup" | "logbookEntry",
  associationId: number,
  associationTotalSpent: number,
  dispatch: any
) {
  // On purchase description update.
  if (description !== purchaseDescription) {
    dispatch(Redux.uiActions.setLoadingPurchases(true));
    dispatch(updatePurchaseRequest(purchaseId, { description }));
  }
  // On purchase cost update.
  if (Number(cost) && Number(cost) !== purchaseCost) {
    const formattedCost = Number(Functions.roundNumber(Number(cost), 2));
    const purchaseUpdateData = { cost: formattedCost };
    const newTotalSpent = calculateNewTotalSpent(
      associationTotalSpent,
      purchaseCost,
      Number(cost)
    );
    const associationUpdateData = {
      [association]: { id: associationId, totalSpent: newTotalSpent },
    };
    dispatch(Redux.uiActions.setLoadingPurchases(true));
    dispatch(
      updatePurchaseRequest(
        purchaseId,
        purchaseUpdateData,
        associationUpdateData
      )
    );
  }
}

export function deletePurchase(
  purchaseId: number,
  purchaseCost: number,
  association: "overviewGroup" | "logbookEntry",
  associationId: number,
  associationTotalSpent: number,
  dispatch: any
) {
  const newTotalSpent = calculateNewTotalSpent(
    associationTotalSpent,
    purchaseCost,
    0
  );
  dispatch(
    deletePurchaseRequest(purchaseId, {
      [association]: {
        id: associationId,
        totalSpent: newTotalSpent,
      },
    })
  );
}
