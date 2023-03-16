import styled from "styled-components";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import * as Sizes from "@/utils/sizes";
import { ThemeProps } from "@/components/layout";
import { useSelector } from "react-redux";
import { GlobalState } from "@/store";
import { useDispatch } from "react-redux";
import { uiActions } from "@/redux";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type Type = "pending" | "success" | "failure" | "warning";

const Container = styled(motion.main)`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${Sizes.zIndexes.notification};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${Sizes.pxAsRem.eight};
  padding: ${Sizes.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border: ${(props: ThemeProps & { type: Type }) => {
    return `${props.theme[props.type]} solid 2px`;
  }};
  border-radius: ${Sizes.pxAsRem.six};
  text-align: center;

  ${(props: ThemeProps) => props.theme.shadowThree};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${Sizes.pxAsRem.sixteen};
  font-weight: ${Sizes.fontWeights.bold};
`;

const Body = styled.p`
  margin: 0;
  font-size: ${Sizes.pxAsRem.fourteen};
  font-weight: ${Sizes.fontWeights.medium};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  title: string;
  type: Type;
  timeout?: number;
};

export const Notification = (props: Props) => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state: GlobalState) => state.ui);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(uiActions.setNotification(""));
    }, props.timeout || 5000);
    return function cleanUp(): void {
      clearTimeout(timer);
    };
  }, [dispatch, notification, props.timeout]);

  return (
    <AnimatePresence>
      {!!notification && (
        <Container
          initial={{ opacity: 0, transform: "translateY(-12px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={{ opacity: 0, transform: "translateY(-8px)" }}
          transition={{ duration: 0.3, delay: 0.4 }}
          type={props.type}
        >
          <Title>{props.title}</Title>
          <Body>{notification}</Body>
        </Container>
      )}
    </AnimatePresence>
  );
};
