import styled from "styled-components";

import * as Globals from "@/components";
import * as Constants from "@/utils/constants";
import * as Styles from "@/utils/styles";

import { BodyCopy } from "./body-copy";
import { BodyOverview } from "./body-overview";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const DemoSection = styled.article`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.forty};
  width: 100%;
  max-width: ${Styles.widths.desktop}px;
  margin: 0 auto;

  @media (max-width: ${Styles.breakpoints.landingDemo}px) {
    flex-direction: column;
    gap: ${Styles.pxAsRem.twelve};
  }
`;

const CopyAndOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.forty};
  max-width: ${Styles.pxAsRem.fourHundred};
  width: 100%;

  @media (max-width: ${Styles.breakpoints.landingDemo}px) {
    max-width: 100%;
  }
`;

const Overview = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
`;

const Children = styled.section`
  flex: 1;
  width: 100%;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  header: string;
  body: string;
  totalSpent: string;
  remainingBudget: string;
  children: React.ReactNode;
};

export const BodyDemo = (props: Props) => {
  return (
    <Globals.LazyLoad
      threshold={Constants.landingMotion.threshold}
      initial={Constants.landingMotion.initial}
      animate={Constants.landingMotion.animate}
      transition={Constants.landingMotion.transition}
    >
      <DemoSection>
        <CopyAndOverview>
          <BodyCopy header={props.header} body={props.body} />
          <Overview>
            <BodyOverview title="Total Spent" value={props.totalSpent} />
            <BodyOverview
              title="Remaining Budget"
              value={props.remainingBudget}
            />
          </Overview>
        </CopyAndOverview>

        <Children>{props.children}</Children>
      </DemoSection>
    </Globals.LazyLoad>
  );
};
