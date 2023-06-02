import styled from "styled-components";

import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

import { BodyDemo } from "./body-demo";
import { BodyDemoIncomeSavings } from "./body-demo-income-savings";
import { BodyDemoPurchases } from "./body-demo-purchases";
import { BodyDemoReviews } from "./body-demo-reviews";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twoHundred};
  padding: ${Styles.pxAsRem.twoHundred} 0rem;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};

  @media (max-width: ${Styles.widths.tablet}px) {
    padding: ${Styles.pxAsRem.hundred} 0rem;
    gap: ${Styles.pxAsRem.hundred};
  }

  @media (max-width: ${Styles.widths.mobile}px) {
    padding: ${Styles.pxAsRem.forty} 0rem;
    gap: ${Styles.pxAsRem.forty};
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const Body = () => {
  return (
    <Container id="landing-about">
      <BodyDemo
        header="Real-time tracking."
        body="Tracking your monthly budget in real time is as simple as entering a few numbers."
        totalSpent={"$0.00"}
        remainingBudget={"$3,441.48"}
        breakpoint={Styles.breakpoints.landingBodyIncomeSavings}
      >
        <BodyDemoIncomeSavings />
      </BodyDemo>

      <BodyDemo
        header="One-man army."
        body="Keep a log of your monthly recurring purchases, potential incoming purchases, and daily purchases. Your wallet only needs one border control officer, and that’s you."
        totalSpent={"$205.26"}
        remainingBudget={"$1,076.22"}
        breakpoint={Styles.breakpoints.landingBodyPurchases}
        isPurchases
      >
        <BodyDemoPurchases />
      </BodyDemo>

      <BodyDemo
        header="Review and improve."
        body="Review your monthly purchases, identify what kinds of purchases you tend to make, discover your spending habits as a result, and improve the way you spend."
        totalSpent={"$205.26"}
        remainingBudget={"$1,076.22"}
        breakpoint={Styles.breakpoints.landingBodyReviews}
      >
        <BodyDemoReviews />
      </BodyDemo>
    </Container>
  );
};
