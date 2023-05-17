import styled from "styled-components";
import { Signal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Redux from "@/redux";
import * as Selectors from "@/utils/functions/selectors";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { useAppDispatch } from "@/utils/functions/hooks";

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
  const dispatch = useAppDispatch();
  const { auth } = Selectors.useErrorsSlice();

  return (
    <Container>
      {/* Email */}
      <Globals.FormInput
        type="email"
        userInput={props.email.value}
        setUserInput={(event: Types.Input) => {
          props.email.value = event.currentTarget.value;
          if (auth.length > 0) {
            dispatch(Redux.errorsActions.setAuth(""));
          }
        }}
        placeholder="*Email"
        errorMessage={auth.includes("register") ? auth : props.emailError.value}
        borderRadius="six"
        required
      />

      {/* Password */}
      <Globals.FormInput
        type="password"
        userInput={props.password.value}
        setUserInput={(event: Types.Input) =>
          (props.password.value = event.currentTarget.value)
        }
        placeholder="*Password"
        errorMessage={
          auth.includes("password") ? auth : props.passwordError.value
        }
        borderRadius="six"
        required
      />
    </Container>
  );
};
