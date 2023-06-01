import styled from "styled-components";
import { motion } from "framer-motion";

import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

import { Navbar } from "./navbar";
import { CardBack } from "./card-back";
import { CardFront } from "./card-front";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};

  ${Styles.setMediaPaddings()};
`;

const ATFContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 100px;
  width: 100%;
  max-width: ${Styles.widths.landingATF}px;
`;

const CopyAndButtons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.75rem;
  width: 100%;
  max-width: 37.5rem;

  @media (max-width: 800px) {
    max-width: 100%;
  }
`;

const Copy = styled.article`
  width: 100%;
`;

const CopyHeader = styled.h1`
  margin: 0rem 0rem ${Styles.pxAsRem.forty};
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.thirtySix};
  font-weight: ${Styles.fontWeights.bold};
`;

const CopyBody = styled.p`
  margin: 0rem;
  color: ${(props: ThemeProps) => props.theme.backgroundTen};
  font-size: ${Styles.pxAsRem.twenty};
  font-weight: ${Styles.fontWeights.regular};
`;

const LearnMoreButton = styled.button`
  ${Styles.clearButton};
  ${Styles.transition};

  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.sixteen};
  color: ${(props: ThemeProps) => props.theme.primaryMain};
  border: ${(props: ThemeProps) => props.theme.primaryMain} solid 1px;
  border-radius: ${Styles.pxAsRem.eight};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.semiBold};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.primaryDark};
      border: ${(props: ThemeProps) => props.theme.primaryDark} solid 1px;
    }
  }

  @media (max-width: ${Styles.widths.mobile}px) {
    width: 100%;
  }
`;

const Cards = styled.article`
  position: relative;
  top: ${Styles.pxAsRem.forty};

  @media (max-width: 800px) {
    display: none;
  }
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
  return (
    <Container>
      <Navbar />

      <ATFContent>
        <CopyAndButtons
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Copy>
            <CopyHeader>More Money, Less Anxiety</CopyHeader>
            <CopyBody>
              Money is one of those things that can disappear before we know
              it’s gone, and because it’s one of the biggest supporting pillars
              of our livelihoods, it comes as no surprise that it can be very
              anxiety-inducing. But it doesn’t have to be.
            </CopyBody>
          </Copy>

          <LearnMoreButton type="button" onClick={scrollToAbout}>
            Learn More
          </LearnMoreButton>
        </CopyAndButtons>

        <Cards>
          <CardBack />
          <CardFront />
        </Cards>
      </ATFContent>
    </Container>
  );
};
