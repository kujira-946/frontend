import Link from "next/link";
import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
	align-items: center;
  gap: 40px;
  padding: 80px 20px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
`;

const Copy = styled.article`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  max-width: 600px;
  color: ${(props: ThemeProps) => props.theme.text};
  transition: 0.1s ease-in;
`;

const CopyHeader = styled.h2`
  margin: 0 0;
  font-size: ${Sizes.pxAsRem.twentyFour};
  font-weight: ${Sizes.fontWeights.bold};
  text-align: center;
`;

const CopyBody = styled.h2`
  margin: 0 0;
  font-size: ${Sizes.pxAsRem.sixteen};
  font-weight: ${Sizes.fontWeights.medium};
  text-align: center;
`;

const RegisterButton = styled(Link)`
  ${(props: ThemeProps) =>
    Styles.setButton(
      "medium",
      props.theme.primaryMain,
      props.theme.primaryDark
    )};
  width: 100%;
  max-width: 600px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const CTA = () => {
  return (
    <Container>
      <Copy>
        <CopyHeader>Interested?</CopyHeader>
        <CopyBody>
          Register with Kujira to keep track of your monthly purchases and gain
          control of your financial health.
        </CopyBody>
      </Copy>
      <RegisterButton href="/register">Register</RegisterButton>
    </Container>
  );
};
