import styled from "styled-components";
import { useContext } from "react";
import { Signal } from "@preact/signals-react";

import * as Global from "@/components";
import * as Logbook from "@/components/logbook";
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
              <Logbook.PurchaseCell
                key={`onboarding-recurring-expenses-${purchase}-${index}`}
              />
            );
          }
        )}
      </PurchaseCells>

      <Global.Button
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
