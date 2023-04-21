import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useEffect } from "react";
import { Signal, effect, useSignal } from "@preact/signals-react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as AuthActions from "@/sagas/auth.saga";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
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
  padding: ${Styles.pxAsRem.sixteen};
  border-radius: ${Styles.pxAsRem.six};

  ${(props: ThemeProps) => props.theme.shadowTwo};
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Styles.pxAsRem.twenty};
  margin-bottom: ${Styles.pxAsRem.twenty};
`;

const TitleAndCaption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Styles.pxAsRem.eight};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${Styles.pxAsRem.twentyFour};
  font-weight: ${Styles.fontWeights.bold};
  text-align: center;
`;

const Caption = styled.p<{ resend?: true }>`
  margin: 0;
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.medium};
  text-align: ${(props) => (props.resend ? "left" : "center")};
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
  gap: ${Styles.pxAsRem.sixteen};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  title: "Register" | "Log In";
  caption: string;
  email: Signal<string>;
};

export const AuthForm = (props: Props) => {
  const dispatch = Functions.useAppDispatch();
  const { theme } = Functions.useSignalsStore().ui;

  const username = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");
  const checkboxActive = useSignal(false);

  const emailError = useSignal("");
  const usernameError = useSignal("");
  const passwordError = useSignal("");
  const confirmPasswordError = useSignal("");
  const verificationCodeError = useSignal("");

  function resendVerificationCode(): void {
    if (props.email.value && !emailError.value) {
      verificationCodeError.value = "";
      dispatch(
        AuthActions.requestNewVerificationCodeRequest(props.email.value)
      );
    } else {
      verificationCodeError.value = "Please provide a valid email.";
    }
  }

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
    if (props.email.value !== "") {
      if (!props.email.value.includes("@")) {
        emailError.value = "Enter a valid email.";
      } else if (!props.email.value.includes(".com")) {
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
          email: props.email.value,
          username: username.value,
          password: password.value,
        } as Types.RegistrationData)
      );
    }
  }

  function checkLoginErrors(): boolean {
    return (
      props.email.value.length > 0 &&
      emailError.value === "" &&
      password.value.length > 0 &&
      passwordError.value === ""
    );
  }
  function login(): void {
    if (checkLoginErrors()) {
      dispatch(
        AuthActions.loginRequest({
          email: props.email.value,
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
          {theme.value === "light" ? (
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
              email={props.email}
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
              email={props.email}
              password={password}
              emailError={emailError}
              passwordError={passwordError}
            />
          )}

          <CheckboxConfirmation
            isRegister={props.title === "Register"}
            checkboxActive={checkboxActive}
          />

          <Globals.SubmitButton
            disabled={
              props.title === "Register"
                ? !checkRegistrationErrors()
                : !checkLoginErrors()
            }
            borderRadius="four"
          >
            {props.title}
          </Globals.SubmitButton>
        </Form>
      </Container>
    </>
  );
};
