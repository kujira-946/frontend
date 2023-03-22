import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Signal, useSignal } from "@preact/signals-react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as Sizes from "@/utils/styles.sizes";
import * as Types from "@/utils/types";
import { GlobalState } from "@/store";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Sizes.pxAsRem.four};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  email: Signal<string>;
  password: Signal<string>;

  emailError: Signal<string>;
  passwordError: Signal<string>;
};

export const LoginInputs = (props: Props) => {
  const dispatch = useDispatch();
  const { errors } = useSelector((state: GlobalState) => state);

  const hidden = useSignal(true);

  return (
    <Container>
      {/* Email */}
      <Globals.Input
        borderRadius="four"
        title="Email"
        errorMessage={
          errors.auth.includes("register")
            ? errors.auth
            : props.emailError.value
        }
        userInput={props.email.value}
        setUserInput={(event: Types.Input) => {
          props.email.value = event.currentTarget.value;
          if (errors.auth.length > 0) {
            dispatch(Redux.errorsActions.setAuth(""));
          }
        }}
      />

      {/* Password */}
      <Globals.Input
        borderRadius="four"
        title="Password"
        errorMessage={
          errors.auth.includes("password")
            ? errors.auth
            : props.passwordError.value
        }
        userInput={props.password.value}
        setUserInput={(event: Types.Input) =>
          (props.password.value = event.currentTarget.value)
        }
        hidden={hidden.value}
        toggleHidden={() => (hidden.value = !hidden.value)}
        password
      />
    </Container>
  );
};
