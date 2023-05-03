import * as Drag from "react-beautiful-dnd";

import * as Globals from "@/components";
import * as Dropdowns from "@/components/dropdowns";
import * as Functions from "@/utils/functions";

type Props = {
  type: "Recurring" | "Incoming";
  overviewGroupId: number;
  onDragEnd: (
    result: Drag.DropResult,
    provided: Drag.ResponderProvided
  ) => void;
  deleteAllPurchases: (purchaseIds: number[], overviewGroupId: number) => void;
  addPurchase: (overviewGroupId: number) => void;
};

export const Purchases = (props: Props) => {
  const { loadingOverviewGroups } = Functions.useUiSlice();
  const overviewGroup = Functions.useGetOverviewGroup(props.overviewGroupId);
  const purchases = Functions.useGetOverviewGroupPurchases(
    props.overviewGroupId
  );

  if (loadingOverviewGroups) {
    return <Globals.Shimmer borderRadius="four" height={200} />;
  } else if (overviewGroup) {
    return (
      <Dropdowns.PurchaseDropdown
        type="overview"
        title={`${props.type} ${
          purchases && purchases.length ? `(${purchases.length})` : ""
        }`}
        associationId={overviewGroup.id}
        associationTotalSpent={overviewGroup.totalSpent}
        purchases={purchases}
        purchaseIds={overviewGroup.purchaseIds || []}
        deleteAllPurchases={props.deleteAllPurchases}
        addPurchase={props.addPurchase}
        startOpened
      />
    );
  } else {
    return null;
  }
};
