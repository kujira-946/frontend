import styled from "styled-components";
import { useContext } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";

import * as Global from "@/components";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = {
  borderRadius?: Types.PxAsRem;
  opened: boolean;
};

const Container = styled.section<ContainerProps>`
  border: ${(props: ThemeProps & ContainerProps) => {
    return props.opened
      ? `${props.theme.backgroundSix} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  border-radius: ${(props) => props.borderRadius || Styles.pxAsRem.six};
  overflow: hidden;

  @media (hover: hover) {
    :hover {
      border: ${(props: ThemeProps) => {
        return `${props.theme.backgroundSix} solid 1px`;
      }};
    }
  }
`;

type HeaderProps = { opened: boolean };

const Header = styled.header<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps & HeaderProps) => {
    return props.opened
      ? `${props.theme.backgroundFour} solid 1px`
      : `transparent solid 1px`;
  }};
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
    }
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const Total = styled.h4`
  margin: 0;
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const Body = styled(motion.article)`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.eight};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
`;

const PurchaseCells = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  borderRadius?: Types.PxAsRem;
  title: string;
  total: number;
  children: React.ReactNode;
  addAction: () => void;
};

export const Dropdown = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);
  const opened = useSignal(true);

  return (
    <Container borderRadius={props.borderRadius} opened={opened.value}>
      <Header
        onClick={() => (opened.value = !opened.value)}
        opened={opened.value}
      >
        <Title>{props.title}</Title>
        <Total>${props.total}</Total>
      </Header>

      <AnimatePresence>
        {opened.value && (
          <Body
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, delay: 0 }}
          >
            <PurchaseCells>{props.children}</PurchaseCells>

            <Global.Button
              type="button"
              onClick={props.addAction}
              size="medium"
              borderRadius="four"
              background={Styles.background[ui.theme.value].three}
              hoverBackground={Styles.background[ui.theme.value].five}
            >
              Add
            </Global.Button>
          </Body>
        )}
      </AnimatePresence>
    </Container>
  );
};
