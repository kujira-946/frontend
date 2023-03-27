import styled from "styled-components";
import { Signal } from "@preact/signals-react";

import * as Global from "@/components";
import * as Overview from "@/components/overview";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section``;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  recurringExpenses: Signal<Types.Purchase[]>;
};

export const RecurringExpenses = (props: Props) => {
  function deletePurchase(purchaseIndex: number): void {
    const recurringExpensesCopy = Functions.deepCopy(
      props.recurringExpenses.value
    );
    recurringExpensesCopy.splice(purchaseIndex, 1);
    props.recurringExpenses.value = recurringExpensesCopy;
  }

  function addRecurringExpense(): void {
    props.recurringExpenses.value = [
      ...props.recurringExpenses.value,
      { description: "", cost: "" },
    ];
  }

  return (
    <Container>
      <Overview.Dropdown
        title="Recurring"
        total={5400}
        addAction={addRecurringExpense}
      >
        {props.recurringExpenses.value.map(
          (purchase: Types.Purchase, index: number) => {
            return (
              <Global.PurchaseCell
                key={`onboarding-recurring-expenses-${purchase}-${index}`}
                onDescriptionChange={(description: string) =>
                  (purchase.description = description)
                }
                onCostChange={(cost: string) => (purchase.cost = cost)}
                onCloseClick={() => deletePurchase(index)}
                hideCategories
              />
            );
          }
        )}
      </Overview.Dropdown>
    </Container>
  );
};
