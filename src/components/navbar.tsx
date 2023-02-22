import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import * as Icons from "@/components/icons";
import { ThemeProps } from "@/pages/_app";

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
  const [themeHover, setThemeHover] = React.useState(false);

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
            onClick={() => console.log("Toggle Theme")}
            onMouseEnter={() => setThemeHover(true)}
            onMouseLeave={() => setThemeHover(false)}
          >
            <Icons.IconModeDark hover={themeHover} />
          </ThemeButton>
          <LoginButton href="/login">Log In</LoginButton>
          <RegisterButton href="/register">Register</RegisterButton>
        </Links>
      </Main>
    </Nav>
  );
};
