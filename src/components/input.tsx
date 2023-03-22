import styled from "styled-components";
import { useContext, useRef } from "react";
import { useSignal } from "@preact/signals-react";
import { motion } from "framer-motion";

import * as Icons from "@/components/icons";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type SharedProps = { focused: boolean };

const Container = styled.section<SharedProps>`
  width: 100%;
  padding: ${Styles.pxAsRem.twelve};
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
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      border: ${(props: ThemeProps) => props.theme.backgroundSix} solid 1px;
    }
  }
`;

const Title = styled(motion.span)`
  display: block;
  margin-bottom: ${Styles.pxAsRem.four};
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  font-size: ${Styles.pxAsRem.ten};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const ErrorMessage = styled(motion.span)`
  display: block;
  margin-bottom: ${Styles.pxAsRem.four};
  color: ${(props: ThemeProps) => props.theme.failure};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const InputFieldAndIcon = styled.div`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.twelve};
`;

const InputField = styled.input<SharedProps>`
  flex: 1;
  width: 100%;
  color: ${(props: ThemeProps) => props.theme.text};
  background-color: transparent;
  border: none;
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.medium};
  outline: none;
  cursor: text;

  ${(props) => !props.focused && Styles.preventUserInteraction};

  ::placeholder {
    color: ${(props: ThemeProps) => props.theme.backgroundSeven};
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  borderRadius?: Types.PxAsRem;

  title: string;
  errorMessage?: string;

  userInput: string;
  setUserInput: (event: Types.Input) => void;

  hidden?: boolean;
  toggleHidden?: () => void;
  password?: true;
};

export const Input = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);

  const inputFieldRef = useRef<any>(null);
  const focused = useSignal(false);
  const hiddenHovered = useSignal(false);

  function focusInputField(): void {
    inputFieldRef.current && inputFieldRef.current.focus();
    focused.value = true;
  }

  return (
    <Container
      style={{
        borderRadius: props.borderRadius
          ? Styles.pxAsRem[props.borderRadius]
          : Styles.pxAsRem.six,
      }}
      onClick={focusInputField}
      focused={focused.value}
    >
      {props.userInput.length > 0 && (
        <Title initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {props.title}
        </Title>
      )}

      {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}

      <InputFieldAndIcon>
        <InputField
          type={props.hidden ? "password" : "text"}
          value={props.userInput}
          placeholder={props.title}
          ref={inputFieldRef}
          onChange={props.setUserInput}
          onBlur={() => (focused.value = false)}
          onFocus={() => (focused.value = true)}
          focused={focused.value}
        />
        {props.password &&
          (props.hidden ? (
            <IconContainer
              onClick={props.toggleHidden}
              onMouseEnter={() => (hiddenHovered.value = true)}
              onMouseLeave={() => (hiddenHovered.value = false)}
            >
              <Icons.Hidden
                height={16}
                fill={Styles.background[ui.theme.value].eight}
                hovered={hiddenHovered.value}
                hoveredFill={Styles.text[ui.theme.value]}
              />
            </IconContainer>
          ) : (
            <IconContainer
              onClick={props.toggleHidden}
              onMouseEnter={() => (hiddenHovered.value = true)}
              onMouseLeave={() => (hiddenHovered.value = false)}
            >
              <Icons.Revealed
                height={16}
                fill={Styles.background[ui.theme.value].eight}
                hovered={hiddenHovered.value}
                hoveredFill={Styles.text[ui.theme.value]}
              />
            </IconContainer>
          ))}
      </InputFieldAndIcon>
    </Container>
  );
};
