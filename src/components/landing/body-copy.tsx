import styled from "styled-components";

import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twelve};
`;

const Header = styled.h2`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.twenty};
  font-weight: ${Styles.fontWeights.bold};
`;

const Body = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.backgroundTen};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.regular};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  header: string;
  body: string;
};

export const BodyCopy = (props: Props) => {
  return (
    <Container>
      <Header>{props.header}</Header>
      <Body>{props.body}</Body>
    </Container>
  );
};
