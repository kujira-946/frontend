import styled from "styled-components";
import { useCallback } from "react";
import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { updateUserPasswordRequest } from "@/sagas/users.saga";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  width: 100%;
  max-width: 400px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const Security = () => {
  const dispatch = Functions.useAppDispatch();

  const { currentUser } = Functions.useEntitiesSlice();

  const hidden = useSignal(true);

  const password = useSignal("");
  const newPassword = useSignal("");
  const confirmNewPassword = useSignal("");

  const passwordError = useSignal("");
  const newPasswordError = useSignal("");
  const confirmNewPasswordError = useSignal("");

  const setUserInput = useCallback(
    (type: "Password" | "New Password" | "Confirm New Password") => {
      return (event: Types.Input): void => {
        if (type === "Password") {
          password.value = event.currentTarget.value;
        } else if (type === "New Password") {
          newPassword.value = event.currentTarget.value;
        } else {
          confirmNewPassword.value = event.currentTarget.value;
        }
      };
    },
    []
  );

  function checkDisabled(): boolean {
    return (
      password.value === "" ||
      newPassword.value === "" ||
      confirmNewPassword.value === "" ||
      !!passwordError.value ||
      !!newPasswordError.value ||
      !!confirmNewPasswordError.value
    );
  }

  function submit(event: Types.Submit): void {
    event.preventDefault();

    if (!checkDisabled() && currentUser) {
      dispatch(
        updateUserPasswordRequest(currentUser.id, {
          oldPassword: password.value,
          newPassword: newPassword.value,
        })
      );
    }
  }

  effect(() => {
    // Password error check
    if (password.value !== "") {
      if (password.value.length < 12) {
        passwordError.value = "Too short.";
      } else {
        passwordError.value = "";
      }
    } else {
      passwordError.value = "";
    }

    // New Password error check
    if (newPassword.value !== "") {
      if (newPassword.value === password.value) {
        newPasswordError.value = "Please use a new password.";
      } else if (newPassword.value.length < 12) {
        newPasswordError.value = "Too short.";
      } else {
        newPasswordError.value = "";
      }
    } else {
      newPasswordError.value = "";
    }

    // Confirm New Password error check
    if (confirmNewPassword.value !== "") {
      if (confirmNewPassword.value !== newPassword.value) {
        confirmNewPasswordError.value = "Passwords don't match.";
      } else {
        confirmNewPasswordError.value = "";
      }
    } else {
      confirmNewPasswordError.value = "";
    }
  });

  return (
    <Container onSubmit={submit}>
      <Globals.Input
        key="settings-page-security-password"
        type={hidden.value ? "password" : "text"}
        title="*Password"
        errorMessage={passwordError.value}
        userInput={password.value}
        setUserInput={setUserInput("Password")}
        hidden={hidden.value}
        toggleHidden={() => (hidden.value = !hidden.value)}
        password
        required
      />

      <Globals.Input
        key="settings-page-security-new-password"
        type={hidden.value ? "password" : "text"}
        title="*New Password"
        errorMessage={newPasswordError.value}
        userInput={newPassword.value}
        setUserInput={setUserInput("New Password")}
        hidden={hidden.value}
        toggleHidden={() => (hidden.value = !hidden.value)}
        password
        required
      />

      <Globals.Input
        key="settings-page-security-confirm-new-password"
        type={hidden.value ? "password" : "text"}
        title="*Confirm New Password"
        errorMessage={confirmNewPasswordError.value}
        userInput={confirmNewPassword.value}
        setUserInput={setUserInput("Confirm New Password")}
        hidden={hidden.value}
        toggleHidden={() => (hidden.value = !hidden.value)}
        password
        required
      />

      <Globals.SubmitButton disabled={checkDisabled()}>
        Update
      </Globals.SubmitButton>
    </Container>
  );
};
