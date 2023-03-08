import * as React from "react";
import styled from "styled-components";
import { useSignal } from "@preact/signals-react";
import { motion } from "framer-motion";

import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type SharedProps = { focused: boolean };

const Container = styled.section<SharedProps>`
  background-color: ${(props: SharedProps & ThemeProps) => {
    return props.focused
      ? props.theme.backgroundTwo
      : props.theme.backgroundOne;
  }};
  border: ${(props: SharedProps & ThemeProps) => {
    return props.focused
      ? `${props.theme.backgroundSix} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  padding: ${Sizes.pxAsRem.twelve};
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      border: ${(props: ThemeProps) => props.theme.backgroundSix} solid 1px;
    }
  }
`;

const Title = styled(motion.span)`
  display: block;
  margin-bottom: ${Sizes.pxAsRem.four};
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  font-size: ${Sizes.pxAsRem.ten};
  font-weight: ${Sizes.fontWeights.semiBold};
`;

const ErrorMessage = styled(motion.span)`
  display: block;
  margin-bottom: ${Sizes.pxAsRem.four};
  color: ${(props: ThemeProps) => props.theme.failure};
  font-size: ${Sizes.pxAsRem.twelve};
  font-weight: ${Sizes.fontWeights.semiBold};
`;

const InputField = styled.input<SharedProps>`
  width: 100%;
  color: ${(props: ThemeProps) => props.theme.text};
  background-color: transparent;
  border: none;
  font-size: ${Sizes.pxAsRem.fourteen};
  font-weight: ${Sizes.fontWeights.medium};
  outline: none;
  cursor: text;

  ${(props) => !props.focused && Styles.preventUserInteraction};

  ::placeholder {
    color: ${(props: ThemeProps) => props.theme.backgroundSeven};
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  borderRadius?: Types.PxAsRem;
  title: string;
  userInput: string;
  setUserInput: (event: Types.Input) => void;
  errorMessage?: string;
};

export const Input = (props: Props) => {
  const inputFieldRef = React.useRef<any>(null);
  const focused = useSignal(false);

  function focusInputField(): void {
    inputFieldRef.current && inputFieldRef.current.focus();
    focused.value = true;
  }

  return (
    <Container
      style={{ borderRadius: props.borderRadius || Sizes.pxAsRem.six }}
      onClick={focusInputField}
      focused={focused.value}
    >
      {props.userInput.length > 0 && (
        <Title initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {props.title}
        </Title>
      )}

      {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}

      <InputField
        value={props.userInput}
        placeholder={props.title}
        ref={inputFieldRef}
        onChange={props.setUserInput}
        onBlur={() => (focused.value = false)}
        focused={focused.value}
      />
    </Container>
  );
};
