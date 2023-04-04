import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Components from "@/components/landing";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

const Home = () => {
  const router = useRouter();

  const { currentUser } = Functions.useEntitiesSlice();

  // ↓↓↓ Starts the page back at the top when refreshing. ↓↓↓ //
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.onboarded) {
        router.push(Constants.ClientRoutes.ONBOARDING);
      } else {
        router.push(Constants.ClientRoutes.LOGBOOKS);
      }
    }
  }, [currentUser]);

  if (currentUser) {
    return null;
  } else {
    return (
      <>
        <Head>
          <title>Kujira</title>
          <meta name="description" content="Kujira app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Main>
          <Components.Navbar />
          <Components.AboveTheFold />
          <Components.About />
          <Components.CTA />
          <Components.Footer />
        </Main>
      </>
    );
  }
};

export default Home;
