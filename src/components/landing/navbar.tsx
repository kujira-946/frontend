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
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px 0px;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};

  ${Styles.setMediaPaddings(8)};
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
  width: ${Sizes.heights.smallButtonHeight};
  height: ${Sizes.heights.smallButtonHeight};
  background-color: inherit;
  border-radius: 6px;

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
    }
  }
`;

const LoginButton = styled(Link)`
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  font-size: ${Sizes.pxAsRem.twelve};
  font-weight: ${Sizes.fontWeights.medium};

  :hover {
    color: ${(props: ThemeProps) => props.theme.text};
  }
`;

const RegisterButton = styled(Link)`
  ${(props: ThemeProps) =>
    Styles.setButton(
      "small",
      props.theme.primaryMain,
      props.theme.primaryDark
    )};
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
        {theme === "light" ? (
          <Image
            src="/logo-full-horizontal-light.svg"
            alt="Logo"
            width={81.07}
            height={20}
          />
        ) : (
          <Image
            src="/logo-full-horizontal-dark.svg"
            alt="Logo"
            width={81.07}
            height={20}
          />
        )}

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
