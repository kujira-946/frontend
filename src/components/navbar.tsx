import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useSignal } from "@preact/signals-react";
import { useContext } from "react";

import * as Icons from "@/components/icons";
import * as Styles from "@/utils/styles";
import * as Colors from "@/utils/colors";
import * as Sizes from "@/utils/sizes";
import { SignalsStoreContext } from "@/pages/_app";
import { signalsHelpers } from "@/signals";
import { IconProps } from "@/utils/types";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

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
  ${Styles.setText("twelve", "medium")};
`;

const RegisterButton = styled(Link)`
  ${Styles.setButton("primary", "small")};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const Navbar = () => {
  const { ui } = useContext(SignalsStoreContext);
  const themeButtonHovered = useSignal(false);

  const theme = ui.theme.value;

  return (
    <Nav>
      <Main>
        <Image
          src={
            theme === "light"
              ? "/logo-full-horizontal-light.svg"
              : "/logo-full-horizontal-dark.svg"
          }
          alt="Logo"
          width={81.07}
          height={20}
        />
        <Links>
          <ThemeButton
            type="button"
            onClick={signalsHelpers.ui.toggleTheme}
            onMouseEnter={() => (themeButtonHovered.value = true)}
            onMouseLeave={() => (themeButtonHovered.value = false)}
          >
            {theme === "light" ? (
              <Icons.ThemeDark
                height={12}
                hovered={themeButtonHovered.value}
                fill={Colors.background[theme].six}
                hoveredFill={Colors.background[theme].eight}
              />
            ) : (
              <Icons.ThemeLight
                height={12}
                hovered={themeButtonHovered.value}
                fill={Colors.background[theme].six}
                hoveredFill={Colors.background[theme].eight}
              />
            )}
          </ThemeButton>
          <LoginButton href="/login">Log In</LoginButton>
          <RegisterButton href="/register">Register</RegisterButton>
        </Links>
      </Main>
    </Nav>
  );
};
