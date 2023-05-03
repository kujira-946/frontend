import styled from "styled-components";
import { effect, Signal, useSignal } from "@preact/signals-react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
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
  const dispatch = Functions.useAppDispatch();
  const { auth } = Functions.useErrorsSlice();

  effect(() => {
    // Username error check
    if (props.username.value !== "") {
      if (!Functions.checkValidUsernameCharacters(props.username.value)) {
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
      <Globals.FormInput
        type="email"
        userInput={props.email.value}
        setUserInput={(event: Types.Input) => {
          props.email.value = event.currentTarget.value;
          if (auth.length > 0) {
            dispatch(Redux.errorsActions.setAuth(""));
          }
        }}
        placeholder="*Email"
        errorMessage={auth.includes("email") ? auth : props.emailError.value}
        borderRadius="six"
        required
      />

      {/* Username */}
      <Globals.FormInput
        type="text"
        userInput={props.username.value}
        setUserInput={(event: Types.Input) => {
          props.username.value = event.currentTarget.value;
          if (auth.length > 0) {
            dispatch(Redux.errorsActions.setAuth(""));
          }
        }}
        placeholder="*Username"
        errorMessage={
          auth.includes("username") ? auth : props.usernameError.value
        }
        borderRadius="six"
        required
      />

      {/* Password */}
      <Globals.FormInput
        type="password"
        userInput={props.password.value}
        setUserInput={(event: Types.Input) =>
          (props.password.value = event.currentTarget.value)
        }
        placeholder="*Password"
        errorMessage={props.passwordError.value}
        borderRadius="six"
        required
      />

      {/* Confirm Password */}
      <Globals.FormInput
        type="password"
        userInput={props.confirmPassword.value}
        setUserInput={(event: Types.Input) =>
          (props.confirmPassword.value = event.currentTarget.value)
        }
        placeholder="*Confirm Password"
        errorMessage={props.confirmPasswordError.value}
        borderRadius="six"
        required
      />
    </Container>
  );
};
