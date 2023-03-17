import { useSelector } from "react-redux";

import * as Components from "@/components/auth";
import { GlobalState } from "@/store";

const Login = () => {
  const { verificationCodeSent } = useSelector(
    (state: GlobalState) => state.ui
  );

  return !verificationCodeSent ? (
    <Components.AuthForm title="Log In" caption="Don't have an account?" />
  ) : (
    <Components.Verification title="Verify Login" />
  );
};

export default Login;
