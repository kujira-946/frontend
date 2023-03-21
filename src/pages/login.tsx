import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Components from "@/components/auth";
import { GlobalState } from "@/store";

const Login = () => {
  const { user } = useSelector((state: GlobalState) => state.entities);
  const { tempUserId } = useSelector((state: GlobalState) => state.ui);

  const router = useRouter();
  const accessToken = Cookies.get("token");
  useEffect(() => {
    if (user && accessToken) router.push("/dashboard/logbooks");
  }, [user, router, accessToken]);

  return !tempUserId ? (
    <Components.AuthForm title="Log In" caption="Don't have an account?" />
  ) : (
    <Components.Verification title="Verify Login" />
  );
};

export default Login;
