import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "@/components/layout";

import { LegalNavbar } from "./legal-navbar";
import { LegalBody } from "./legal-body";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twenty};
`;

const Title = styled.header`
  width: 100%;
  max-width: ${Styles.widths.desktop}px;
  margin: 0 auto;

  ${Styles.setMediaPaddings()};
`;

const Text = styled.h1`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.twentyFour};
  font-weight: ${Styles.fontWeights.bold};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  document: Types.LegalDocument;
  lastUpdated: string;
};

export const LegalDocument = (props: Props) => {
  return (
    <Container>
      <LegalNavbar />

      <Title>
        <Text>{props.document.title}</Text>
        <Text>Last Updated: {props.lastUpdated}</Text>
      </Title>

      <LegalBody documentBody={props.document.body} />
    </Container>
  );
};
