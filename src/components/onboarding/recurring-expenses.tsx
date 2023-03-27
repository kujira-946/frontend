import styled from "styled-components";
import { useContext } from "react";
import { Signal } from "@preact/signals-react";

import * as Global from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { SignalsStoreContext } from "@/pages/_app";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section``;

const PurchaseCells = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  recurringExpenses: Signal<Types.Purchase[]>;
};

export const RecurringExpenses = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);

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
      <PurchaseCells>
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
      </PurchaseCells>

      <Global.Button
        type="button"
        onClick={addRecurringExpense}
        size="medium"
        borderRadius="four"
        background={Styles.background[ui.theme.value].three}
        hoverBackground={Styles.background[ui.theme.value].five}
        style={{
          marginTop: Styles.pxAsRem.sixteen,
        }}
      >
        Add
      </Global.Button>
    </Container>
  );
};
