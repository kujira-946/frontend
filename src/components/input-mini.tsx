import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { memo, useRef } from "react";
import { useSignal } from "@preact/signals-react";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = {
  focused: boolean;
  hasValue: boolean;
  error: boolean;
  frozen?: boolean;
};

const Container = styled.article<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 0 ${Styles.pxAsRem.six};
  color: ${(props: ThemeProps) => props.theme.text};
  background-color: ${(props: ContainerProps & ThemeProps) => {
    return props.frozen
      ? "transparent"
      : props.hasValue
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
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.medium};
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

const ErrorMessage = styled.span`
  display: block;
  margin: ${Styles.pxAsRem.four} 0 0;
  color: ${(props: ThemeProps) => props.theme.failure};
  font-size: ${Styles.pxAsRem.ten};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const Body = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  display: block;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  height: 100%;
  padding: ${Styles.pxAsRem.four} 0;
  color: inherit;
  background-color: transparent;
  border: none;
  font-size: inherit;
  font-weight: inherit;
  outline: none;
  resize: none;
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
  placeholder: string;
  userInput: string;
  setUserInput: (event: Types.Input) => void;
  onBlur?: () => void;
  onFocus?: () => void;

  frontText?: string;
  backText?: string;
  hasValue?: boolean;
  frozen?: boolean;
};

const ExportedComponent = (props: Props) => {
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

  function preventEnterKey(event: Types.KeyPress): void {
    if (event.key === "Enter") event.preventDefault();
  }

  return (
    <Container
      focused={focused.value}
      hasValue={props.userInput !== ""}
      frozen={props.frozen}
      error={!!props.errorMessage}
      onClick={focusInputField}
      style={{
        borderRadius: props.borderRadius
          ? Styles.pxAsRem[props.borderRadius]
          : Styles.pxAsRem.six,
      }}
    >
      {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}

      <Body>
        {props.frontText && props.userInput !== "" && !props.errorMessage && (
          <Text>{props.frontText}</Text>
        )}

        <Textarea
          placeholder={props.placeholder}
          value={props.userInput}
          ref={inputFieldRef}
          onChange={props.setUserInput}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyPress={preventEnterKey}
          minRows={1}
          tabIndex={props.frozen ? -1 : 0}
        />

        {props.backText && props.userInput !== "" && !props.errorMessage && (
          <Text>{props.backText}</Text>
        )}
      </Body>
    </Container>
  );
};

export const InputMini = memo(ExportedComponent);
