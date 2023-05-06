import styled from "styled-components";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { uiActions } from "@/redux";
import { ThemeProps } from "@/components/layout";
import { NotificationType } from "@/utils/types";
import { useRouter } from "next/router";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = { type: NotificationType };

const Container = styled(motion.main)<ContainerProps>`
  position: fixed;
  top: 20px;
  left: 50%;
  z-index: ${Styles.zIndexes.notification};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${Styles.pxAsRem.eight};
  width: 100%;
  max-width: 25rem;
  padding: ${Styles.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border: ${(props: ThemeProps & ContainerProps) => {
    return `${props.theme[props.type]} solid 2px`;
  }};
  border-radius: ${Styles.pxAsRem.eight};
  text-align: center;
  cursor: pointer;

  ${(props: ThemeProps) => props.theme.shadowThree};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${Styles.pxAsRem.eighteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const Body = styled.p`
  margin: 0;
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.medium};
`;

const Footnote = styled.p`
  margin: 0;
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.semiBold};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const Notification = () => {
  const dispatch = Functions.useAppDispatch();
  const router = useRouter();
  const { notification } = Functions.useUiSlice();

  useEffect(() => {
    if (notification.title) {
      if (notification.redirect) router.push(notification.redirect);

      const timer = setTimeout(() => {
        dispatch(uiActions.setNotification(Constants.initialUINotification));
      }, notification.timeout || 5000);
      return function cleanUp(): void {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  return (
    <AnimatePresence>
      {!!notification.title && (
        <Container
          onClick={() =>
            dispatch(uiActions.setNotification(Constants.initialUINotification))
          }
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
          type={notification.type || "pending"}
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
