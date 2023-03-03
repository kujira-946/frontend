import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import * as Constants from "@/utils/constants.landing";
import { LazyLoad } from "@/components";
import { ThemeProps } from "@/components/layout";

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
  max-width: ${Sizes.widths.content}px;
`;

const Copy = styled.article`
  color: ${(props: ThemeProps) => props.theme.text};
  transition: 0.1s ease-in;
`;

const CopyHeader = styled.h2`
  ${(props: ThemeProps) => {
    return Styles.setText("twenty", "bold", props.theme.text);
  }};
  margin: 0 0 ${Sizes.pxAsRem.twelve};
`;

const CopyBody = styled.p`
  ${(props: ThemeProps) => {
    return Styles.setText("fourteen", "medium", props.theme.text);
  }};
  margin: 0;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const About = () => {
  return (
    <Container>
      <LazyLoad
        threshold={Constants.threshold}
        initial={Constants.initial}
        animate={Constants.animate}
        transition={Constants.transition}
      >
        <CopyAndFigure>
          <Copy>
            <CopyHeader>Everything In One Place</CopyHeader>
            <CopyBody>
              Easily track important information, such as your income, savings,
              recurring costs, and remaining cash, all within your personal
              monthly overview.
            </CopyBody>
          </Copy>
        </CopyAndFigure>
      </LazyLoad>

      <LazyLoad
        threshold={Constants.threshold}
        initial={Constants.initial}
        animate={Constants.animate}
        transition={Constants.transition}
      >
        <CopyAndFigure>
          <Copy>
            <CopyHeader>Real-Time Tracking</CopyHeader>
            <CopyBody>
              Your personal monthly overview will update in real time as you log
              your daily purchases, allowing you to have the most up-to-date
              information on your financial health.
            </CopyBody>
          </Copy>
        </CopyAndFigure>
      </LazyLoad>

      <LazyLoad
        threshold={Constants.threshold}
        initial={Constants.initial}
        animate={Constants.animate}
        transition={Constants.transition}
      >
        <CopyAndFigure>
          <Copy>
            <CopyHeader>Be In Control</CopyHeader>
            <CopyBody>
              Learn and grow by reviewing your monthly purchases, organized by
              category; reflect on your bad purchasing patterns; and be in
              better control of your finances. Determine whether you’re in
              control of your cash or if it’s in control of you.
            </CopyBody>
          </Copy>
        </CopyAndFigure>
      </LazyLoad>
    </Container>
  );
};
