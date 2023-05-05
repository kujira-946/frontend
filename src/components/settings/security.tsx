import styled from "styled-components";
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
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const Security = () => {
  const dispatch = Functions.useAppDispatch();

  const { currentUser } = Functions.useEntitiesSlice();

  const password = useSignal("");
  const newPassword = useSignal("");
  const confirmNewPassword = useSignal("");

  const passwordError = useSignal("");
  const newPasswordError = useSignal("");
  const confirmNewPasswordError = useSignal("");

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

  // ↓↓↓ Error checks ↓↓↓ //
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
      <Globals.FormInput
        key="dashboard-settings-page-security-password"
        type="password"
        userInput={password.value}
        setUserInput={(event: Types.Input) => {
          password.value = event.currentTarget.value;
        }}
        placeholder="*Password"
        errorMessage={passwordError.value}
        required
      />

      <Globals.FormInput
        key="dashboard-settings-page-security-new-password"
        type="password"
        userInput={newPassword.value}
        setUserInput={(event: Types.Input) => {
          newPassword.value = event.currentTarget.value;
        }}
        placeholder="*New Password"
        errorMessage={newPasswordError.value}
        required
      />

      <Globals.FormInput
        key="dashboard-settings-page-security-confirm-new-password"
        type="password"
        userInput={confirmNewPassword.value}
        setUserInput={(event: Types.Input) => {
          confirmNewPassword.value = event.currentTarget.value;
        }}
        placeholder="*Confirm New Password"
        errorMessage={confirmNewPasswordError.value}
        required
      />

      <Globals.Button
        type="submit"
        disabled={checkDisabled()}
        size="large"
        primary
      >
        Update
      </Globals.Button>
    </Container>
  );
};
