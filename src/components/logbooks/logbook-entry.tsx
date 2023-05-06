import * as Functions from "@/utils/functions";
import { PurchaseDropdown } from "@/components/dropdowns";

type Props = {
  logbookEntryId: number;
  logbookEntryTotalSpent: number;
  logbookEntryPurchaseIds: number[];
  deleteAllPurchases: (purchaseIds: number[], logbookEntryId: number) => void;
  addPurchase: (logbookEntryId: number) => void;
};

export const LogbookEntry = (props: Props) => {
  const purchases = Functions.useGetLogbookEntryPurchases(props.logbookEntryId);

  return (
    <PurchaseDropdown
      type="logbook"
      associationId={props.logbookEntryId}
      associationTotalSpent={props.logbookEntryTotalSpent}
      purchases={purchases}
      purchaseIds={props.logbookEntryPurchaseIds}
      deleteAllPurchases={props.deleteAllPurchases}
      addPurchase={props.addPurchase}
    />
  );
};
