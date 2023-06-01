import styled from "styled-components";

import * as Globals from "@/components";
import * as Constants from "@/utils/constants";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

import { AboutCopy } from "./about-copy";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 140px;
  padding: 140px 20px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
`;

const CopyAndFigure = styled.article`
  display: flex;
  align-items: center;
  gap: 3.75rem;
  width: 100%;
  max-width: ${Styles.widths.content}px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const Body = () => {
  return (
    <Container id="landing-about">
      <Globals.LazyLoad
        threshold={Constants.landingMotion.threshold}
        initial={Constants.landingMotion.initial}
        animate={Constants.landingMotion.animate}
        transition={Constants.landingMotion.transition}
      >
        <CopyAndFigure>
          <AboutCopy
            header="Everything In One Place"
            body="Easily track important information, such as your income, savings,
              recurring costs, and remaining cash, all within your personal
              monthly overview."
          />
        </CopyAndFigure>
        {/* <Globals.NoInteraction></Globals.NoInteraction> */}
      </Globals.LazyLoad>

      <Globals.LazyLoad
        threshold={Constants.landingMotion.threshold}
        initial={Constants.landingMotion.initial}
        animate={Constants.landingMotion.animate}
        transition={Constants.landingMotion.transition}
      >
        <CopyAndFigure>
          <AboutCopy
            header="Real-Time Tracking"
            body="Your personal monthly overview will update in real time as you log
              your daily purchases, allowing you to have the most up-to-date
              information on your financial health."
          />
        </CopyAndFigure>
      </Globals.LazyLoad>

      <Globals.LazyLoad
        threshold={Constants.landingMotion.threshold}
        initial={Constants.landingMotion.initial}
        animate={Constants.landingMotion.animate}
        transition={Constants.landingMotion.transition}
      >
        <CopyAndFigure>
          <AboutCopy
            header="Be In Control"
            body="Learn and grow by reviewing your monthly purchases, organized by
              category; reflect on your bad purchasing patterns; and be in
              better control of your finances. Determine whether you’re in
              control of your cash or if it’s in control of you."
          />
        </CopyAndFigure>
      </Globals.LazyLoad>
    </Container>
  );
};
