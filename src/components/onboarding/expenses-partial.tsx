import { memo, useCallback, useEffect, useMemo } from "react";
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

const ExportedComponent = (props: Props) => {
  console.log(props.title, "Page Loaded");

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

  function deleteAllExpenses(): void {
    props.expenses.value = [];
  }

  function addExpense(): void {
    const updatedExpenses = Functions.deepCopy(props.expenses.value);
    updatedExpenses.push({ description: "", cost: "" });
    props.expenses.value = updatedExpenses;
  }

  const deleteExpense = useCallback((purchaseIndex: number) => {
    const updatedExpenses = Functions.deepCopy(props.expenses.value);
    updatedExpenses.splice(purchaseIndex, 1);
    props.expenses.value = updatedExpenses;
  }, []);

  return (
    <Overview.Dropdown
      title={`${props.title} (${props.expenses.value.length})`}
      total={Functions.roundNumber(props.total.value, 2)}
      deleteAllAction={deleteAllExpenses}
      addAction={addExpense}
    >
      {props.expenses.value.map(
        (expense: Types.BarePurchase, index: number) => {
          return (
            <Global.PurchaseCell
              key={`onboarding-recurring-expenses-${expense.description}-${index}`}
              borderRadius="four"
              index={index}
              expenses={props.expenses}
              disableSubmit={props.disableSubmit}
              description={expense.description}
              cost={expense.cost}
              deleteAction={deleteExpense}
              hideCategories
              hideCheck
            />
          );
        }
      )}
    </Overview.Dropdown>
  );
};

export const ExpensesPartial = memo(ExportedComponent);

// TODO : YOU WERE WORKING ON OPTIMIZING THE RE-RENDERING OF THE DROPDOWN AND PURCHASE CELL COMPONENTS.
// TODO : THE LAST THING YOU DID WAS STORE THE PURCHASE CELLS INSIDE OF A MEMOIZED USEMEMO CONSTANT.
// TODO : IT DIDN'T WORK.
//
// TODO : CHANCES ARE, THE REASON AS TO WHY USECALLBACK IS NOT WORKING FOR DELETEEXPENSE() IS BECAUSE
// TODO : WE'RE NOT PASSING THAT FUNCTION ITSELF DIRECTLY INTO THE ONCLOSECLICK CALLBACK. WE'RE PASSING IN A DIFFERENT FUNCTION THAT RETURNS THAT FUNCTION, SO WE'RE GOING TO HAVE TO MEMOIZE THAT FUNCTION SOMEHOW. OR JUST THAT LOGIC.
