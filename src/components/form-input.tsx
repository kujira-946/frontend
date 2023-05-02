import styled from "styled-components";
import { useRef } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = {
  focused: boolean;
  error: boolean;
};

const Container = styled.section<ContainerProps>`
  ${Styles.transition};
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
  padding: ${Styles.pxAsRem.twelve};
  background-color: ${(props: ContainerProps & ThemeProps) => {
    return props.focused
      ? props.theme.backgroundTwo
      : props.theme.backgroundOne;
  }};
  border: ${(props: ContainerProps & ThemeProps) => {
    return props.error
      ? `${props.theme.failure} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      border: ${(props: ContainerProps & ThemeProps) => {
        return props.error
          ? `${props.theme.failure} solid 1px`
          : `${props.theme.backgroundSix} solid 1px`;
      }};
    }
  }
`;

const Title = styled(motion.span)`
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const ErrorMessage = styled(motion.p)`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.failure};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.twelve};
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.medium};
`;

const Input = styled.input`
  width: 100%;
  color: inherit;
  background-color: transparent;
  border: none;
  font-size: inherit;
  font-weight: inherit;
  outline: none;
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
  setUserInput: (event: Types.Input) => void;
  placeholder: string;
  errorMessage: string;

  onBlur?: () => void;
  onFocus?: () => void;

  borderRadius: Types.PxAsRem;
  isCost?: true;
  isPassword?: true;
};

export const FormInput = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;

  const inputRef = useRef<any>(null);
  const show = useSignal(false);
  const focused = useSignal(false);

  return (
    <Container
      onClick={(): void => {
        inputRef.current && inputRef.current.focus();
        focused.value = true;
      }}
      focused={focused.value}
      error={!!props.errorMessage}
      style={{
        borderRadius: props.borderRadius
          ? Styles.pxAsRem[props.borderRadius]
          : Styles.pxAsRem.eight,
      }}
    >
      <AnimatePresence>
        {props.userInput && (
          <Title
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0, delay: 0 }}
          >
            {props.placeholder}
          </Title>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {props.errorMessage && (
          <ErrorMessage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0, delay: 0 }}
          >
            {props.errorMessage}
          </ErrorMessage>
        )}
      </AnimatePresence>

      <Body>
        <InputContainer>
          {props.isCost && props.userInput.length > 0 && "$"}
          <Input
            ref={inputRef}
            type={
              props.isPassword ? (show.value ? "text" : "password") : "text"
            }
            value={props.userInput}
            placeholder={props.placeholder}
            onChange={props.setUserInput}
            onBlur={(): void => {
              focused.value = false;
              if (props.onBlur) props.onBlur();
            }}
            onFocus={(): void => {
              focused.value = true;
              if (props.onFocus) props.onFocus();
            }}
          />
        </InputContainer>

        {props.isPassword &&
          theme.value &&
          (show.value ? (
            <Globals.IconContainer onClick={() => (show.value = false)}>
              <Icons.Revealed
                width={16}
                height={16}
                fill={Styles.background[theme.value].eight}
                hoveredFill={Styles.text[theme.value]}
                addHover
              />
            </Globals.IconContainer>
          ) : (
            <Globals.IconContainer onClick={() => (show.value = true)}>
              <Icons.Hidden
                width={16}
                height={16}
                fill={Styles.background[theme.value].eight}
                hoveredFill={Styles.text[theme.value]}
                addHover
              />
            </Globals.IconContainer>
          ))}
      </Body>
    </Container>
  );
};
