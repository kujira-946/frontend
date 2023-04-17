import Head from "next/head";
import { useSignal } from "@preact/signals-react";

import * as Components from "@/components/auth";
import * as Functions from "@/utils/functions";

const Login = () => {
  const { verificationCodeSent } = Functions.useUiSlice();

  const email = useSignal("");

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
};

export default Login;
