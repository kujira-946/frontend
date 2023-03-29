import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Signal, useSignal } from "@preact/signals-react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as Selectors from "@/utils/selectors";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
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
  const { auth } = Selectors.useErrorsSlice();

  const hidden = useSignal(true);

  return (
    <Container>
      {/* Email */}
      <Globals.Input
        borderRadius="four"
        title="Email"
        errorMessage={auth.includes("register") ? auth : props.emailError.value}
        userInput={props.email.value}
        setUserInput={(event: Types.Input) => {
          props.email.value = event.currentTarget.value;
          if (auth.length > 0) {
            dispatch(Redux.errorsActions.setAuth(""));
          }
        }}
      />

      {/* Password */}
      <Globals.Input
        borderRadius="four"
        title="Password"
        errorMessage={
          auth.includes("password") ? auth : props.passwordError.value
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