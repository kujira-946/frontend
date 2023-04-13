import styled from "styled-components";
import { Signal } from "@preact/signals-react";
import { motion } from "framer-motion";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ParentProps = {
  fixed?: true;
};

const Parent = styled(motion.section)<ParentProps>`
  position: ${(props) => (props.fixed ? "fixed" : "absolute")};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Styles.zIndexes.deleteConfirmation};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${Styles.pxAsRem.sixteen};

  ${Styles.overlay};
`;

const Child = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${Styles.pxAsRem.sixteen};
  padding: ${Styles.pxAsRem.sixteen};
  background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
  border-radius: ${Styles.pxAsRem.four};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${Styles.pxAsRem.twenty};
  width: 100%;
`;

const Title = styled.h2`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.bold};
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
  open: Signal<boolean>;
  onClose: () => void;
  onConfirm: () => void;
  fixed?: true;
};

export const DeleteConfirmation = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;

  return (
    <Parent
      onClick={props.onClose}
      initial={Constants.staticFadeIn.initial}
      animate={Constants.staticFadeIn.animate}
      exit={Constants.staticFadeIn.exit}
      transition={Constants.staticFadeIn.transition}
    >
      <Child onClick={(event: Types.OnClick) => event.stopPropagation()}>
        <Header>
          <Title>{props.title}</Title>
          <DeleteButton type="button" onClick={props.onClose}>
            <Icons.Close
              height={12}
              fill={Styles.background[theme.value].six}
              hoveredFill={Styles.text[theme.value]}
              addHover
            />
          </DeleteButton>
        </Header>

        <Globals.PrimaryButton
          onClick={() => {
            props.onConfirm();
            props.open.value = false;
          }}
          size="medium"
          borderRadius="four"
        >
          Yes
        </Globals.PrimaryButton>
      </Child>
    </Parent>
  );
};
