import styled, { css } from "styled-components";

import * as Globals from "@/components";
import * as Constants from "@/utils/constants";
import * as Styles from "@/utils/styles";

import { BodyCopy } from "./body-copy";
import { BodyOverview } from "./body-overview";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type SharedProps = {
  breakpoint: number;
  isPurchases?: true;
};

const DemoSection = styled.article<SharedProps>`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.forty};
  width: 100%;
  max-width: ${Styles.widths.desktop}px;
  margin: 0 auto;

  ${(props) => {
    if (!props.isPurchases) return Styles.setMediaPaddings();
  }};

  ${(props) => css`
    @media (max-width: ${props.breakpoint}px) {
      flex-direction: column;
      gap: ${Styles.pxAsRem.twelve};
    }
  `}
`;

const CopyAndOverview = styled.div<SharedProps>`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.forty};
  max-width: ${Styles.pxAsRem.fourHundredForty};
  width: 100%;

  ${(props) => css`
    @media (max-width: ${props.breakpoint}px) {
      max-width: 100%;
    }
  `}

  ${(props) => {
    if (props.isPurchases) return Styles.setMediaPaddings();
  }};
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
} & SharedProps;

export const BodyDemo = (props: Props) => {
  return (
    <Globals.LazyLoad
      threshold={Constants.landingMotion.threshold}
      initial={Constants.landingMotion.initial}
      animate={Constants.landingMotion.animate}
      transition={Constants.landingMotion.transition}
    >
      <DemoSection
        breakpoint={props.breakpoint}
        isPurchases={props.isPurchases}
      >
        <CopyAndOverview
          breakpoint={props.breakpoint}
          isPurchases={props.isPurchases}
        >
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
