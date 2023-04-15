import * as Drag from "react-beautiful-dnd";
import styled from "styled-components";

import * as Globals from "@/components";
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
  opened: boolean;
  loadingPurchases: boolean;
  logbookEntryPurchases: Types.Purchase[];

  onDragEnd: (
    result: Drag.DropResult,
    provided: Drag.ResponderProvided
  ) => void;
  update: (purchaseId: number, description: string, cost: string) => void;
  delete: (purchaseId: number) => void;
  onCheckActive: (purchaseId: number) => void;
  onCheckInactive: (purchaseId: number) => void;
};

export const LogbookEntryDropdownPurchases = (props: Props) => {
  return (
    <Drag.Droppable droppableId={Styles.logbookEntryDropdownDroppableId}>
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
            ) : props.logbookEntryPurchases ? (
              <Globals.DropdownPurchases
                type="Logbook Entries"
                purchases={props.logbookEntryPurchases}
                update={props.update}
                delete={props.delete}
                onCheckActive={props.onCheckActive}
                onCheckInactive={props.onCheckInactive}
              />
            ) : null}
          </PurchaseCells>
        );
      }}
    </Drag.Droppable>
  );
};
