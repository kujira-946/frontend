import * as Dropdowns from "@/components/dropdowns";
import * as Functions from "@/utils/functions";

type Props = {
  overviewGroupId: number;
  overviewGroupName: string;
  overviewGroupTotalSpent: number;
  overviewGroupPurchaseIds: number[];
  deleteAllPurchases: (purchaseIds: number[], overviewGroupId: number) => void;
  addPurchase: (overviewGroupId: number) => void;
  startOpened: boolean;
};

export const LogbooksOverviewGroup = (props: Props) => {
  const purchases = Functions.useGetOverviewGroupPurchases(
    props.overviewGroupId
  );

  return (
    <Dropdowns.PurchaseDropdown
      type="overview"
      title={`${props.overviewGroupName} ${
        purchases && purchases.length ? `(${purchases.length})` : ""
      }`}
      associationId={props.overviewGroupId}
      associationTotalSpent={props.overviewGroupTotalSpent}
      purchases={purchases}
      purchaseIds={props.overviewGroupPurchaseIds}
      deleteAllPurchases={props.deleteAllPurchases}
      addPurchase={props.addPurchase}
      startOpened={props.startOpened}
    />
  );
};
