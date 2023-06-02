import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Nav = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${Styles.pxAsRem.twelve} 0;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;

  ${Styles.setMediaPaddings("twelve")};
`;

const Main = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${Styles.widths.landingATF}px;
`;

const Links = styled.section`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const IconButton = styled(Globals.IconButton)`
  @media (max-width: 400px) {
    display: none;
  }
`;

const LoginButton = styled(Link)`
  ${Styles.transition};
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
    if (theme.value === "light") {
      theme.value = "dark";
      localStorage.setItem("theme", theme.value);
    } else {
      theme.value = "light";
      localStorage.setItem("theme", theme.value);
    }
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
          <IconButton type="button" onClick={toggleTheme}>
            {theme.value === "light" ? (
              <Icons.ThemeDark
                height={12}
                fill={Styles.background[theme.value].six}
                addHover
              />
            ) : theme.value === "dark" ? (
              <Icons.ThemeLight
                height={12}
                fill={Styles.background[theme.value].six}
                addHover
              />
            ) : null}
          </IconButton>

          <LoginButton href="/login">Log In</LoginButton>

          <Link href="/register">
            <Globals.Button type="button" size="large" primary>
              Register
            </Globals.Button>
          </Link>
        </Links>
      </Main>
    </Nav>
  );
};
