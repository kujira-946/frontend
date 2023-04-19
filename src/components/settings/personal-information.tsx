import styled from "styled-components";
import { useCallback, useEffect } from "react";
import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";

import { SubmitButton } from "../submit-button";

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

export const PersonalInformation = () => {
  const { currentUser } = Functions.useEntitiesSlice();

  const email = useSignal("");
  const username = useSignal("");
  const firstName = useSignal("");
  const lastName = useSignal("");

  const emailError = useSignal("");
  const usernameError = useSignal("");
  const firstNameError = useSignal("");
  const lastNameError = useSignal("");

  const setUserInput = useCallback(
    (type: "Email" | "Username" | "First Name" | "Last Name") => {
      return (event: Types.Input): void => {
        if (type === "Email") {
          email.value = event.currentTarget.value;
        } else if (type === "Username") {
          username.value = event.currentTarget.value;
        } else if (type === "First Name") {
          firstName.value = event.currentTarget.value;
        } else {
          lastName.value = event.currentTarget.value;
        }
      };
    },
    []
  );

  function checkDisabled(): boolean {
    if (currentUser) {
      return (
        email.value === currentUser.email ||
        username.value === currentUser.username ||
        (email.value === "" && username.value === "")
      );
    } else {
      return true;
    }
  }

  function submit(event: Types.Submit): void {
    event.preventDefault();
    console.log("Submit Personal Information");
    Functions.consoleLog(email.value);
    Functions.consoleLog(username.value);
    Functions.consoleLog(firstName.value);
    Functions.consoleLog(lastName.value);
  }

  useEffect(() => {
    if (currentUser) {
      email.value = currentUser.email;
      username.value = currentUser.username;
      if (currentUser.firstName) firstName.value = currentUser.firstName;
      if (currentUser.lastName) lastName.value = currentUser.lastName;
    }
  }, [currentUser]);

  effect(() => {
    // Email error check
    if (email.value !== "") {
      if (!email.value.includes("@")) {
        emailError.value = "Enter a valid email.";
      } else if (!email.value.includes(".com")) {
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

  if (!currentUser) {
    return null;
  } else {
    return (
      <Container onSubmit={submit}>
        <Globals.Input
          key="settings-page-personal-information-tab-email"
          title="*Email"
          errorMessage={emailError.value}
          userInput={email.value}
          setUserInput={setUserInput("Email")}
          required
        />

        <Globals.Input
          key="settings-page-personal-information-tab-username"
          title="*Username"
          errorMessage={usernameError.value}
          userInput={username.value}
          setUserInput={setUserInput("Username")}
          required
        />

        <Globals.Input
          key="settings-page-personal-information-tab-first-name"
          title="First Name"
          errorMessage={firstNameError.value}
          userInput={firstName.value}
          setUserInput={setUserInput("First Name")}
        />

        <Globals.Input
          key="settings-page-personal-information-tab-last-name"
          title="Last Name"
          errorMessage={lastNameError.value}
          userInput={lastName.value}
          setUserInput={setUserInput("Last Name")}
        />

        <SubmitButton disabled={checkDisabled()}>Update</SubmitButton>
      </Container>
    );
  }
};
