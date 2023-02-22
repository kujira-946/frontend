import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

import * as Components from "@/components";
import * as Sizes from "@/utils/sizes";
import * as Styles from "@/utils/styles";
import { ThemeProp } from "./_app";

const AboveTheFold = styled.main`
  height: 100vh;
  background-color: ${(props: ThemeProp) => props.theme.backgroundOne};

  border: red solid 1px;
`;

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto;
  width: 100%;
  max-width: ${Sizes.widths.content}px;

  ${Styles.setMediaPaddings(140)};

  border: blue solid 1px;
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

      <Components.Navbar />
      <AboveTheFold>
        <Section>Something</Section>
      </AboveTheFold>
    </>
  );
}
