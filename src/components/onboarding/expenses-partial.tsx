import { useEffect } from "react";
import { Signal, useSignal } from "@preact/signals-react";

import * as Global from "@/components";
import * as Overview from "@/components/overview";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  title: string;
  total: Signal<number>;
  expenses: Signal<Types.BarePurchase[]>;
  disableSubmit: Signal<boolean>;
};

export const ExpensesPartial = (props: Props) => {
  console.log(props.title, "Page Loaded");

  const selectedPurchaseCells = useSignal<number[]>([]);

  useEffect(() => {
    if (!props.disableSubmit.value) {
      props.total.value = 0;
      props.expenses.value.forEach((expense: Types.BarePurchase) => {
        props.total.value += Number(expense.cost);
      });
    } else {
      props.total.value = 0;
    }
  }, [props.disableSubmit, props.expenses.value]);

  function addSelectedPurchaseCell(expenseIndex: number): void {
    if (!selectedPurchaseCells.value.includes(expenseIndex)) {
      selectedPurchaseCells.value.push(expenseIndex);
    }
  }

  function removeSelectedPurchaseCell(expenseIndex: number): void {
    if (selectedPurchaseCells.value.includes(expenseIndex)) {
      const indexPosition = selectedPurchaseCells.value.indexOf(expenseIndex);
      selectedPurchaseCells.value.splice(indexPosition, 1);
    }
  }

  function addExpense(): void {
    const updatedExpenses = Functions.deepCopy(props.expenses.value);
    updatedExpenses.push({ description: "", cost: "" });
    props.expenses.value = updatedExpenses;
  }

  function deleteExpense(purchaseIndex: number): void {
    const updatedExpenses = Functions.deepCopy(props.expenses.value);
    updatedExpenses.splice(purchaseIndex, 1);
    props.expenses.value = updatedExpenses;
  }

  function deleteSelectedExpenses(): void {
    const updatedExpenses = Functions.deepCopy(props.expenses.value).filter(
      (_: Types.BarePurchase, index: number) => {
        return !selectedPurchaseCells.value.includes(index);
      }
    );
    props.expenses.value = updatedExpenses;
    selectedPurchaseCells.value = [];
  }

  function deleteAllExpenses(): void {
    props.expenses.value = [];
    selectedPurchaseCells.value = [];
  }

  return (
    <Overview.Dropdown
      title={`${props.title} (${props.expenses.value.length})`}
      total={Functions.roundNumber(props.total.value, 2)}
      purchaseCellsSelected={selectedPurchaseCells.value.length > 0}
      deleteSelectedAction={deleteSelectedExpenses}
      deleteAllAction={deleteAllExpenses}
      addAction={addExpense}
    >
      {props.expenses.value.map(
        (expense: Types.BarePurchase, index: number) => {
          return (
            <Global.PurchaseCell
              key={`onboarding-recurring-expenses-${expense}-${index}`}
              borderRadius="four"
              index={index}
              expenses={props.expenses}
              disableSubmit={props.disableSubmit}
              description={expense.description}
              cost={expense.cost}
              onCheckActive={() => addSelectedPurchaseCell(index)}
              onCheckInactive={() => removeSelectedPurchaseCell(index)}
              onCloseClick={() => deleteExpense(index)}
              hideCategories
              hideCheck
            />
          );
        }
      )}
    </Overview.Dropdown>
  );
};
