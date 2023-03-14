import { AuthErrors } from "@/redux/errors-slice";

export const initialAuthErrorsState: AuthErrors = {
  emailCheck: "",
  usernameCheck: "",
  general: "",
};
