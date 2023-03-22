import Image from "next/image";
import styled from "styled-components";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { effect, useSignal } from "@preact/signals-react";

import * as AuthActions from "@/sagas/auth.saga";
import * as Globals from "@/components";
import * as Colors from "@/utils/styles/colors";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { SignalsStoreContext } from "@/pages/_app";
import { GlobalState } from "@/store";
import { ThemeProps } from "@/components/layout";
import { useRouter } from "next/router";

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

const Caption = styled.p`
  margin: 0;
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.medium};
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${Styles.pxAsRem.sixteen};
`;

const ResendButton = styled.button`
  ${Styles.clearButton};
  color: ${(props: ThemeProps) => props.theme.secondaryMain};
  font-weight: ${Styles.fontWeights.semiBold};

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
  const dispatch = useDispatch();
  const { ui } = useContext(SignalsStoreContext);
  const { errors } = useSelector((state: GlobalState) => state);
  const { tempUserId, loginForThirtyDays } = useSelector(
    (state: GlobalState) => state.ui
  );

  const verificationCode = useSignal("");
  const verificationCodeError = useSignal("");

  function resendVerificationCode(): void {
    if (tempUserId) {
      dispatch(AuthActions.requestNewVerificationCodeRequest(tempUserId));
    } else {
      effect(
        () =>
          (verificationCodeError.value =
            "There was an error. Please try logging in again.")
      );
    }
  }

  const router = useRouter();
  function submitVerificationCode(event: Types.Submit): void {
    event.preventDefault();
    if (errors.auth) {
      verificationCodeError.value = errors.auth;
    } else if (!tempUserId) {
      verificationCodeError.value =
        "There was an error locating the account. Please try logging in.";
    } else {
      if (props.title === "Verify Registration") {
        dispatch(
          AuthActions.verifyRegistrationRequest(
            tempUserId,
            verificationCode.value
          )
        );
      } else {
        dispatch(
          AuthActions.verifyLoginRequest(
            tempUserId,
            verificationCode.value,
            loginForThirtyDays
          )
        );
        if (user) router.push("/dashboard/logbooks");
      }
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
          {"Didn't receive a code? "}
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
