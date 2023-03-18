import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import * as Constants from "@/utils/constants.globals";
import * as Sizes from "@/utils/sizes";
import { GlobalState } from "@/store";
import { uiActions } from "@/redux";
import { ThemeProps } from "@/components/layout";
import { NotificationType } from "@/utils/types";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled(motion.main)`
  position: fixed;
  top: 20px;
  left: 50%;
  z-index: ${Sizes.zIndexes.notification};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${Sizes.pxAsRem.eight};
  width: 100%;
  max-width: 25rem;
  padding: ${Sizes.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border: ${(props: ThemeProps & { type: NotificationType }) => {
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

const Footnote = styled.p`
  margin: 0;
  font-size: ${Sizes.pxAsRem.ten};
  font-weight: ${Sizes.fontWeights.semiBold};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const Notification = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state: GlobalState) => state.ui);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(uiActions.setNotification(Constants.initialUINotification));
    }, notification.timeout || 5000);
    return function cleanUp(): void {
      clearTimeout(timer);
    };
  }, [dispatch, notification]);

  return (
    <AnimatePresence>
      {!!notification.title && (
        <Container
          initial={{
            opacity: 0,
            transform: "translateX(-50%) translateY(-12px)",
          }}
          animate={{
            opacity: 1,
            transform: "translateX(-50%) translateY(0px)",
          }}
          exit={{ opacity: 0, transform: "translateX(-50%) translateY(-8px)" }}
          transition={{ duration: 0.3, delay: 0.4 }}
          type={notification.type}
        >
          <Title>{notification.title}</Title>
          <Body>{notification.body}</Body>
          {notification.footnote && (
            <Footnote>{notification.footnote}</Footnote>
          )}
        </Container>
      )}
    </AnimatePresence>
  );
};
