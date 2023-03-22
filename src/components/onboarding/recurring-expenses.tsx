import styled from "styled-components";
import { useContext } from "react";

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
  recurringExpenses: Types.Purchase[];
  addRecurringExpense: () => void;
};

export const RecurringExpenses = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);

  return (
    <Container>
      <PurchaseCells>
        {props.recurringExpenses.map(
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
        onClick={props.addRecurringExpense}
        size="medium"
        borderRadius="four"
        color={Styles.background[ui.theme.value].three}
        hoverColor={Styles.background[ui.theme.value].five}
        style={{
          marginTop: Styles.pxAsRem.sixteen,
        }}
      >
        Add Purchase
      </Global.Button>
    </Container>
  );
};
