import styled from "styled-components";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.nav`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Styles.pxAsRem.sixteen};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};

  border: red solid 1px;
`;

const NavigationPillsAndErrorMessage = styled.section`
  display: flex;
  flex-direction: column;
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
  margin-left: ${Styles.pxAsRem.twelve};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage;

  navigation?: Types.DashboardNavigation[];

  infoClick?: () => void;
  createClick?: () => void;
  createText?: string;
};

export const DashboardNavbar = (props: Props) => {
  console.log("Dashboard Navbar Rendered");

  return (
    <Container>
      <NavigationPillsAndErrorMessage>
        {props.navigation && (
          <NavigationPills>
            {props.navigation.map((navigation: Types.DashboardNavigation) => {
              const { text, onClick, selected } = navigation;

              return (
                <Globals.NeutralPillButton
                  key={text}
                  onClick={onClick}
                  size="smaller"
                  selected={selected}
                >
                  {text}
                </Globals.NeutralPillButton>
              );
            })}
          </NavigationPills>
        )}
        <ErrorMessage>Error Message</ErrorMessage>
      </NavigationPillsAndErrorMessage>

      <Buttons>
        {props.infoClick && (
          <Globals.NeutralButton
            size="medium"
            onClick={props.infoClick}
            compact
          >
            Info
          </Globals.NeutralButton>
        )}
        {props.createClick && props.createText && (
          <Globals.PrimaryButton
            size="medium"
            onClick={props.createClick}
            compact
          >
            Create {props.createText}
          </Globals.PrimaryButton>
        )}
      </Buttons>
    </Container>
  );
};
