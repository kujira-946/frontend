import Link from "next/link";
import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import * as Constants from "@/utils/constants.landing";
import { ThemeProps } from "@/components/layout";
import { LazyLoad } from "@/components";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  padding: 80px 20px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
`;

const Copy = styled.article`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto ${Sizes.pxAsRem.forty};
  color: ${(props: ThemeProps) => props.theme.text};
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
  margin: 0 auto;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const CTA = () => {
  return (
    <Container>
      <LazyLoad
        threshold={0.8}
        initial={Constants.initial}
        animate={Constants.animate}
        transition={Constants.transition}
      >
        <Copy>
          <CopyHeader>Interested?</CopyHeader>
          <CopyBody>
            Register with Kujira to keep track of your monthly purchases and
            gain control of your financial health.
          </CopyBody>
        </Copy>
        <RegisterButton href="/register">Register</RegisterButton>
      </LazyLoad>
    </Container>
  );
};
