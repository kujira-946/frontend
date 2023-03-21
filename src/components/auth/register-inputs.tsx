import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { effect, Signal, useSignal } from "@preact/signals-react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Sizes from "@/utils/sizes";
import * as Types from "@/utils/types";
import { GlobalState } from "@/store";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Sizes.pxAsRem.four};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  email: Signal<string>;
  username: Signal<string>;
  password: Signal<string>;
  confirmPassword: Signal<string>;

  emailError: Signal<string>;
  usernameError: Signal<string>;
  passwordError: Signal<string>;
  confirmPasswordError: Signal<string>;
};

export const RegisterInputs = (props: Props) => {
  const dispatch = useDispatch();
  const { errors } = useSelector((state: GlobalState) => state);

  const hidden = useSignal(true);

  effect(() => {
    // Username error check
    if (props.username.value !== "") {
      if (!Functions.checkValidCharacters(props.username.value)) {
        props.usernameError.value = "Invalid character(s).";
      } else if (props.username.value.length < 6) {
        props.usernameError.value = "Too short.";
      } else if (props.username.value.length > 16) {
        props.usernameError.value = "Too long.";
      } else {
        props.usernameError.value = "";
      }
    } else {
      props.usernameError.value = "";
    }
    // Confirm password error check
    if (props.confirmPassword.value !== "") {
      if (props.confirmPassword.value !== props.password.value) {
        props.confirmPasswordError.value = "Passwords don't match.";
      } else {
        props.confirmPasswordError.value = "";
      }
    } else {
      props.confirmPasswordError.value = "";
    }
  });

  return (
    <Container>
      {/* Email */}
      <Globals.Input
        borderRadius="four"
        title="Email"
        errorMessage={
          errors.auth.includes("email") ? errors.auth : props.emailError.value
        }
        userInput={props.email.value}
        setUserInput={(event: Types.Input) => {
          props.email.value = event.currentTarget.value;
          if (errors.auth.length > 0) {
            dispatch(Redux.errorsActions.setAuth(""));
          }
        }}
      />

      {/* Username */}
      <Globals.Input
        borderRadius="four"
        title="Username"
        errorMessage={
          errors.auth.includes("username")
            ? errors.auth
            : props.usernameError.value
        }
        userInput={props.username.value}
        setUserInput={(event: Types.Input) => {
          props.username.value = event.currentTarget.value;
          if (errors.auth.length > 0) {
            dispatch(Redux.errorsActions.setAuth(""));
          }
        }}
      />

      {/* Password */}
      <Globals.Input
        borderRadius="four"
        title="Password"
        errorMessage={props.passwordError.value}
        userInput={props.password.value}
        setUserInput={(event: Types.Input) =>
          (props.password.value = event.currentTarget.value)
        }
        hidden={hidden.value}
        toggleHidden={() => (hidden.value = !hidden.value)}
        password
      />

      {/* Confirm Password */}
      <Globals.Input
        borderRadius="four"
        title="Confirm Password"
        errorMessage={props.confirmPasswordError.value}
        userInput={props.confirmPassword.value}
        setUserInput={(event: Types.Input) =>
          (props.confirmPassword.value = event.currentTarget.value)
        }
        hidden={hidden.value}
        toggleHidden={() => (hidden.value = !hidden.value)}
        password
      />
    </Container>
  );
};
