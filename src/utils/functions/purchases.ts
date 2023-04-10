import * as Drag from "react-beautiful-dnd";

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
