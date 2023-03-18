import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { effect, useSignal } from "@preact/signals-react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as AuthActions from "@/sagas/auth.saga";
import * as Colors from "@/utils/colors";
import * as Sizes from "@/utils/sizes";
import * as Types from "@/utils/types";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "@/components/layout";

import { RegisterInputs } from "./register-inputs";
import { LoginInputs } from "./login-inputs";
import { CheckboxConfirmation } from "./checkbox-confirmation";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.main`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  max-width: 400px;
  padding: ${Sizes.pxAsRem.sixteen};
  border-radius: ${Sizes.pxAsRem.six};

  ${(props: ThemeProps) => props.theme.shadowTwo};
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Sizes.pxAsRem.twenty};
  margin-bottom: ${Sizes.pxAsRem.twenty};
`;

const TitleAndCaption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Sizes.pxAsRem.eight};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${Sizes.pxAsRem.twentyFour};
  font-weight: ${Sizes.fontWeights.bold};
  text-align: center;
`;

const Caption = styled.p`
  margin: 0;
  font-size: ${Sizes.pxAsRem.fourteen};
  font-weight: ${Sizes.fontWeights.medium};
  text-align: center;
`;

const Redirect = styled(Link)`
  color: ${(props: ThemeProps) => props.theme.primaryMain};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.primaryDark};
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${Sizes.pxAsRem.sixteen};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  title: "Register" | "Log In";
  caption: string;
};

export const AuthForm = (props: Props) => {
  const dispatch = useDispatch();
  const { ui } = useContext(SignalsStoreContext);

  const email = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");

  const emailError = useSignal("");
  const usernameError = useSignal("");
  const passwordError = useSignal("");
  const confirmPasswordError = useSignal("");

  const checkboxActive = useSignal(false);

  useEffect(() => {
    if (props.title === "Log In") {
      if (checkboxActive.value) {
        dispatch(Redux.uiActions.setLoginForThirtyDays(true));
      } else {
        dispatch(Redux.uiActions.setLoginForThirtyDays(false));
      }
    }
  }, [dispatch, props.title, checkboxActive.value]);

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
    // Password error check
    if (props.title === "Register" && password.value !== "") {
      if (password.value.length < 12) {
        passwordError.value = "Too short.";
      } else {
        passwordError.value = "";
      }
    } else {
      passwordError.value = "";
    }
  });

  function checkRegistrationErrors(): boolean {
    return (
      checkLoginErrors() &&
      username.value.length > 0 &&
      usernameError.value === "" &&
      confirmPassword.value.length > 0 &&
      confirmPasswordError.value === "" &&
      checkboxActive.value
    );
  }
  function register(): void {
    if (checkRegistrationErrors()) {
      dispatch(
        AuthActions.registerRequest({
          email: email.value,
          username: username.value,
          password: password.value,
        } as Types.RegistrationData)
      );
    }
  }

  function checkLoginErrors(): boolean {
    return (
      email.value.length > 0 &&
      emailError.value === "" &&
      password.value.length > 0 &&
      passwordError.value === ""
    );
  }
  function login(): void {
    if (checkLoginErrors()) {
      dispatch(
        AuthActions.loginRequest({
          email: email.value,
          password: password.value,
        } as Types.LoginData)
      );
    }
  }

  function submit(event: Types.Submit): void {
    event.preventDefault();
    if (props.title === "Register") register();
    else login();
  }

  return (
    <>
      <Container>
        <Header>
          {ui.theme.value === "light" ? (
            <Image
              src="/logo-full-vertical-light.svg"
              alt="Logo"
              width={36.04}
              height={40}
            />
          ) : (
            <Image
              src="/logo-full-vertical-dark.svg"
              alt="Logo"
              width={36.04}
              height={40}
            />
          )}
          <TitleAndCaption>
            <Title>{props.title}</Title>
            <Caption>
              {props.caption}{" "}
              <Redirect
                href={props.title === "Register" ? "/login" : "/register"}
              >
                {props.title === "Register" ? "Log In" : "Register"}
              </Redirect>
            </Caption>
          </TitleAndCaption>
        </Header>

        <Form onSubmit={submit}>
          {props.title === "Register" ? (
            <RegisterInputs
              email={email}
              username={username}
              password={password}
              confirmPassword={confirmPassword}
              emailError={emailError}
              usernameError={usernameError}
              passwordError={passwordError}
              confirmPasswordError={confirmPasswordError}
            />
          ) : (
            <LoginInputs
              email={email}
              password={password}
              emailError={emailError}
              passwordError={passwordError}
            />
          )}

          <CheckboxConfirmation
            isRegister={props.title === "Register"}
            checkboxActive={checkboxActive}
          />

          <Globals.Button
            type="submit"
            size="medium"
            borderRadius="four"
            background={Colors.primary[ui.theme.value].main}
            hoverBackground={Colors.primary[ui.theme.value].darker}
            disabled={
              props.title === "Register"
                ? !checkRegistrationErrors()
                : !checkLoginErrors()
            }
          >
            {props.title}
          </Globals.Button>
        </Form>
      </Container>
    </>
  );
};
