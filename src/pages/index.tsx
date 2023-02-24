import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

import * as Components from "@/components";
import * as Sizes from "@/utils/sizes";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const AboveTheFold = styled.main`
  height: 100vh;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  padding-top: 140px;

  ${Styles.setMediaPaddings(140)};

  border: red solid 1px;
`;

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto;
  width: 100%;
  max-width: ${Sizes.widths.content}px;

  border: blue solid 1px;
`;

const Copy = styled.article`
  max-width: 500px;
`;

const CopyHeader = styled.h1`
  margin: 0 0 ${Sizes.pxAsRem.twelve};
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Sizes.pxAsRem.thirtyTwo};
  font-weight: ${Sizes.fontWeights.bold};
`;

const CopyBody = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Sizes.pxAsRem.eighteen};
  font-weight: ${Sizes.fontWeights.medium};
`;

export default function Home() {
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
            <Copy>
              <CopyHeader>
                You have a money problem. Or two. We all do.
              </CopyHeader>
              <CopyBody>
                We can solve these problems by being more cognizant of how,
                when, why, and where we spend our money.
              </CopyBody>
            </Copy>
          </Section>
        </AboveTheFold>
      </Content>
    </>
  );
}
