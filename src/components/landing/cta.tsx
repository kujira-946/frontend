import Link from "next/link";
import styled from "styled-components";
import { useContext } from "react";

import * as Globals from "@/components";
import * as Constants from "@/utils/constants";
import * as Styles from "@/utils/styles";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
`;

const Copy = styled.article`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto ${Styles.pxAsRem.forty};
  color: ${(props: ThemeProps) => props.theme.text};
`;

const CopyHeader = styled.h2`
  margin: 0 0;
  font-size: ${Styles.pxAsRem.twentyFour};
  font-weight: ${Styles.fontWeights.bold};
  text-align: center;
`;

const CopyBody = styled.h2`
  margin: 0 0;
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.medium};
  text-align: center;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const CTA = () => {
  const { ui } = useContext(SignalsStoreContext);

  return (
    <Container>
      <Globals.LazyLoad
        threshold={0.8}
        initial={Constants.landingMotion.initial}
        animate={Constants.landingMotion.animate}
        transition={Constants.landingMotion.transition}
      >
        <Copy>
          <CopyHeader>Interested?</CopyHeader>
          <CopyBody>
            Register with Kujira to keep track of your monthly purchases and
            gain control of your financial health.
          </CopyBody>
        </Copy>

        <Link href="/register">
          <Globals.Button
            size="large"
            maxWidth="600px"
            background={Styles.primary[ui.theme.value].main}
            hoverBackground={Styles.primary[ui.theme.value].darker}
          >
            Register
          </Globals.Button>
        </Link>
      </Globals.LazyLoad>
    </Container>
  );
};
