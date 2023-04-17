import Head from "next/head";
import { useSignal } from "@preact/signals-react";

import * as Components from "@/components/auth";
import * as Functions from "@/utils/functions";

const Register = () => {
  const { verificationCodeSent } = Functions.useUiSlice();

  const email = useSignal("");

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
};

export default Register;
