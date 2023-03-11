import styled from "styled-components";
import { useContext } from "react";

import * as Global from "@/components";
import * as Logbook from "@/components/logbook";
import * as Colors from "@/utils/colors";
import * as Sizes from "@/utils/sizes";
import * as Types from "@/utils/types";
import { SignalsStoreContext } from "@/pages/_app";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section``;

const PurchaseCells = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Sizes.pxAsRem.eight};
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
        color={Colors.background[ui.theme.value].three}
        hoverColor={Colors.background[ui.theme.value].five}
        style={{
          marginTop: Sizes.pxAsRem.sixteen,
        }}
      >
        Add Purchase
      </Global.Button>
    </Container>
  );
};
