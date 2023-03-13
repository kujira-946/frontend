import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useContext } from "react";

import * as Globals from "@/components";
import * as Colors from "@/utils/colors";
import * as Functions from "@/utils/functions";
import * as Sizes from "@/utils/sizes";
import * as Types from "@/utils/types";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "@/components/layout";
import { effect, useSignal } from "@preact/signals-react";

import { AuthFormPasswords } from "./auth-form-passwords";

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

  ${(props: ThemeProps) => props.theme.shadowOne};
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

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  title: "Register" | "Log In";
  caption: string;
};

export const AuthForm = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);

  const email = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");

  const emailError = useSignal("");
  const usernameError = useSignal("");

  effect(() => {
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
  });

  function handleSubmit(event: Types.Submit): void {
    event.preventDefault();
    if (props.title === "Register") {
      alert("Registered!");
    } else {
      alert("Logged In!");
    }
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
            confirmPassword={confirmPassword.value}
            setConfirmPassword={(userInput: string) =>
              (confirmPassword.value = userInput)
            }
          />
        </Inputs>

        <Globals.Button
          type="submit"
          size="medium"
          borderRadius="four"
          background={Colors.primary[ui.theme.value].main}
          hoverBackground={Colors.primary[ui.theme.value].darker}
        >
          {props.title}
        </Globals.Button>
      </Form>
    </Container>
  );
};
