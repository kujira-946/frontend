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
  preventEntireElementDrag?: true;
  children: React.ReactNode;
};

export const DraggablePortalItem = (props: Props) => {
  const inPortal = props.snapshot.isDragging;

  let dragProps = { ...props.provided.draggableProps };
  if (!props.preventEntireElementDrag) {
    dragProps = { ...dragProps, ...props.provided.dragHandleProps };
  }

  const child = (
    <div {...dragProps} ref={props.provided.innerRef} tabIndex={-1}>
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
