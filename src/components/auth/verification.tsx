import Image from "next/image";
import styled from "styled-components";
import { useContext } from "react";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Colors from "@/utils/colors";
import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import * as Types from "@/utils/types";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "@/components/layout";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${Sizes.pxAsRem.sixteen};
`;

const ResendButton = styled.button`
  ${Styles.clearButton};
  color: ${(props: ThemeProps) => props.theme.secondaryMain};
  font-weight: ${Sizes.fontWeights.semiBold};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.secondaryDark};
    }
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  title: "Verify Registration" | "Verify Login";
};

export const Verification = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);

  const verificationCode = useSignal("");
  const verificationCodeError = useSignal("");

  function resendVerificationCode(): void {
    console.log("RESEND CODE!");
  }

  function submitVerificationCode(event: Types.Submit): void {
    event.preventDefault();
    if (true) {
      // If the API returns an error, this part should be implemented.
      verificationCodeError.value = "Invalid code.";
    }
    console.log("Submitted verification code!");
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
          <Caption>A verification code was sent to your email.</Caption>
        </TitleAndCaption>
      </Header>

      <Form onSubmit={submitVerificationCode}>
        <Globals.Input
          borderRadius="four"
          title="Enter verification code"
          errorMessage={verificationCodeError.value}
          userInput={verificationCode.value}
          setUserInput={(event: Types.Input) =>
            (verificationCode.value = event.currentTarget.value)
          }
        />

        <Caption>
          Didn't receive a code?{" "}
          <ResendButton type="button" onClick={resendVerificationCode}>
            Resend Code
          </ResendButton>
        </Caption>

        <Globals.Button
          type="submit"
          size="medium"
          borderRadius="four"
          background={Colors.primary[ui.theme.value].main}
          hoverBackground={Colors.primary[ui.theme.value].darker}
          disabled={verificationCode.value === ""}
        >
          Confirm
        </Globals.Button>
      </Form>
    </Container>
  );
};
