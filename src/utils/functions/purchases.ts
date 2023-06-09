import * as Drag from "react-beautiful-dnd";

import * as Sagas from "@/sagas";

export function onDragEnd(
  result: Drag.DropResult,
  provided: Drag.ResponderProvided,
  dispatch: any
): void {
  const previousIndex = result.source.index;
  const newIndex = result.destination?.index;

  if ((newIndex || newIndex === 0) && newIndex !== previousIndex) {
    const purchaseId = Number(result.draggableId);
    const previousPlacement = previousIndex + 1;
    const updatedPlacement = newIndex + 1;

    dispatch(
      Sagas.updatePurchasePlacementRequest(
        purchaseId,
        previousPlacement,
        updatedPlacement
      )
    );
  }
}
