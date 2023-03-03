import styled from "styled-components";

import * as Sizes from "@/utils/sizes";
import { ThemeProps } from "../layout";

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

const Copy = styled.article`
  color: ${(props: ThemeProps) => props.theme.text};
  transition: 0.1s ease-in;
`;

const CopyAndFigure = styled.article`
  display: flex;
  align-items: center;
  gap: 3.75rem;
  width: 100%;
  max-width: ${Sizes.widths.content}px;
`;

const CopyHeader = styled.h2`
  margin: 0 0 ${Sizes.pxAsRem.twelve};
  font-size: ${Sizes.pxAsRem.twenty};
  font-weight: ${Sizes.fontWeights.bold};
`;

const CopyBody = styled.p`
  margin: 0;
  font-size: ${Sizes.pxAsRem.fourteen};
  font-weight: ${Sizes.fontWeights.medium};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const About = () => {
  return (
    <Container>
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

      <CopyAndFigure>
        <Copy>
          <CopyHeader>Be In Control</CopyHeader>
          <CopyBody>
            Learn and grow by reviewing your monthly purchases, organized by
            category; reflect on your bad purchasing patterns; and be in better
            control of your finances. Determine whether you’re in control of
            your cash or if it’s in control of you.
          </CopyBody>
        </Copy>
      </CopyAndFigure>
    </Container>
  );
};
