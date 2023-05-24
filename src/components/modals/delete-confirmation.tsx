import styled from "styled-components";
import { Signal } from "@preact/signals-react";
import { motion } from "framer-motion";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ParentProps = {
  fixed?: true;
};

const Parent = styled(motion.section)<ParentProps>`
  ${Styles.setMediaPaddings()};
  ${Styles.overlay};
  position: ${(props) => (props.fixed ? "fixed" : "absolute")};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Styles.zIndexes.confirmationModal};
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ChildProps = {
  borderRadius?: Types.PxAsRem;
};

const Child = styled.article<ChildProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${Styles.pxAsRem.twelve};
  width: 100%;
  max-width: 37.5rem;
  padding: ${Styles.pxAsRem.twenty};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-radius: ${Styles.pxAsRem.eight};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${Styles.pxAsRem.twelve};
  width: 100%;
`;

const Title = styled.h1`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.eighteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const Body = styled.p`
  width: 100%;
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.regular};
`;

const DeleteButton = styled.button`
  ${Styles.clearButton};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  title: string;
  body?: string;
  submitText?: string;
  open: Signal<boolean>;
  onConfirm: () => void;
  borderRadius?: Types.PxAsRem;
  fixed?: true;
};

export const DeleteConfirmation = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;

  return (
    <Globals.Portal>
      <Parent
        onClick={() => (props.open.value = false)}
        initial={Constants.staticFadeIn.initial}
        animate={Constants.staticFadeIn.animate}
        exit={Constants.staticFadeIn.exit}
        transition={Constants.staticFadeIn.transition}
      >
        <Child
          onClick={(event: Types.OnClick) => event.stopPropagation()}
          borderRadius={props.borderRadius}
        >
          <Header>
            <Title>{props.title}</Title>
            {theme.value && (
              <DeleteButton
                type="button"
                onClick={() => (props.open.value = false)}
              >
                <Icons.Close
                  height={16}
                  fill={Styles.background[theme.value].six}
                  hoveredFill={Styles.text[theme.value]}
                  addHover
                />
              </DeleteButton>
            )}
          </Header>

          {props.body && <Body>{props.body}</Body>}

          <Globals.Button
            type="submit"
            onClick={() => {
              props.onConfirm();
              props.open.value = false;
            }}
            size="large"
            borderRadius="six"
            primary
          >
            {props.submitText || "Yes"}
          </Globals.Button>
        </Child>
      </Parent>
    </Globals.Portal>
  );
};
