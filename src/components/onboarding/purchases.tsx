import * as Drag from "react-beautiful-dnd";

import * as Globals from "@/components";
import * as Dashboard from "@/components/dashboard";
import * as Dropdowns from "@/components/dropdowns";
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
  const overviewGroup = Functions.useGetOverviewGroup(props.overviewGroupId);
  const purchases = Functions.useGetOverviewGroupPurchases(
    props.overviewGroupId
  );

  if (loadingOverviewGroups) {
    return <Globals.Shimmer borderRadius="four" height={200} />;
  } else {
    return (
      <Dropdowns.PurchaseDropdown
        type="overview"
        title={`${props.type} ${purchases?.length || ""}`}
        totalSpent={overviewGroup?.totalSpent || 0}
        associationId={props.overviewGroupId}
        deleteSelectedPurchases={() => console.log("delete selected purchases")}
        deleteAllPurchases={props.deleteAllPurchases}
        addPurchase={props.addPurchase}
        startOpened
      >
        {/* <div>Purchase</div> */}
        <Globals.PurchaseCellNew
          description="Foo"
          setDescription={() => console.log("Set Description")}
          cost="Bar"
          setCost={() => console.log("Set Cost")}
          deletePurchase={() => console.log("Delete Purchase")}
          showDrag
          showCheck
          showCategories
          showDelete
        />
      </Dropdowns.PurchaseDropdown>

      // <Dashboard.OverviewGroupDropdown
      //   borderRadius="four"
      //   overviewGroupId={props.overviewGroupId}
      //   onDragEnd={props.onDragEnd}
      //   deleteAllPurchases={props.deleteAllPurchases}
      //   addPurchase={props.addPurchase}
      //   initiallyOpen
      // />
    );
  }
};
