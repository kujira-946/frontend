import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

import { CardBack } from "./card-back";
import { CardFront } from "./card-front";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  height: 100vh;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  padding-top: 180px;

  ${Styles.setMediaPaddings(140)};
`;

const ATFContent = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 80px;
  margin: 0px auto;
  width: 100%;
  max-width: ${Styles.widths.content}px;
`;

const CopyAndButtons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Copy = styled.article`
  width: 100%;
  max-width: 500px;
  color: ${(props: ThemeProps) => props.theme.text};
`;

const CopyHeader = styled.h1`
  font-size: ${Styles.pxAsRem.thirtyTwo};
  font-weight: ${Styles.fontWeights.bold};
  margin: 0 0 ${Styles.pxAsRem.twelve};
`;

const CopyBody = styled.p`
  font-size: ${Styles.pxAsRem.eighteen};
  font-weight: ${Styles.fontWeights.medium};
  margin: 0;
`;

const Buttons = styled.article`
  display: flex;
  gap: 20px;
`;

const Cards = styled.article`
  position: relative;
  flex: 1;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

function scrollToAbout(): void {
  document
    .getElementById("landing-about")
    ?.scrollIntoView({ behavior: "smooth" });
}

export const AboveTheFold = () => {
  const { ui } = Functions.useSignalsStore();

  return (
    <Container>
      <ATFContent>
        <CopyAndButtons
          initial={{ opacity: 0, transform: "translateY(-4px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Copy>
            <CopyHeader>
              You have a money problem. Or two. We all do.
            </CopyHeader>
            <CopyBody>
              So, how do we fix them? With a little bit of perspective.
            </CopyBody>
          </Copy>

          <Buttons>
            <Link href="/register" style={{ width: "100%" }}>
              <Globals.PrimaryButton size="large">
                Register
              </Globals.PrimaryButton>
            </Link>

            <Globals.PrimaryButtonOutlined
              onClick={scrollToAbout}
              size="large"
              borderThickness={2}
            >
              Learn More
            </Globals.PrimaryButtonOutlined>
          </Buttons>
        </CopyAndButtons>

        <Cards>
          <CardBack />
          <CardFront />
        </Cards>
      </ATFContent>
    </Container>
  );
};
