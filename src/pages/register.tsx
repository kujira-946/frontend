import { useSignal } from "@preact/signals-react";

import * as Components from "@/components/auth";

const Register = () => {
  const toConfirmation = useSignal(false);

  return !toConfirmation.value ? (
    <Components.AuthForm
      title="Register"
      caption="Already have an account?"
      toConfirmation={() => (toConfirmation.value = true)}
    />
  ) : (
    <Components.Verification title="Verify Registration" />
  );
};

export default Register;
