import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Types from "@/utils/types";

type Props = {
  isRegister: boolean;

  password: string;
  setPassword: (userInput: string) => void;

  confirmPassword: string;
  setConfirmPassword: (userInput: string) => void;
};

export const AuthFormPasswords = (props: Props) => {
  const hidden = useSignal(true);
  const passwordError = useSignal("");
  const confirmPasswordError = useSignal("");

  effect(() => {
    if (props.password !== "") {
      if (props.password.length < 12) {
        passwordError.value = "Too short.";
      } else {
        passwordError.value = "";
      }
    } else {
      passwordError.value = "";
    }

    if (props.confirmPassword !== "") {
      if (props.confirmPassword !== props.password) {
        confirmPasswordError.value = "Passwords don't match.";
      } else {
        confirmPasswordError.value = "";
      }
    } else {
      confirmPasswordError.value = "";
    }
  });

  return (
    <>
      <Globals.Input
        borderRadius="four"
        title="Password"
        errorMessage={passwordError.value}
        userInput={props.password}
        setUserInput={(event: Types.Input) =>
          props.setPassword(event.currentTarget.value)
        }
        hidden={hidden.value}
        toggleHidden={() => (hidden.value = !hidden.value)}
        password
      />

      {props.isRegister && (
        <Globals.Input
          borderRadius="four"
          title="Confirm Password"
          errorMessage={confirmPasswordError.value}
          userInput={props.confirmPassword}
          setUserInput={(event: Types.Input) =>
            props.setConfirmPassword(event.currentTarget.value)
          }
          hidden={hidden.value}
          toggleHidden={() => (hidden.value = !hidden.value)}
          password
        />
      )}
    </>
  );
};
