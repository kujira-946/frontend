import styled from "styled-components";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.header`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Styles.pxAsRem.sixteen};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

const NavigationPillsAndErrorMessage = styled.section`
  display: flex;
  flex-direction: column;
`;

const TotalSpent = styled.p`
  margin: 0 0 ${Styles.pxAsRem.four};
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const NavigationPills = styled.article`
  display: flex;
  gap: ${Styles.pxAsRem.eight};
  justify-content: flex-start;
  align-items: center;
`;

const ErrorMessage = styled.p`
  margin: ${Styles.pxAsRem.eight} 0 0;
  color: ${(props: ThemeProps) => props.theme.failure};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const Buttons = styled.section`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.twelve};
  margin-left: ${Styles.pxAsRem.twelve};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  errorMessage?: string;
  infoClick?: () => void;
  createClick?: () => void;
  createText?: string;
  children: React.ReactNode;
};

export const DashboardPageHeader = (props: Props) => {
  const { logbookTotalSpent } = Functions.useSignalsStore().dashboard;

  return (
    <Container>
      <NavigationPillsAndErrorMessage>
        <TotalSpent>
          Total Spent: ${Functions.formattedNumber(logbookTotalSpent.value)}
        </TotalSpent>

        <NavigationPills>{props.children}</NavigationPills>

        {props.errorMessage && (
          <ErrorMessage>{props.errorMessage}</ErrorMessage>
        )}
      </NavigationPillsAndErrorMessage>

      <Buttons>
        {props.infoClick && (
          <Globals.NeutralButtonOutlined
            size="medium"
            onClick={props.infoClick}
            compact
          >
            Info
          </Globals.NeutralButtonOutlined>
        )}
        {props.createClick && props.createText && (
          <Globals.PrimaryButton
            size="medium"
            onClick={props.createClick}
            compact
          >
            {props.createText}
          </Globals.PrimaryButton>
        )}
      </Buttons>
    </Container>
  );
};
