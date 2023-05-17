import styled from "styled-components";

import * as Styles from "@/utils/styles";
import { formattedNumber } from "@/utils/functions";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.twelve} ${Styles.pxAsRem.ten};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border-radius: ${Styles.pxAsRem.six};
`;

const Text = styled.span`
  flex: 1;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.medium};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  description: string;
  cost: number | null;
};

export const ReviewCell = (props: Props) => {
  return (
    <Container>
      <Text>{props.description}</Text>
      <Text>{props.cost ? `$${formattedNumber(props.cost)}` : ""}</Text>
    </Container>
  );
};
