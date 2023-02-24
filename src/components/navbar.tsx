import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import * as Icons from "@/components/icons";
import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import * as Hooks from "@/utils/hooks";
import * as Redux from "@/redux";
import { ThemeProps } from "./layout";
import { navbarSignals } from "@/signals";
import { RootState } from "@/store";

const Nav = styled.nav`
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0px;
  width: 100%;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};

  ${Styles.setMediaPaddings(8)};

  border: blue solid 1px;
`;

const Main = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${Sizes.widths.content}px;
`;

const Links = styled.section`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const ThemeButton = styled.button`
  ${Styles.basicButtonStyles};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${Sizes.widths.smallButtonHeight};
  height: ${Sizes.widths.smallButtonHeight};
  background-color: inherit;
  border-radius: 4px;

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
    }
  }
`;

const LoginButton = styled(Link)`
  ${Styles.setText("twelve")};
`;

const RegisterButton = styled(Link)`
  ${Styles.setButton("primary", "small")};
`;

export const Navbar = () => {
  const dispatch = Hooks.useAppDispatch();
  const theme = Hooks.useAppSelector((state: RootState) => state.ui.theme);

  function toggleTheme(): void {
    if (theme === "light") dispatch(Redux.uiActions.setTheme("dark"));
    else dispatch(Redux.uiActions.setTheme("light"));
  }

  const { themeButtonHovered } = navbarSignals;

  return (
    <Nav>
      <Main>
        <Image
          src="/logo-full-horizontal.svg"
          alt="Logo"
          width={81.07}
          height={20}
        />
        <Links>
          <ThemeButton
            type="button"
            onClick={toggleTheme}
            onMouseEnter={() => (themeButtonHovered.value = true)}
            onMouseLeave={() => (themeButtonHovered.value = false)}
          >
            <Icons.IconModeDark hovered={themeButtonHovered.value} />
          </ThemeButton>
          <LoginButton href="/login">Log In</LoginButton>
          <RegisterButton href="/register">Register</RegisterButton>
        </Links>
      </Main>
    </Nav>
  );
};
