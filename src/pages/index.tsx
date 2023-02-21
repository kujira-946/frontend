import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { ThemeProp } from "./_app";

const Content = styled.main`
  border: red solid 1px;
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

      <Content>something</Content>
    </>
  );
}
