import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as AuthActions from "@/sagas/auth.saga";
import * as Functions from "@/utils/functions";
import * as Colors from "@/utils/colors";
import * as Sizes from "@/utils/sizes";
import * as Types from "@/utils/types";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "@/components/layout";

import { AuthFormPasswords } from "./auth-form-passwords";
import { GlobalState } from "@/store";

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

const Inputs = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Sizes.pxAsRem.four};
`;

const CheckboxConfirmation = styled.section`
  display: flex;
  align-items: center;
  gap: ${Sizes.pxAsRem.twelve};
  font-size: ${Sizes.pxAsRem.fourteen};
  font-weight: ${Sizes.fontWeights.medium};
`;

const CheckboxConfirmationText = styled.div`
  flex: 1;
`;

const LegalRedirect = styled(Link)`
  color: ${(props: ThemeProps) => props.theme.secondaryMain};
  font-weight: ${Sizes.fontWeights.semiBold};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.secondaryDark};
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  title: "Register" | "Log In";
  caption: string;
  toConfirmation: () => void;
};

export const AuthForm = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);
  const dispatch = useDispatch();
  const { auth } = useSelector((state: GlobalState) => state.errors);

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
    
  }, [auth.emailCheck, auth.usernameCheck, auth.general]);

  effect(() => {
    // ↓↓↓ Email error check ↓↓↓ //
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
    // ↓↓↓ Username error check ↓↓↓ //
    if (username.value !== "") {
      if (!Functions.checkIsLetter(username.value)) {
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
    // ↓↓↓ Password error check ↓↓↓ //
    if (props.title === "Register" && password.value !== "") {
      if (password.value.length < 12) {
        passwordError.value = "Too short.";
      } else {
        passwordError.value = "";
      }
    } else {
      passwordError.value = "";
    }
    // ↓↓↓ Confirm password error check ↓↓↓ //
    if (confirmPassword.value !== "") {
      if (confirmPassword.value !== password.value) {
        confirmPasswordError.value = "Passwords don't match.";
      } else {
        confirmPasswordError.value = "";
      }
    } else {
      confirmPasswordError.value = "";
    }
  });

  function checkLoginErrors(): boolean {
    return (
      email.value.length > 0 &&
      emailError.value === "" &&
      password.value.length > 0 &&
      passwordError.value === ""
    );
  }

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

  function _register(): void {
    const data: Types.RegistrationData = {
      email: email.value,
      username: username.value,
      password: password.value,
    };
    if (checkRegistrationErrors()) {
      console.log(data);
      dispatch(AuthActions.checkEmailAvailabilityRequest(email.value));
      dispatch(AuthActions.checkUsernameAvailabilityRequest(username.value));
      // dispatch(AuthActions.registerRequest(data));
      if (false) {
        // This conditional should only be `true` when the registration is successful and the user has been sent a verification code.
        // This might be feasible by first closing over the API return value and then doing a check with that.
        props.toConfirmation();
      }
    }
  }

  function _login(): void {
    const data = {
      email: email.value,
      password: password.value,
    };
    if (checkLoginErrors()) {
      console.log(data);
      if (false) {
        // This conditional should only be `true` when the registration is successful and the user has been sent a verification code.
        // This might be feasible by first closing over the API return value and then doing a check with that.
        props.toConfirmation();
      }
    }
  }

  function handleSubmit(event: Types.Submit): void {
    event.preventDefault();
    if (props.title === "Register") _register();
    else _login();
  }

  return (
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

      <Form onSubmit={handleSubmit}>
        <Inputs>
          {/* Email */}
          <Globals.Input
            borderRadius="four"
            title="Email"
            errorMessage={emailError.value}
            userInput={email.value}
            setUserInput={(event: Types.Input) =>
              (email.value = event.currentTarget.value)
            }
          />
          {/* Username */}
          {props.title === "Register" && (
            <Globals.Input
              borderRadius="four"
              title="Username"
              errorMessage={usernameError.value}
              userInput={username.value}
              setUserInput={(event: Types.Input) =>
                (username.value = event.currentTarget.value)
              }
            />
          )}
          {/* Password / Confirm Password */}
          <AuthFormPasswords
            isRegister={props.title === "Register"}
            password={password.value}
            setPassword={(userInput: string) => (password.value = userInput)}
            passwordError={passwordError.value}
            confirmPassword={confirmPassword.value}
            setConfirmPassword={(userInput: string) =>
              (confirmPassword.value = userInput)
            }
            confirmPasswordError={confirmPasswordError.value}
          />
        </Inputs>

        <CheckboxConfirmation>
          {checkboxActive.value ? (
            <IconContainer onClick={() => (checkboxActive.value = false)}>
              <Icons.CheckboxActive
                height={20}
                fill={Colors.secondary[ui.theme.value].main}
              />
            </IconContainer>
          ) : (
            <IconContainer onClick={() => (checkboxActive.value = true)}>
              <Icons.CheckboxInactive
                height={20}
                fill={Colors.text[ui.theme.value]}
              />
            </IconContainer>
          )}
          {props.title === "Register" ? (
            <CheckboxConfirmationText>
              I agree to the{" "}
              <LegalRedirect href="/terms" target="_blank">
                Terms Of Service
              </LegalRedirect>
              ,{" "}
              <LegalRedirect href="/privacy" target="_blank">
                Privacy Policy
              </LegalRedirect>
              , and{" "}
              <LegalRedirect href="/cookie" target="_blank">
                Cookie Policy
              </LegalRedirect>
            </CheckboxConfirmationText>
          ) : (
            <CheckboxConfirmationText>
              Stay logged in for 30 days on this device.
            </CheckboxConfirmationText>
          )}
        </CheckboxConfirmation>

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
  );
};
