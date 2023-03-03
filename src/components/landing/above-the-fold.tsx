import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";

import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
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
  max-width: ${Sizes.widths.content}px;
`;

const CopyAndButtons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Copy = styled.article`
  max-width: 500px;
  color: ${(props: ThemeProps) => props.theme.text};
  transition: 0.1s ease-in;
`;

const CopyHeader = styled.h1`
  ${(props: ThemeProps) => {
    return Styles.setText("thirtyTwo", "bold", props.theme.text);
  }};
  margin: 0 0 ${Sizes.pxAsRem.twelve};
`;

const CopyBody = styled.p`
  ${(props: ThemeProps) => {
    return Styles.setText("eighteen", "medium", props.theme.text);
  }};
  margin: 0;
`;

const Buttons = styled.article`
  display: flex;
  gap: 20px;
`;

const RegisterButton = styled(Link)`
  ${(props: ThemeProps) =>
    Styles.setButton(
      "large",
      props.theme.primaryMain,
      props.theme.primaryDark
    )};
  flex: 1;
`;

const LearnMoreButton = styled.button`
  ${(props: ThemeProps) =>
    Styles.setButton(
      "large",
      props.theme.primaryMain,
      props.theme.primaryDark,
      true
    )};
  flex: 1;
`;

const Cards = styled.article`
  position: relative;
  flex: 1;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const AboveTheFold = () => {
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
            <RegisterButton href="/register">Register</RegisterButton>
            <LearnMoreButton>Learn More</LearnMoreButton>
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