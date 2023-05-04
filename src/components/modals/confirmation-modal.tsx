import styled from "styled-components";
import { motion } from "framer-motion";

import * as Icons from "@/components/icons";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

import { Button, IconButton } from "../buttons";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type SharedProps = { overlay?: true };

const Parent = styled.main<SharedProps>`
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

  ${Styles.setMediaPaddings()};
`;

const Child = styled(motion.form)<SharedProps>`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twelve};
  padding: ${Styles.pxAsRem.twenty};
  width: 100%;
  max-width: 600px;
  border-radius: ${Styles.pxAsRem.eight};

  ${(props: SharedProps & ThemeProps) => {
    return props.overlay ? props.theme.shadowOverlay : props.theme.shadowOne;
  }};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.twenty};
`;

const HeaderTitle = styled.h1`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.bold};
  width: 100%;
`;

const HeaderSupportingText = styled.span`
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const Body = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
  font-size: ${Styles.pxAsRem.fourteen};
`;

const BodySupportingText = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.primaryMain};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const BodyText = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-weight: ${Styles.fontWeights.regular};
`;

const SubmitButton = styled(Button)`
  svg {
    ${Styles.transition};
  }

  @media (hover: hover) {
    :hover {
      svg {
        transform: translateX(${Styles.pxAsRem.four});
      }
    }
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  children?: React.ReactNode;
  overlay?: true;

  showBackButton?: boolean;
  backButtonAction?: () => void;

  headerTitle: string;
  headerSupportingText?: string;
  bodySupportingText?: string;
  bodyText: string[];

  submitButtonText: string;
  submitAction: () => void;
  closeAction?: () => void;

  disableSubmit: boolean;
  showSubmitArrow?: true;
};

export const ConfirmationModal = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;

  function submit(event: Types.Submit) {
    event.preventDefault();
    props.submitAction();
  }

  return (
    <Parent overlay={props.overlay}>
      <Child
        onSubmit={submit}
        initial={Constants.landingMotion.initial}
        animate={Constants.landingMotion.animate}
        transition={Constants.landingMotion.transition}
        overlay={props.overlay}
      >
        <Header>
          {props.showBackButton && props.backButtonAction && theme.value && (
            <IconButton
              type="button"
              onClick={props.backButtonAction}
              borderRadius="six"
            >
              <Icons.ChevronLeft
                width={16}
                height={16}
                fill={Styles.background[theme.value].eight}
                addHover
              />
            </IconButton>
          )}
          <HeaderTitle>{props.headerTitle}</HeaderTitle>
          {props.headerSupportingText && (
            <HeaderSupportingText>
              {props.headerSupportingText}
            </HeaderSupportingText>
          )}
          {props.closeAction && theme.value && (
            <button type="button" onClick={props.closeAction}>
              <Icons.Close
                width={14}
                height={14}
                fill={Styles.background[theme.value].eight}
                hoveredFill={Styles.text[theme.value]}
                addHover
              />
            </button>
          )}
        </Header>

        <Body>
          {props.bodySupportingText && (
            <BodySupportingText>{props.bodySupportingText}</BodySupportingText>
          )}
          {props.bodyText.map((text: string, index: number) => {
            return (
              <BodyText key={`confirmation-modal-body-text-${text}-${index}`}>
                {text}
              </BodyText>
            );
          })}
        </Body>

        {props.children}

        <SubmitButton
          type="submit"
          size="large"
          disabled={props.disableSubmit}
          borderRadius="six"
          primary
        >
          {props.submitButtonText}
          {props.showSubmitArrow && (
            <Icons.ArrowRight
              width={16}
              height={16}
              fill={Styles.text.button}
            />
          )}
        </SubmitButton>
      </Child>
    </Parent>
  );
};
