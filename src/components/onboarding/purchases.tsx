import * as Drag from "react-beautiful-dnd";

import * as Globals from "@/components";
import * as Dashboard from "@/components/dashboard";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";

type Props = {
  type: "Recurring" | "Incoming";
  overviewGroups: Types.OverviewGroup[] | undefined;
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
  } else if (props.overviewGroups && props.overviewGroups.length > 0) {
    const isRecurring = props.type === "Recurring";

    let overviewGroup: Types.OverviewGroup;
    if (isRecurring) overviewGroup = Object.values(props.overviewGroups)[0];
    else overviewGroup = Object.values(props.overviewGroups)[1];

    const purchaseCount =
      isRecurring && overviewGroup.purchaseIds
        ? overviewGroup.purchaseIds.length
        : 0;

    return (
      <Dashboard.OverviewDropdown
        borderRadius="four"
        initiallyOpen={true}
        title={overviewGroup.name}
        totalCost={overviewGroup.totalCost}
        purchaseCount={purchaseCount}
        overviewGroupId={overviewGroup.id}
        onDragEnd={props.onDragEnd}
        deleteAllPurchases={() => props.deleteAllPurchases(overviewGroup.id)}
        addPurchase={() => props.addPurchase(overviewGroup.id)}
      />
    );
  } else {
    return null;
  }
};
