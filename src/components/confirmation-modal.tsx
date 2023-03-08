import styled from "styled-components";
import { useContext } from "react";
import { motion } from "framer-motion";

import * as Icons from "@/components/icons";
import * as Colors from "@/utils/colors";
import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import * as Constants from "@/utils/constants.landing";
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
    return props.overlay ? Colors.overlay : "transparent";
  }};
`;

const Child = styled(motion.main)<SharedProps>`
  display: flex;
  flex-direction: column;
  gap: ${Sizes.pxAsRem.twelve};
  padding: ${Sizes.pxAsRem.sixteen};
  width: 100%;
  max-width: 600px;
  border-radius: ${Sizes.pxAsRem.six};

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

const BackButton = styled.button`
  ${Styles.basicButtonStyles};
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
  font-size: ${Sizes.pxAsRem.sixteen};
  font-weight: ${Sizes.fontWeights.bold};
`;

const Page = styled.span`
  color: ${(props: ThemeProps) => props.theme.backgroundSeven};
  font-size: ${Sizes.pxAsRem.twelve};
  font-weight: ${Sizes.fontWeights.bold};
`;

const SupportingText = styled.p`
  color: ${(props: ThemeProps) => props.theme.secondaryMain};
  font-size: ${Sizes.pxAsRem.twelve};
  font-weight: ${Sizes.fontWeights.bold};
`;

const BodyText = styled.p`
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Sizes.pxAsRem.fourteen};
  font-weight: ${Sizes.fontWeights.regular};
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
  backButtonAction: () => void;
  supportingText?: string;
  title: string;
  currentPage: number;
  maxPage: number;
  bodyTexts?: string[];
  submitButtonAction: () => void;
  submitButtonText: string;
  showArrow?: true;
  overlay?: true;
  disableSubmit?: boolean;
  children?: React.ReactNode;
};

export const ConfirmationModal = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);
  const theme = ui.theme.value;

  return (
    <Parent overlay={props.overlay}>
      <Child
        initial={Constants.initial}
        animate={Constants.animate}
        transition={Constants.transition}
        overlay={props.overlay}
      >
        <Header>
          <BackButton onClick={props.backButtonAction}>
            <Icons.ChevronLeft
              height={14}
              fill={Colors.background[theme].eight}
            />
          </BackButton>
          <Title>{props.title}</Title>
          <Page>
            {props.currentPage}/{props.maxPage}
          </Page>
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
          color={Colors.primary[theme].main}
          hoverColor={Colors.primary[theme].darker}
          style={{
            marginTop: Sizes.pxAsRem.four,
            opacity: props.disableSubmit ? 0.5 : 1,
          }}
        >
          {props.submitButtonText}
          {props.showArrow && (
            <ArrowIconContainer>
              <Icons.ArrowRight height={12} fill={Colors.text.button} />
            </ArrowIconContainer>
          )}
        </Button>
      </Child>
    </Parent>
  );
};
