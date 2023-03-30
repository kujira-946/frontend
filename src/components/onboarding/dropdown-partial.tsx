import { memo, useCallback, useEffect } from "react";
import { Signal } from "@preact/signals-react";

import * as Global from "@/components";
import * as Overview from "@/components/overview";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  title: "Recurring" | "Incoming";
  totalCost: Signal<number>;
  purchases: Signal<Types.OnboardingPurchase[]>;
  disableSubmit: Signal<boolean>;
};

const ExportedComponent = (props: Props) => {
  function deleteAllPurchases(): void {
    props.purchases.value = [];
  }

  function addPurchase(): void {
    const updatedPurchases = Functions.deepCopy(props.purchases.value);
    updatedPurchases.push({ description: "", cost: "" });
    props.purchases.value = updatedPurchases;
  }

  const updatePurchase = useCallback(
    (purchaseIndex: number, description: string, cost: string): void => {
      const updatedPurchases = Functions.deepCopy(props.purchases.value);
      updatedPurchases[purchaseIndex] = {
        description: description,
        cost: cost,
      } as Types.OnboardingPurchase;
      props.purchases.value = updatedPurchases;
    },
    []
  );

  const deletePurchase = useCallback((purchaseIndex: number): void => {
    const updatedPurchases = Functions.deepCopy(props.purchases.value);
    updatedPurchases.splice(purchaseIndex, 1);
    props.purchases.value = updatedPurchases;
  }, []);

  useEffect(() => {
    if (!props.disableSubmit.value) {
      props.totalCost.value = 0;
      props.purchases.value.forEach((purchase: Types.OnboardingPurchase) => {
        props.totalCost.value += Number(purchase.cost);
      });
    } else {
      props.totalCost.value = 0;
    }
  }, [props.disableSubmit, props.purchases.value]);

  return (
    <Overview.Dropdown
      title={props.title}
      totalCost={Functions.roundNumber(props.totalCost.value, 2)}
      purchases={props.purchases}
      deleteAllPurchases={deleteAllPurchases}
      addPurchase={addPurchase}
    >
      {props.purchases.value.map(
        (purchase: Types.OnboardingPurchase, index: number) => {
          return (
            <Global.PurchaseCell
              key={`onboarding-${props.title}-purchases-${index}`}
              borderRadius="four"
              selectionValue={index}
              disableSubmit={props.disableSubmit}
              description={purchase.description}
              cost={purchase.cost}
              updatePurchase={updatePurchase}
              deleteAction={deletePurchase}
              hideCheck
              hideCategories
            />
          );
        }
      )}
    </Overview.Dropdown>
  );
};

export const DropdownPartial = memo(ExportedComponent);
