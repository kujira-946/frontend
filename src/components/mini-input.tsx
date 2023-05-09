import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { FocusEvent, useRef } from "react";
import { useSignal } from "@preact/signals-react";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type Type = "large" | "medium";

type ContainerProps = {
  type: Type;
  focused: boolean;
  hasContent: boolean;
  error: boolean;
  frozen?: boolean;
};

const Container = styled.section<ContainerProps>`
  ${Styles.transition};
  display: flex;
  flex: 1;
  align-items: flex-start;
  width: 100%;
  padding: ${(props) => {
    return props.frozen ? 0 : `${Styles.pxAsRem.four} ${Styles.pxAsRem.six}`;
  }};
  color: ${(props: ContainerProps & ThemeProps) => {
    return props.frozen ? props.theme.text : "inherit";
  }};
  background-color: ${(props: ContainerProps & ThemeProps) => {
    if (props.frozen) return "transparent";
    else if (props.hasContent) return props.theme.backgroundThree;
    else if (props.focused) return props.theme.backgroundFour;
    else if (props.type === "large") return props.theme.backgroundOne;
    else return props.theme.backgroundTwo;
  }};
  border: ${(props: ContainerProps & ThemeProps) => {
    if (props.error) {
      return `${props.theme.failure} solid 1px`;
    } else if (props.frozen) {
      return "transparent";
    } else if (props.hasContent) {
      return `${props.theme.backgroundThree} solid 1px`;
    } else if (props.focused) {
      return `${props.theme.backgroundSix} solid 1px`;
    } else if (props.type === "large") {
      return `${props.theme.backgroundFour} solid 1px`;
    } else {
      return `${props.theme.backgroundFive} solid 1px`;
    }
  }};
  border-radius: ${(props) => {
    return props.type === "large" ? Styles.pxAsRem.six : Styles.pxAsRem.four;
  }};
  font-size: ${(props) => {
    return props.type === "large"
      ? Styles.pxAsRem.sixteen
      : Styles.pxAsRem.fourteen;
  }};
  font-weight: ${(props) => {
    return props.type === "large"
      ? Styles.fontWeights.semiBold
      : Styles.fontWeights.regular;
  }};
  cursor: pointer;

  ${(props) => props.frozen && Styles.preventUserInteraction};

  :focus {
    background-color: ${(props: ContainerProps & ThemeProps) => {
      if (props.type === "large") return props.theme.backgroundTwo;
      else return props.theme.backgroundThree;
    }};
  }

  @media (hover: hover) {
    :hover {
      border: ${(props: ContainerProps & ThemeProps) => {
        if (props.error) return `${props.theme.failure} solid 1px`;
        else if (props.frozen) return "transparent";
        else return `${props.theme.backgroundSix} solid 1px`;
      }};
    }
  }
`;

const CostText = styled.span`
  font-size: inherit;
  font-weight: inherit;
  transform: translateY(-${Styles.pxAsRem.one});
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  height: 100% !important;
  color: ${(props: ThemeProps) => props.theme.text};
  background-color: transparent;
  border: none;
  border-radius: 0;
  font-size: inherit;
  font-weight: inherit;
  outline: none;
  resize: none;
  cursor: pointer;

  ::placeholder {
    color: ${(props: ThemeProps) => props.theme.backgroundEight};
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  userInput: string;
  setUserInput?: (event: Types.Input) => void;
  placeholder: string;
  error?: boolean;

  onFocus?: () => void;
  onBlur?: () => void;

  borderRadius?: Types.PxAsRem;
  type: Type;
  isCost?: boolean;
  frozen?: boolean;
};

export const MiniInput = (props: Props) => {
  const textareaRef = useRef<any>(null);
  const focused = useSignal(false);

  function focusInput(event: Types.OnClick): void {
    event.stopPropagation();
    textareaRef.current && textareaRef.current.focus();
    focused.value = true;
  }

  function textareaOnFocus(event: FocusEvent<HTMLTextAreaElement>): void {
    event.currentTarget.select();
    focused.value = true;
    if (props.onFocus) props.onFocus();
  }

  function textareaOnBlur(): void {
    focused.value = false;
    if (props.onBlur) props.onBlur();
  }

  function preventEnterPress(event: Types.KeyPress): void {
    if (event.key === "Enter") event.preventDefault();
  }

  return (
    <Container
      onClick={focusInput}
      type={props.type}
      focused={focused.value}
      hasContent={props.userInput.length > 0}
      error={!!props.error}
      frozen={props.frozen}
    >
      {props.isCost && props.userInput.length > 0 && <CostText>$</CostText>}
      <Textarea
        value={props.userInput}
        placeholder={props.placeholder}
        tabIndex={props.frozen ? -1 : 0}
        ref={textareaRef}
        onChange={props.setUserInput}
        onFocus={textareaOnFocus}
        onBlur={textareaOnBlur}
        onKeyPress={preventEnterPress}
      />
    </Container>
  );
};
