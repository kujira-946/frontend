import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";
import { useSignal } from "@preact/signals-react";
import { useRef } from "react";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = {
  focused: boolean;
  hasValue: boolean;
  error?: boolean;
  frozen?: boolean;
};

const Container = styled.article<ContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 ${Styles.pxAsRem.six};
  color: ${(props: ThemeProps) => props.theme.text};
  background-color: ${(props: ContainerProps & ThemeProps) => {
    return props.hasValue
      ? props.theme.backgroundTwo
      : props.theme.backgroundOne;
  }};
  border: ${(props: ContainerProps & ThemeProps) => {
    return props.error
      ? `${props.theme.failure} solid 1px`
      : props.frozen
      ? `${props.theme.backgroundOne} solid 1px`
      : props.focused
      ? `${props.theme.backgroundSix} solid 1px`
      : props.hasValue
      ? `${props.theme.backgroundTwo} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  cursor: ${(props) => (props.focused ? "default" : "pointer")};

  @media (hover: hover) {
    :hover {
      border: ${(props: ContainerProps & ThemeProps) => {
        return !props.frozen && `${props.theme.backgroundSix} solid 1px`;
      }};
    }
  }

  ${(props) => props.frozen && Styles.preventUserInteraction};
`;

const ForwardText = styled.span`
  display: block;
`;

type InputProps = { error?: boolean };

const Input = styled.input<InputProps>`
  width: 100%;
  padding: ${Styles.pxAsRem.four} 0;
  color: inherit;
  background-color: transparent;
  border: none;
  font-size: inherit;
  font-weight: inherit;
  outline: none;
  cursor: text;

  ::placeholder {
    ${(props: ThemeProps) => props.theme.backgroundSeven};
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  borderRadius?: Types.PxAsRem;

  errorMessage?: string;
  forwardText?: string;
  placeholder: string;
  userInput: string;
  setUserInput: (event: Types.Input) => void;
  onBlur?: () => void;
  onFocus?: () => void;

  hasValue?: boolean;
  frozen?: boolean;
};

export const InputMini = (props: Props) => {
  const inputFieldRef = useRef<any>(null);
  const focused = useSignal(false);

  function focusInputField(): void {
    inputFieldRef.current && inputFieldRef.current.focus();
    focused.value = true;
  }

  function onBlur(): void {
    focused.value = false;
    if (props.onBlur) props.onBlur();
  }

  function onFocus(): void {
    focused.value = true;
    if (props.onFocus) props.onFocus();
  }

  return (
    <Container
      focused={focused.value}
      hasValue={props.userInput !== ""}
      frozen={props.frozen}
      error={!!props.errorMessage}
      onClick={focusInputField}
      style={{ borderRadius: props.borderRadius || Styles.pxAsRem.six }}
    >
      {props.forwardText && <ForwardText>{props.forwardText}</ForwardText>}

      <Input
        placeholder={props.placeholder}
        value={props.userInput}
        ref={inputFieldRef}
        onChange={props.setUserInput}
        onBlur={onBlur}
        onFocus={onFocus}
        error={!!props.errorMessage}
      />
    </Container>
  );
};
