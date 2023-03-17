import { useSelector } from "react-redux";

import * as Components from "@/components/auth";
import { GlobalState } from "@/store";

const Register = () => {
  const { verificationCodeSent } = useSelector(
    (state: GlobalState) => state.ui
  );

  return !verificationCodeSent ? (
    <Components.AuthForm title="Register" caption="Already have an account?" />
  ) : (
    <Components.Verification title="Verify Registration" />
  );
};

export default Register;
