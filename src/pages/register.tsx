import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSignal } from "@preact/signals-react";

import * as Components from "@/components/auth";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";

const Register = () => {
  const router = useRouter();

  const { currentUser } = Functions.useEntitiesSlice();
  const { verificationCodeSent } = Functions.useUiSlice();

  const email = useSignal("");

  useEffect(() => {
    if (currentUser) {
      if (currentUser.onboarded) router.push(Constants.ClientRoutes.LOGBOOKS);
      else router.push(Constants.ClientRoutes.ONBOARDING);
    }
  }, [currentUser]);

  if (currentUser) {
    return null;
  } else {
    return (
      <>
        <Head>
          <title>Kujira | Register</title>
          <meta name="description" content="Kujira app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {!verificationCodeSent ? (
          <Components.AuthForm
            title="Register"
            caption="Already have an account?"
            email={email}
          />
        ) : (
          <Components.Verification title="Verify Registration" email={email} />
        )}
      </>
    );
  }
};

export default Register;
