import * as Drag from "react-beautiful-dnd";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

import { updateOverviewGroupRequest } from "@/sagas/overview-groups.saga";
import {
  createPurchaseRequest,
  deleteAssociatedPurchasesRequest,
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

type PurchaseAssociation = "Overview Group" | "Logbook Entry";

export function deleteAllAssociatedPurchases(
  type: PurchaseAssociation,
  dispatch: Dispatch<AnyAction>,
  id: number
): void {
  if (type === "Overview Group") {
    dispatch(deleteAssociatedPurchasesRequest({ overviewGroupId: id }));
    dispatch(updateOverviewGroupRequest(id, { totalCost: 0 }));
  } else {
    dispatch(deleteAssociatedPurchasesRequest({ logbookEntryId: id }));
  }
}

export function addPurchase(
  type: PurchaseAssociation,
  dispatch: Dispatch<AnyAction>,
  id: number
): void {
  if (type === "Overview Group") {
    dispatch(createPurchaseRequest({ placement: 0, overviewGroupId: id }));
  } else {
    dispatch(createPurchaseRequest({ placement: 0, logbookEntryId: id }));
  }
}
