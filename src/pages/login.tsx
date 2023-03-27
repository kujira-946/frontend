import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Components from "@/components/auth";
import * as Constants from "@/utils/constants";
import * as Selectors from "@/utils/selectors";

const Login = () => {
  const { currentUser } = Selectors.useEntitiesSlice();
  const { tempUserId } = Selectors.useUiSlice();

  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      if (currentUser.onboarded) router.push(Constants.ClientRoutes.LOGBOOKS);
      else router.push(Constants.ClientRoutes.ONBOARDING);
    }
  }, [currentUser]);

  return (
    <>
      <Head>
        <title>Kujira | Login</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!tempUserId ? (
        <Components.AuthForm title="Log In" caption="Don't have an account?" />
      ) : (
        <Components.Verification title="Verify Login" />
      )}
    </>
  );
};

export default Login;
