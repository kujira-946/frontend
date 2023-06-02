import styled from "styled-components";

import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  ${Styles.preventUserInteraction};
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
`;

const Figure = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
  padding: ${Styles.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
  border: ${(props: ThemeProps) => props.theme.backgroundSix} solid 1px;
  border-radius: ${Styles.pxAsRem.eight};
`;

const FigureTitle = styled.span`
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const FigureText = styled.span`
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.regular};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type FigureValue = {
  title: string;
  text: string;
};

const figureValues: FigureValue[] = [
  { title: "Income ($)", text: "$3,823.87" },
  { title: "Savings (%) : $382.39", text: "10" },
];

export const BodyDemoIncomeSavings = () => {
  return (
    <Container>
      {figureValues.map((figureValue: FigureValue, index: number) => {
        return (
          <Figure
            key={`landing-body-demo-income-savings-${figureValue.title}-${figureValue.text}-${index}`}
          >
            <FigureTitle>{figureValue.title}</FigureTitle>
            <FigureText>{figureValue.text}</FigureText>
          </Figure>
        );
      })}
    </Container>
  );
};
