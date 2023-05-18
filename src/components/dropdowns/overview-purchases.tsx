import { AnimatePresence } from "framer-motion";

import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";

import { PurchaseCells } from "./purchase-cells";
import { PurchaseCellsUpdateLoader } from "./purchase-cells-update-loader";
import { PurchaseCell } from "./purchase-cell";

type Props = {
  purchases: Types.Purchase[];
  updatePurchase: (
    purchaseId: number,
    purchaseDescription: string,
    purchaseCost: number,
    description: string,
    cost: string
  ) => void;
  deletePurchase: (purchaseId: number, purchaseCost: number) => void;
};

export const OverviewPurchases = (props: Props) => {
  const { loadingPurchases } = Functions.useUiSlice();

  return (
    <PurchaseCells updatingPurchases={loadingPurchases}>
      <AnimatePresence>
        {loadingPurchases && <PurchaseCellsUpdateLoader />}
      </AnimatePresence>

      {props.purchases.map((purchase: Types.Purchase, index: number) => {
        return (
          <PurchaseCell
            key={`overview-group-dropdown-purchase-${purchase.id}-${index}`}
            purchaseId={purchase.id}
            category={purchase.category}
            description={purchase.description}
            cost={purchase.cost ? purchase.cost : 0}
            updatePurchase={props.updatePurchase}
            deletePurchase={props.deletePurchase}
            showDelete
          />
        );
      })}
    </PurchaseCells>
  );
};
