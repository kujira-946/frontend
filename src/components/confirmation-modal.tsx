import styled from "styled-components";
import { useContext } from "react";
import { motion } from "framer-motion";

import * as Icons from "@/components/icons";
import * as Constants from "@/utils/constants";
import * as Styles from "@/utils/styles";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "./layout";
import { Button } from "./button";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type SharedProps = { overlay?: true };

const Parent = styled.div<SharedProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => {
    return props.overlay ? Styles.overlay : "transparent";
  }};
`;

const Child = styled(motion.main)<SharedProps>`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twelve};
  padding: ${Styles.pxAsRem.sixteen};
  width: 100%;
  max-width: 600px;
  border-radius: ${Styles.pxAsRem.six};

  ${(props: SharedProps & ThemeProps) => {
    return props.overlay ? props.theme.shadowOverlay : props.theme.shadowTwo;
  }};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const HeaderButton = styled.button`
  ${Styles.clearButton};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
    }
  }
`;

const Title = styled.h1`
  flex: 1;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const CornerText = styled.span`
  color: ${(props: ThemeProps) => props.theme.backgroundSeven};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.bold};
`;

const SupportingText = styled.p`
  color: ${(props: ThemeProps) => props.theme.secondaryMain};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.bold};
`;

const BodyText = styled.p`
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.regular};
`;

const ArrowIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  children?: React.ReactNode;
  overlay?: true;

  showBackButton?: boolean;
  backButtonAction?: () => void;
  title: string;
  cornerText: string;
  closeButtonAction?: () => void;

  supportingText?: string;

  bodyTexts?: string[];

  submitButtonAction: () => void;
  submitButtonText: string;
  disableSubmit?: boolean;
  showSubmitArrow?: true;
};

export const ConfirmationModal = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);

  return (
    <Parent overlay={props.overlay}>
      <Child
        initial={Constants.landingMotion.initial}
        animate={Constants.landingMotion.animate}
        transition={Constants.landingMotion.transition}
        overlay={props.overlay}
      >
        <Header>
          {props.showBackButton && props.backButtonAction && (
            <HeaderButton onClick={props.backButtonAction}>
              <Icons.ChevronLeft
                height={14}
                fill={Styles.background[ui.theme.value].eight}
              />
            </HeaderButton>
          )}
          <Title>{props.title}</Title>
          <CornerText>{props.cornerText}</CornerText>
          {props.closeButtonAction && (
            <HeaderButton onClick={props.closeButtonAction}>
              <Icons.Close
                height={14}
                fill={Styles.background[ui.theme.value].eight}
              />
            </HeaderButton>
          )}
        </Header>

        {props.supportingText && (
          <SupportingText>{props.supportingText}</SupportingText>
        )}

        {props.bodyTexts &&
          props.bodyTexts.map((text: string, index: number) => {
            return (
              <BodyText key={`confirmation-modal-${text}-${index}`}>
                {text}
              </BodyText>
            );
          })}

        {props.children}

        <Button
          disabled={props.disableSubmit}
          onClick={props.submitButtonAction}
          size="medium"
          borderRadius="four"
          background={Styles.primary[ui.theme.value].main}
          hoverBackground={Styles.primary[ui.theme.value].darker}
          style={{
            marginTop: Styles.pxAsRem.four,
            opacity: props.disableSubmit ? 0.5 : 1,
          }}
        >
          {props.submitButtonText}
          {props.showSubmitArrow && (
            <ArrowIconContainer>
              <Icons.ArrowRight height={12} fill={Styles.text.button} />
            </ArrowIconContainer>
          )}
        </Button>
      </Child>
    </Parent>
  );
};
