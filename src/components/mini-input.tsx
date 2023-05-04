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
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 ${Styles.pxAsRem.six};
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

type TextareaProps = { type: Type };

const Textarea = styled(TextareaAutosize)<TextareaProps>`
  width: 100%;
  padding: ${Styles.pxAsRem.four} 0;
  color: ${(props: ThemeProps) => props.theme.text};
  background-color: transparent;
  border: none;
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
  frozen?: boolean;
  isCost?: boolean;
};

export const MiniInput = (props: Props) => {
  const textareaRef = useRef<any>(null);
  const focused = useSignal(false);

  function preventEnterPress(event: Types.KeyPress): void {
    if (event.key === "Enter") event.preventDefault();
  }

  return (
    <Container
      onClick={(event: Types.OnClick): void => {
        event.stopPropagation();
        textareaRef.current && textareaRef.current.focus();
        focused.value = true;
      }}
      type={props.type}
      focused={focused.value}
      hasContent={props.userInput.length > 0}
      error={!!props.error}
      frozen={props.frozen}
    >
      {props.isCost && props.userInput.length > 0 && "$"}
      <Textarea
        value={props.userInput}
        placeholder={props.placeholder}
        tabIndex={props.frozen ? -1 : 0}
        ref={textareaRef}
        onChange={props.setUserInput}
        onFocus={(event: FocusEvent<HTMLTextAreaElement>) => {
          event.currentTarget.select();
          focused.value = true;
          if (props.onFocus) props.onFocus();
        }}
        onBlur={() => {
          focused.value = false;
          if (props.onBlur) props.onBlur();
        }}
        onKeyPress={preventEnterPress}
        type={props.type}
        style={{
          borderRadius: props.borderRadius
            ? Styles.pxAsRem[props.borderRadius]
            : Styles.pxAsRem.eight,
        }}
      />
    </Container>
  );
};
