import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSignal } from "@preact/signals-react";

import * as Components from "@/components/auth";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";

const Login = () => {
  const router = useRouter();
  Functions.useDetectAuthorizedUser(() => {
    if (currentUser) {
      if (currentUser.onboarded) router.push(Constants.ClientRoutes.LOGBOOKS);
      else router.push(Constants.ClientRoutes.ONBOARDING);
    }
  });

  const { currentUser } = Functions.useEntitiesSlice();
  const { verificationCodeSent } = Functions.useUiSlice();

  const email = useSignal("");

  if (currentUser) {
    return null;
  } else {
    return (
      <>
        <Head>
          <title>Kujira | Login</title>
          <meta name="description" content="Kujira app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {!verificationCodeSent ? (
          <Components.AuthForm
            title="Log In"
            caption="Don't have an account?"
            email={email}
          />
        ) : (
          <Components.Verification title="Verify Login" email={email} />
        )}
      </>
    );
  }
};

export default Login;
