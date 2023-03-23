import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Components from "@/components/auth";
import * as Constants from "@/utils/constants";
import { GlobalState } from "@/store";

const Login = () => {
  const { user } = useSelector((state: GlobalState) => state.entities);
  const { tempUserId } = useSelector((state: GlobalState) => state.ui);

  const router = useRouter();
  useEffect(() => {
    if (user) {
      if (user.onboarded) router.push(Constants.ClientRoutes.LOGBOOKS);
      else router.push(Constants.ClientRoutes.ONBOARDING);
    }
  }, [user]);

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
