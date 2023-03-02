import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

import * as Components from "@/components";
import * as Sizes from "@/utils/sizes";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";
import Link from "next/link";
import { useContext } from "react";
import { SignalsStoreContext } from "./_app";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const AboveTheFold = styled.main`
  height: 100vh;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  padding-top: 140px;

  ${Styles.setMediaPaddings(140)};
`;

const Section = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 80px;
  margin: 0px auto;
  width: 100%;
  max-width: ${Sizes.widths.content}px;
`;

const CopyAndButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Copy = styled.article`
  max-width: 500px;
`;

const CopyHeader = styled.h1`
  margin: 0 0 ${Sizes.pxAsRem.twelve};
  font-size: ${Sizes.pxAsRem.thirtyTwo};
  font-weight: ${Sizes.fontWeights.bold};
`;

const CopyBody = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Sizes.pxAsRem.eighteen};
  font-weight: ${Sizes.fontWeights.medium};
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

export default function Home() {
  const { ui } = useContext(SignalsStoreContext);

  return (
    <>
      <Head>
        <title>Kujira</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-light.ico" />
      </Head>

      <Content>
        <Components.Navbar />

        <AboveTheFold>
          <Section>
            <CopyAndButtons>
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
              <Components.CardBack />
              <Components.CardFront />
            </Cards>
          </Section>
        </AboveTheFold>
      </Content>
    </>
  );
}
