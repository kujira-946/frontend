import Link from "next/link";
import styled from "styled-components";
import { useContext } from "react";

import * as Globals from "@/components";
import * as Colors from "@/utils/styles/styles.colors";
import * as Sizes from "@/utils/styles.sizes";
import * as Constants from "@/utils/constants.landing";
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

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const CTA = () => {
  const { ui } = useContext(SignalsStoreContext);

  return (
    <Container>
      <Globals.LazyLoad
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

        <Link href="/register">
          <Globals.Button
            size="large"
            maxWidth="600px"
            background={Colors.primary[ui.theme.value].main}
            hoverBackground={Colors.primary[ui.theme.value].darker}
          >
            Register
          </Globals.Button>
        </Link>
      </Globals.LazyLoad>
    </Container>
  );
};
