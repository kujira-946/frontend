import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Components from "@/components/auth";
import * as Constants from "@/utils/constants";
import { GlobalState } from "@/store";

const Register = () => {
  const { user } = useSelector((state: GlobalState) => state.entities);
  const { tempUserId } = useSelector((state: GlobalState) => state.ui);

  const router = useRouter();
  useEffect(() => {
    if (user && user.onboarded) router.push(Constants.ClientRoutes.LOGBOOKS);
    else router.push(Constants.ClientRoutes.LOGIN);
  }, [user, router]);

  return !tempUserId ? (
    <Components.AuthForm title="Register" caption="Already have an account?" />
  ) : (
    <Components.Verification title="Verify Registration" />
  );
};

export default Register;
