import styled from "styled-components";

import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article`
  color: ${(props: ThemeProps) => props.theme.text};
`;

const Header = styled.h2`
  margin: 0 0 ${Styles.pxAsRem.twelve};
  font-size: ${Styles.pxAsRem.twenty};
  font-weight: ${Styles.fontWeights.bold};
`;

const Body = styled.p`
  margin: 0;
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.medium};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  header: string;
  body: string;
};

export const AboutCopy = (props: Props) => {
  return (
    <Container>
      <Header>{props.header}</Header>
      <Body>{props.body}</Body>
    </Container>
  );
};
