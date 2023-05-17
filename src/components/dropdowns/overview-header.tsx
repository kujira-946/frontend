import styled from "styled-components";

import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.header`
  ${Styles.transition};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.twelve};
  color: ${(props: ThemeProps) => props.theme.text};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  font-size: ${Styles.pxAsRem.fourteen};

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
    }
  }
`;

const Title = styled.span`
  font-weight: ${Styles.fontWeights.semiBold};
`;

const TotalSpent = styled.span`
  font-weight: ${Styles.fontWeights.bold};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  title: string;
  totalSpent: number;
};

export const OverviewHeader = (props: Props) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <TotalSpent>${Functions.formattedNumber(props.totalSpent)}</TotalSpent>
    </Container>
  );
};
