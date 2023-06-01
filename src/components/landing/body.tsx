import styled from "styled-components";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Constants from "@/utils/constants";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

import { BodyCopy } from "./body-copy";
import { BodyOverview } from "./body-overview";

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

const DemoSection = styled.article`
  display: flex;
  align-items: center;
  gap: 3.75rem;
  width: 100%;
  max-width: ${Styles.widths.desktop}px;
  margin: 0 auto;
`;

const CopyAndOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.forty};
  max-width: ${Styles.pxAsRem.fourHundred};
  width: 100%;
`;

const Overview = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
`;

const Figure = styled.div`
  flex: 1;

  border: blue solid 1px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const Body = () => {
  const totalSpent = useSignal(1638.13);
  const remainingBudget = useSignal(1533.26);

  return (
    <Container id="landing-about">
      <Globals.LazyLoad
        threshold={Constants.landingMotion.threshold}
        initial={Constants.landingMotion.initial}
        animate={Constants.landingMotion.animate}
        transition={Constants.landingMotion.transition}
      >
        <DemoSection>
          <CopyAndOverview>
            <BodyCopy
              header="Real-time tracking."
              body="Tracking your monthly budget in real time is as simple as entering a few numbers."
            />
            <Overview>
              <BodyOverview title="Total Spent" value={totalSpent.value} />
              <BodyOverview
                title="Remaining Budget"
                value={remainingBudget.value}
              />
            </Overview>
          </CopyAndOverview>
          <Figure>Figure</Figure>
        </DemoSection>
      </Globals.LazyLoad>

      <Globals.LazyLoad
        threshold={Constants.landingMotion.threshold}
        initial={Constants.landingMotion.initial}
        animate={Constants.landingMotion.animate}
        transition={Constants.landingMotion.transition}
      >
        <DemoSection>
          <CopyAndOverview>
            <BodyCopy
              header="One-man army."
              body="Keep a log of your monthly recurring purchases, potential incoming purchases, and daily purchases. Your wallet only needs one border control officer, and that’s you."
            />
            <Overview>
              <BodyOverview title="Total Spent" value={totalSpent.value} />
              <BodyOverview
                title="Remaining Budget"
                value={remainingBudget.value}
              />
            </Overview>
          </CopyAndOverview>
          <Figure>Figure</Figure>
        </DemoSection>
      </Globals.LazyLoad>

      <Globals.LazyLoad
        threshold={Constants.landingMotion.threshold}
        initial={Constants.landingMotion.initial}
        animate={Constants.landingMotion.animate}
        transition={Constants.landingMotion.transition}
      >
        <DemoSection>
          <CopyAndOverview>
            <BodyCopy
              header="Review and improve."
              body="Review your monthly purchases, identify what kinds of purchases you tend to make, discover your spending habits as a result, and improve the way you spend."
            />
            <Overview>
              <BodyOverview title="Total Spent" value={totalSpent.value} />
              <BodyOverview
                title="Remaining Budget"
                value={remainingBudget.value}
              />
            </Overview>
          </CopyAndOverview>
          <Figure>Figure</Figure>
        </DemoSection>
      </Globals.LazyLoad>
    </Container>
  );
};
