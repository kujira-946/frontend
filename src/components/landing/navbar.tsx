import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
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
  max-width: ${Styles.widths.content}px;
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
  width: ${Styles.heights.smallButtonHeight};
  height: ${Styles.heights.smallButtonHeight};
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
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.medium};

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
  const { theme } = Functions.useSignalsStore().ui;

  function toggleTheme(): void {
    if (theme.value === "light") theme.value = "dark";
    else theme.value = "light";
  }

  return (
    <Nav>
      <Main>
        {theme.value === "light" ? (
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
          <ThemeButton type="button" onClick={toggleTheme}>
            {theme.value === "light" ? (
              <Icons.ThemeDark
                height={12}
                fill={Styles.background[theme.value].six}
                hoveredFill={Styles.background[theme.value].eight}
                addHover
              />
            ) : (
              <Icons.ThemeLight
                height={12}
                fill={Styles.background[theme.value].six}
                hoveredFill={Styles.background[theme.value].eight}
                addHover
              />
            )}
          </ThemeButton>

          <LoginButton href="/login">Log In</LoginButton>

          <Link href="/register">
            <Globals.PrimaryButton size="small">Register</Globals.PrimaryButton>
          </Link>
        </Links>
      </Main>
    </Nav>
  );
};
