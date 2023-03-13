import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Types from "@/utils/types";

type Props = {
  isRegister: boolean;

  password: string;
  setPassword: (userInput: string) => void;
  passwordError: string;

  confirmPassword: string;
  setConfirmPassword: (userInput: string) => void;
  confirmPasswordError: string;
};

export const AuthFormPasswords = (props: Props) => {
  const hidden = useSignal(true);

  return (
    <>
      <Globals.Input
        borderRadius="four"
        title="Password"
        errorMessage={props.passwordError}
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
          errorMessage={props.confirmPasswordError}
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
