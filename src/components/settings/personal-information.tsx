import styled from "styled-components";
import { useEffect } from "react";
import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { updateUserRequest } from "@/sagas/users.saga";

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

export const PersonalInformation = () => {
  const dispatch = Functions.useAppDispatch();

  const { currentUser } = Functions.useEntitiesSlice();

  const email = useSignal("");
  const username = useSignal("");
  const firstName = useSignal("");
  const lastName = useSignal("");

  const emailError = useSignal("");
  const usernameError = useSignal("");
  const firstNameError = useSignal("");
  const lastNameError = useSignal("");

  function checkDisabled(): boolean {
    return (
      email.value === "" ||
      username.value === "" ||
      !!emailError.value ||
      !!usernameError.value ||
      !!firstNameError.value ||
      !!lastNameError.value
    );
  }

  function submit(event: Types.Submit): void {
    event.preventDefault();

    if (!checkDisabled() && currentUser) {
      dispatch(
        updateUserRequest(currentUser.id, {
          email: email.value,
          username: username.value,
          firstName: firstName.value || null,
          lastName: lastName.value || null,
        })
      );
    }
  }

  // ↓↓↓ Initial state setup. ↓↓↓ //
  useEffect(() => {
    if (currentUser) {
      email.value = currentUser.email;
      username.value = currentUser.username;
      currentUser.firstName && (firstName.value = currentUser.firstName);
      currentUser.lastName && (lastName.value = currentUser.lastName);
    }
  }, [currentUser]);

  // ↓↓↓ Error checks ↓↓↓ //
  effect(() => {
    // Email error check
    if (email.value !== "") {
      if (!email.value.includes("@") || !email.value.includes(".com")) {
        emailError.value = "Enter a valid email.";
      } else {
        emailError.value = "";
      }
    } else {
      emailError.value = "";
    }

    // Username error check
    if (username.value !== "") {
      if (!Functions.checkValidUsernameCharacters(username.value)) {
        usernameError.value = "Invalid character(s).";
      } else if (username.value.length < 6) {
        usernameError.value = "Too short.";
      } else if (username.value.length > 16) {
        usernameError.value = "Too long.";
      } else {
        usernameError.value = "";
      }
    } else {
      usernameError.value = "";
    }

    // First name error check
    if (firstName.value !== "") {
      if (!Functions.checkValidNameCharacters(firstName.value)) {
        firstNameError.value = "Invalid character(s).";
      } else {
        firstNameError.value = "";
      }
    } else {
      firstNameError.value = "";
    }

    // Last name error check
    if (lastName.value !== "") {
      if (!Functions.checkValidNameCharacters(lastName.value)) {
        lastNameError.value = "Invalid character(s).";
      } else {
        lastNameError.value = "";
      }
    } else {
      lastNameError.value = "";
    }
  });

  return (
    <Container onSubmit={submit}>
      <Globals.FormInput
        key="dashboard-settings-page-personal-information-tab-email"
        type="email"
        userInput={email.value}
        setUserInput={(event: Types.Input) => {
          email.value = event.currentTarget.value;
        }}
        placeholder="*Email"
        errorMessage={emailError.value}
        required
      />

      <Globals.FormInput
        key="dashboard-settings-page-personal-information-tab-username"
        type="text"
        userInput={username.value}
        setUserInput={(event: Types.Input) => {
          username.value = event.currentTarget.value;
        }}
        placeholder="*Username"
        errorMessage={usernameError.value}
        required
      />

      <Globals.FormInput
        key="dashboard-settings-page-personal-information-tab-first-name"
        type="text"
        userInput={firstName.value}
        setUserInput={(event: Types.Input) => {
          firstName.value = event.currentTarget.value;
        }}
        placeholder="First Name"
        errorMessage={firstNameError.value}
      />

      <Globals.FormInput
        key="dashboard-settings-page-personal-information-tab-last-name"
        type="text"
        userInput={lastName.value}
        setUserInput={(event: Types.Input) => {
          lastName.value = event.currentTarget.value;
        }}
        placeholder="Last Name"
        errorMessage={lastNameError.value}
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
