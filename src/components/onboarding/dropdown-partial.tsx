import * as Drag from "react-beautiful-dnd";
import { memo, useCallback, useEffect } from "react";
import { Signal } from "@preact/signals-react";

import * as Global from "@/components";
import * as Dashboard from "@/components/dashboard";
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
  function onDragEnd(
    result: Drag.DropResult,
    provided: Drag.ResponderProvided
  ): void {
    const updatedPurchases = Functions.deepCopy(props.purchases.value);
    const draggedElement = updatedPurchases.splice(result.source.index, 1);
    if (result.destination) {
      updatedPurchases.splice(result.destination.index, 0, ...draggedElement);
      props.purchases.value = updatedPurchases;
    }
  }

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
    <Dashboard.OverviewDropdown
      initiallyOpen={true}
      title={props.title}
      totalCost={props.totalCost.value}
      purchaseCount={props.purchases.value.length}
      onDragEnd={onDragEnd}
      deleteAllPurchases={deleteAllPurchases}
      addPurchase={addPurchase}
    >
      {props.purchases.value.map(
        (purchase: Types.OnboardingPurchase, index: number) => {
          return (
            <Drag.Draggable
              key={`onboarding-${props.title}-purchases-${index}`}
              draggableId={index.toString()}
              index={index}
            >
              {(
                provided: Drag.DraggableProvided,
                snapshot: Drag.DraggableStateSnapshot
              ) => {
                return (
                  <Global.DraggablePortalItem
                    provided={provided}
                    snapshot={snapshot}
                    preventEntireElementDrag
                  >
                    <Global.PurchaseCell
                      borderRadius="four"
                      provided={provided}
                      selectionValue={index}
                      disableSubmit={props.disableSubmit}
                      description={purchase.description}
                      cost={purchase.cost}
                      updateAction={updatePurchase}
                      deleteAction={deletePurchase}
                      costForwardText="$"
                      persistInput
                      hideCheck
                      hideCategories
                    />
                  </Global.DraggablePortalItem>
                );
              }}
            </Drag.Draggable>
          );
        }
      )}
    </Dashboard.OverviewDropdown>
  );
};

export const DropdownPartial = memo(ExportedComponent);
