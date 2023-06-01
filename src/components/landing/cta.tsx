import Link from "next/link";
import styled from "styled-components";

import * as Globals from "@/components";
import * as Constants from "@/utils/constants";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem ${Styles.pxAsRem.twenty};
  background-color: ${(props: ThemeProps) => props.theme.backgroundThree};

  ${Styles.setMediaPaddings("eighty", "eighty", "forty")};
`;

const Copy = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twelve};
  width: 100%;
  max-width: 600px;
  margin: 0 auto ${Styles.pxAsRem.forty};
`;

const CopyHeader = styled.h2`
  margin: 0 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.twentyEight};
  font-weight: ${Styles.fontWeights.bold};
  text-align: center;
`;

const CopyBody = styled.h2`
  margin: 0 0;
  color: ${(props: ThemeProps) => props.theme.backgroundTen};
  font-size: ${Styles.pxAsRem.twenty};
  font-weight: ${Styles.fontWeights.medium};
  text-align: center;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const CTA = () => {
  return (
    <Container>
      <Globals.LazyLoad
        threshold={0.8}
        initial={Constants.landingMotion.initial}
        animate={Constants.landingMotion.animate}
        transition={Constants.landingMotion.transition}
      >
        <Copy>
          <CopyHeader>Take control of your financial health.</CopyHeader>
          <CopyBody>Create an account to start today.</CopyBody>
        </Copy>

        <Link href="/register">
          <Globals.Button type="button" size="large" primary>
            Register
          </Globals.Button>
        </Link>
      </Globals.LazyLoad>
    </Container>
  );
};
