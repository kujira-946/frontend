import Head from "next/head";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Components from "@/components/landing";
import * as Constants from "@/utils/constants";
import * as Selectors from "@/utils/selectors";

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

const userId = Cookies.get("id");
const accessToken = Cookies.get("token");

const Home = () => {
  const router = useRouter();
  const { currentUser } = Selectors.useEntitiesSlice();

  // ↓↓↓ Starts the page back at the top when refreshing. ↓↓↓ //
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (userId && accessToken && currentUser) {
      if (currentUser.onboarded) router.push(Constants.ClientRoutes.LOGBOOKS);
      else router.push(Constants.ClientRoutes.ONBOARDING);
    }
  }, [userId, accessToken, currentUser]);

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
};

export default Home;
