import styled from "styled-components";

import * as Sizes from "@/utils/styles.sizes";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article`
  color: ${(props: ThemeProps) => props.theme.text};
`;

const Header = styled.h2`
  margin: 0 0 ${Sizes.pxAsRem.twelve};
  font-size: ${Sizes.pxAsRem.twenty};
  font-weight: ${Sizes.fontWeights.bold};
`;

const Body = styled.p`
  margin: 0;
  font-size: ${Sizes.pxAsRem.fourteen};
  font-weight: ${Sizes.fontWeights.medium};
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
