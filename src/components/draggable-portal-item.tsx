import * as Drag from "react-beautiful-dnd";
import { createPortal } from "react-dom";

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

let appPortal: HTMLElement | null;
if (typeof window !== "undefined") {
  appPortal = document.getElementById("app-portal");
}

type Props = {
  provided: Drag.DraggableProvided;
  snapshot: Drag.DraggableStateSnapshot;
  children: React.ReactNode;
};

export const DraggablePortalItem = (props: Props) => {
  const inPortal = props.snapshot.isDragging;

  const child = (
    <div
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      ref={props.provided.innerRef}
    >
      {props.children}
    </div>
  );

  if (!inPortal) {
    return child;
  } else {
    if (appPortal) {
      return createPortal(child, appPortal);
    } else {
      return null;
    }
  }
};
