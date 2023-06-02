import styled from "styled-components";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Constants from "@/utils/constants";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

import { BodyDemo } from "./body-demo";
import { BodyDemoIncomeSavings } from "./body-demo-income-savings";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twoHundred};
  padding: ${Styles.pxAsRem.twoHundred} ${Styles.pxAsRem.twenty};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};

  ${Styles.setMediaPaddings("twoHundred", "twoHundred", "forty")};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const Body = () => {
  const totalSpent = useSignal("");
  const remainingBudget = useSignal("");

  return (
    <Container id="landing-about">
      <BodyDemo
        header="Real-time tracking."
        body="Tracking your monthly budget in real time is as simple as entering a few numbers."
        totalSpent={totalSpent.value}
        remainingBudget={remainingBudget.value}
      >
        <BodyDemoIncomeSavings
          totalSpent={totalSpent}
          remainingBudget={remainingBudget}
        />
      </BodyDemo>

      <BodyDemo
        header="One-man army."
        body="Keep a log of your monthly recurring purchases, potential incoming purchases, and daily purchases. Your wallet only needs one border control officer, and that’s you."
        totalSpent={totalSpent.value}
        remainingBudget={remainingBudget.value}
      >
        Figure
      </BodyDemo>

      <BodyDemo
        header="Review and improve."
        body="Review your monthly purchases, identify what kinds of purchases you tend to make, discover your spending habits as a result, and improve the way you spend."
        totalSpent={totalSpent.value}
        remainingBudget={remainingBudget.value}
      >
        Figure
      </BodyDemo>
    </Container>
  );
};
