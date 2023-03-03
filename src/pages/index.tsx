import Head from "next/head";
import styled from "styled-components";

import * as Landing from "@/components/landing";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export default function Home() {
  return (
    <>
      <Head>
        <title>Kujira</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Landing.Navbar />
        <Landing.AboveTheFold />
        <Landing.About />
        <Landing.CTA />
        <Landing.Footer />
      </Main>
    </>
  );
}
