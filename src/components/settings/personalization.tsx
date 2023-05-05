import styled from "styled-components";

import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { updateUserRequest } from "@/sagas/users.saga";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  width: 100%;
`;

type ThemeButtonProps = {
  selected: boolean;
};

const ThemeButton = styled.button<ThemeButtonProps>`
  ${Styles.clearButton};
  ${Styles.transition};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${Styles.pxAsRem.fortyFour};
  color: ${(props: ThemeButtonProps & ThemeProps) => {
    if (props.selected) return props.theme.text;
    else return props.theme.backgroundSix;
  }};
  background-color: ${(props: ThemeButtonProps & ThemeProps) => {
    if (props.selected) return props.theme.backgroundFour;
    else return "transparent";
  }};
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  border-radius: ${Styles.pxAsRem.six};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.semiBold};
  cursor: pointer;

  ${(props) => props.disabled && Styles.preventUserInteraction};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.text};
      border: ${(props: ThemeButtonProps & ThemeProps) => {
        if (props.selected) return `${props.theme.backgroundFour} solid 1px`;
        else return `${props.theme.backgroundSix} solid 1px`;
      }};
    }
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const Personalization = () => {
  const dispatch = Functions.useAppDispatch();

  const { theme } = Functions.useSignalsStore().ui;
  const { currentUser } = Functions.useEntitiesSlice();

  function setThemeLight(): void {
    if (currentUser) {
      theme.value = "light";
      dispatch(updateUserRequest(currentUser.id, { theme: "light" }));
    }
  }

  function setThemeDark(): void {
    if (currentUser) {
      theme.value = "dark";
      dispatch(updateUserRequest(currentUser.id, { theme: "dark" }));
    }
  }

  return (
    <Container>
      <ThemeButton onClick={setThemeLight} selected={theme.value === "light"}>
        Light
      </ThemeButton>

      <ThemeButton onClick={setThemeDark} selected={theme.value === "dark"}>
        Dark
      </ThemeButton>
    </Container>
  );
};
