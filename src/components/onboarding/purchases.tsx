import * as Drag from "react-beautiful-dnd";

import * as Globals from "@/components";
import * as Dashboard from "@/components/dashboard";
import * as Functions from "@/utils/functions";

type Props = {
  type: "Recurring" | "Incoming";
  overviewGroupId: number;

  onDragEnd: (
    result: Drag.DropResult,
    provided: Drag.ResponderProvided
  ) => void;
  deleteAllPurchases: (overviewGroupId: number) => void;
  addPurchase: (overviewGroupId: number) => void;
};

export const Purchases = (props: Props) => {
  const { loadingOverviewGroups } = Functions.useUiSlice();

  if (loadingOverviewGroups) {
    return <Globals.Shimmer borderRadius="four" height={200} />;
  } else {
    return (
      <Dashboard.OverviewGroupDropdown
        borderRadius="four"
        overviewGroupId={props.overviewGroupId}
        onDragEnd={props.onDragEnd}
        deleteAllPurchases={props.deleteAllPurchases}
        addPurchase={props.addPurchase}
        initiallyOpen
      />
    );
  }
};
