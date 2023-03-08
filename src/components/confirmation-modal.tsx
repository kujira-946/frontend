import styled from "styled-components";
import { useContext } from "react";

import * as Icons from "@/components/icons";
import * as Colors from "@/utils/colors";
import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.main`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: ${Sizes.pxAsRem.twelve};
  padding: ${Sizes.pxAsRem.sixteen};
  width: 100%;
  max-width: 600px;
  border-radius: ${Sizes.pxAsRem.six};

  ${(props: ThemeProps) => props.theme.shadowOne};
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

const BodyText = styled.p`
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Sizes.pxAsRem.fourteen};
  font-weight: ${Sizes.fontWeights.medium};
`;

const SubmitButton = styled.button`
  ${(props: ThemeProps) => {
    return Styles.setButton(
      "medium",
      props.theme.primaryMain,
      props.theme.primaryDark,
      false,
      "four"
    );
  }};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  backButtonAction: () => void;
  title: string;
  currentPage: number;
  maxPage: number;
  bodyTexts?: string[];
  submitButtonAction: () => void;
  submitButtonText: string;
  showArrow?: true;
  children?: React.ReactNode;
};

export const ConfirmationModal = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);

  return (
    <Container>
      <Header>
        <BackButton onClick={props.backButtonAction}>
          <Icons.ChevronLeft
            height={14}
            fill={Colors.background[ui.theme.value].eight}
          />
        </BackButton>
        <Title>{props.title}</Title>
        <Page>
          {props.currentPage}/{props.maxPage}
        </Page>
      </Header>

      {props.bodyTexts &&
        props.bodyTexts.map((text: string, index: number) => {
          return (
            <BodyText key={`confirmation-modal-${text}-${index}`}>
              {text}
            </BodyText>
          );
        })}

      {props.children}

      <SubmitButton onClick={props.submitButtonAction}>
        {props.submitButtonText}
        {props.showArrow && (
          <Icons.ArrowRight height={12} fill={Colors.text.button} />
        )}
      </SubmitButton>
    </Container>
  );
};
