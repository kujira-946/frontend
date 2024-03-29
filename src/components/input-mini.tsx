import styled, { css } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { FocusEvent, memo, useRef } from "react";
import { useSignal } from "@preact/signals-react";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = {
  borderRadius?: Types.PxAsRem;
  focused: boolean;
  hasValue: boolean;
  error: boolean;
  frozen?: boolean;
  removeSidePadding?: boolean;
};

const Container = styled.article<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: ${(props) => {
    return !props.removeSidePadding ? `0 ${Styles.pxAsRem.six}` : `0 `;
  }};
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
      ? `transparent solid 1px`
      : props.focused
      ? `${props.theme.backgroundSix} solid 1px`
      : props.hasValue
      ? `${props.theme.backgroundTwo} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  border-radius: ${(props) => {
    return props.borderRadius
      ? Styles.pxAsRem[props.borderRadius]
      : Styles.pxAsRem.six;
  }};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.medium};
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      border: ${(props: ContainerProps & ThemeProps) => {
        if (!props.frozen) {
          return props.error
            ? `${props.theme.failure} solid 1px`
            : `${props.theme.backgroundSix} solid 1px`;
        }
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

type TextProps = {
  importance?: Types.InputMiniImportance;
};

const textStyles = css<TextProps>`
  color: ${(props: TextProps & ThemeProps) => {
    return props.importance === "Primary"
      ? props.theme.primaryMain
      : props.importance === "Secondary"
      ? props.theme.secondaryMain
      : props.importance === "Failure"
      ? props.theme.failure
      : props.importance === "Pending"
      ? props.theme.pending
      : "inherit";
  }};
  font-weight: ${(props) => {
    return props.importance === "Primary" ? Styles.fontWeights.bold : "inherit";
  }};
`;

const ForwardText = styled.span<TextProps>`
  ${textStyles};
  display: block;
`;

const Textarea = styled(TextareaAutosize)<TextProps>`
  ${textStyles};
  width: 100%;
  padding: ${Styles.pxAsRem.four} 0;
  background-color: transparent;
  border: none;
  font-size: inherit;
  outline: none;
  resize: none;
  cursor: pointer;

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

  forwardText?: string;
  importance?: Types.InputMiniImportance;
  hasValue?: boolean;
  frozen?: boolean;
  removeSidePadding?: boolean;
};

const ExportedComponent = (props: Props) => {
  const textareaRef = useRef<any>(null);
  const focused = useSignal(false);

  function focusTextarea(event: Types.OnClick): void {
    event.stopPropagation();
    textareaRef.current && textareaRef.current.focus();
    focused.value = true;
  }

  function onBlur(): void {
    focused.value = false;
    if (props.onBlur) props.onBlur();
  }

  function onFocus(event: FocusEvent<HTMLTextAreaElement>): void {
    event.currentTarget.select();
    focused.value = true;
    if (props.onFocus) props.onFocus();
  }

  function preventEnterKey(event: Types.KeyPress): void {
    if (event.key === "Enter") event.preventDefault();
  }

  return (
    <Container
      onClick={focusTextarea}
      borderRadius={props.borderRadius}
      focused={focused.value}
      hasValue={props.userInput !== ""}
      error={!!props.errorMessage}
      frozen={props.frozen}
      removeSidePadding={props.removeSidePadding}
    >
      {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}

      <Body>
        {props.forwardText && props.userInput !== "" && !props.errorMessage && (
          <ForwardText importance={props.importance}>
            {props.forwardText}
          </ForwardText>
        )}

        <Textarea
          placeholder={props.placeholder}
          value={props.userInput}
          tabIndex={props.frozen ? -1 : 0}
          ref={textareaRef}
          onChange={props.setUserInput}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyPress={preventEnterKey}
          importance={props.importance}
        />
      </Body>
    </Container>
  );
};

export const InputMini = memo(ExportedComponent);
