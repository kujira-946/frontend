import styled from "styled-components";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";
import { updateUserRequest } from "@/sagas/users.saga";

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

const ThemeButton = styled(Globals.Button)<ThemeButtonProps>`
  color: ${(props: ThemeButtonProps & ThemeProps) => {
    if (props.selected) return props.theme.text;
    else return props.theme.backgroundEight;
  }};
  background-color: ${(props: ThemeButtonProps & ThemeProps) => {
    if (props.selected) return props.theme.backgroundFour;
    else return "transparent";
  }};
  border: ${(props: ThemeButtonProps & ThemeProps) => {
    return props.selected
      ? `${props.theme.backgroundFour} solid 1px`
      : `${props.theme.backgroundEight} solid 1px`;
  }};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.text};
      background-color: ${(props: ThemeButtonProps & ThemeProps) => {
        if (props.selected) return props.theme.backgroundFour;
        else return "transparent";
      }};
      border: ${(props: ThemeButtonProps & ThemeProps) => {
        if (props.selected) return `${props.theme.backgroundFour} solid 1px`;
        else return `${props.theme.backgroundNine} solid 1px`;
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
      <ThemeButton
        type="button"
        onClick={setThemeLight}
        size="large"
        selected={theme.value === "light"}
        outlined
      >
        Light
      </ThemeButton>

      <ThemeButton
        type="button"
        onClick={setThemeDark}
        size="large"
        selected={theme.value === "dark"}
        outlined
      >
        Dark
      </ThemeButton>
    </Container>
  );
};
