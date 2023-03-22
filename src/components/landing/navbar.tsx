import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useContext } from "react";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Colors from "@/utils/styles/styles.colors";
import * as Styles from "@/utils/styles.helpers";
import * as Sizes from "@/utils/styles.sizes";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "@/components/layout";
import { signalsHelpers } from "@/signals";

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
  ${Styles.clearButton};
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

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.text};
    }
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const Navbar = () => {
  const { ui } = useContext(SignalsStoreContext);
  const themeButtonHovered = useSignal(false);

  return (
    <Nav>
      <Main>
        {ui.theme.value === "light" ? (
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
            {ui.theme.value === "light" ? (
              <Icons.ThemeDark
                height={12}
                hovered={themeButtonHovered.value}
                fill={Colors.background[ui.theme.value].six}
                hoveredFill={Colors.background[ui.theme.value].eight}
              />
            ) : (
              <Icons.ThemeLight
                height={12}
                hovered={themeButtonHovered.value}
                fill={Colors.background[ui.theme.value].six}
                hoveredFill={Colors.background[ui.theme.value].eight}
              />
            )}
          </ThemeButton>

          <LoginButton href="/login">Log In</LoginButton>

          <Link href="/register">
            <Globals.Button
              size="small"
              background={Colors.primary[ui.theme.value].main}
              hoverBackground={Colors.primary[ui.theme.value].darker}
            >
              Register
            </Globals.Button>
          </Link>
        </Links>
      </Main>
    </Nav>
  );
};
