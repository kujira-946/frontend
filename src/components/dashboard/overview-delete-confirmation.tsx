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

const Parent = styled(motion.section)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Styles.zIndexes.overviewDeleteConfirmation};
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
  open: Signal<boolean>;
  onClose: () => void;
  onConfirm: () => void;
};

export const OverviewDeleteConfirmation = (props: Props) => {
  const { ui } = Functions.useSignalsStore();

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
          <Title>Delete all purchases for this group?</Title>
          <DeleteButton type="button" onClick={props.onClose}>
            <Icons.Close
              height={12}
              fill={Styles.background[ui.theme.value].six}
              hoveredFill={Styles.text[ui.theme.value]}
              addHover
            />
          </DeleteButton>
        </Header>

        <Globals.Button
          type="button"
          onClick={() => {
            props.onConfirm();
            props.open.value = false;
          }}
          size="medium"
          borderRadius="four"
          color={Styles.text[ui.theme.value]}
          background={Styles.primary[ui.theme.value].main}
          hoverBackground={Styles.primary[ui.theme.value].darker}
        >
          Yes
        </Globals.Button>
      </Child>
    </Parent>
  );
};
