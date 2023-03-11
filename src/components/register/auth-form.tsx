import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useContext } from "react";

import * as Globals from "@/components";
import * as Colors from "@/utils/colors";
import * as Sizes from "@/utils/sizes";
import * as Types from "@/utils/types";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "@/components/layout";
import { useSignal } from "@preact/signals-react";

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

  function handleSubmit(event: Types.Submit): void {
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
              href={props.title === "Register" ? "/register" : "/login"}
            >
              {props.title}
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
              userInput={username.value}
              setUserInput={(event: Types.Input) =>
                (username.value = event.currentTarget.value)
              }
            />
          )}
          {/* Password */}
          <Globals.Input
            borderRadius="four"
            title="Password"
            userInput={password.value}
            setUserInput={(event: Types.Input) =>
              (password.value = event.currentTarget.value)
            }
            password
          />
          {/* Confirm Password */}
          {props.title === "Register" && (
            <Globals.Input
              borderRadius="four"
              title="Confirm Password"
              userInput={confirmPassword.value}
              setUserInput={(event: Types.Input) =>
                (confirmPassword.value = event.currentTarget.value)
              }
              password
            />
          )}
        </Inputs>

        <Globals.Button
          type="submit"
          size="medium"
          borderRadius="six"
          background={Colors.primary[ui.theme.value].main}
          hoverBackground={Colors.primary[ui.theme.value].darker}
        >
          {props.title}
        </Globals.Button>
      </Form>
    </Container>
  );
};
