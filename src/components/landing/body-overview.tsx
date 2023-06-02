import styled, { css } from "styled-components";

import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
  border-radius: ${Styles.pxAsRem.eight};

  ${(props: ThemeProps) => props.theme.shadowOne};

  @media (max-width: ${Styles.breakpoints.landingBodyOverview}px) {
    flex-direction: column;
  }
`;

const textStyles = css`
  flex: 1;
  font-size: ${Styles.pxAsRem.sixteen};
`;

const Title = styled.span`
  ${textStyles};
  color: ${(props: ThemeProps) => props.theme.text};
  font-weight: ${Styles.fontWeights.regular};
`;

type ValueProps = { title: "Total Spent" | "Remaining Budget" };

const Value = styled.span<ValueProps>`
  ${textStyles};
  color: ${(props: ValueProps & ThemeProps) => {
    return props.title === "Total Spent"
      ? props.theme.text
      : props.theme.primaryMain;
  }};
  font-weight: ${Styles.fontWeights.bold};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  value: string;
} & ValueProps;

export const BodyOverview = (props: Props) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Value title={props.title}>{props.value}</Value>
    </Container>
  );
};
