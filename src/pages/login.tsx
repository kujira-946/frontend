import { useSignal } from "@preact/signals-react";

import * as Components from "@/components/auth";

const Login = () => {
  const toConfirmation = useSignal(false);

  return (
    <Components.AuthForm title="Log In" caption="Don't have an account?" />
  );
};

export default Login;
