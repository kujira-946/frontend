import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Components from "@/components/auth";
import { GlobalState } from "@/store";

const Register = () => {
  const { user } = useSelector((state: GlobalState) => state.entities);
  const { tempUserId } = useSelector((state: GlobalState) => state.ui);

  const router = useRouter();
  useEffect(() => {
    if (user) router.push("/login");
  }, [user, router]);

  return !tempUserId ? (
    <Components.AuthForm title="Register" caption="Already have an account?" />
  ) : (
    <Components.Verification title="Verify Registration" />
  );
};

export default Register;
