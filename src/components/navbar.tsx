import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import * as Sizes from "@/utils/sizes";
import * as Styles from "@/utils/styles";
import { ThemeProp } from "@/pages/_app";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0px;
  width: 100%;
  background-color: ${(props: ThemeProp) => props.theme.backgroundOne};

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

const LoginButton = styled(Link)`
  ${Styles.setText(12)};
`;

const RegisterButton = styled(Link)`
  ${Styles.setButton("primary", "small")};
`;

export const Navbar = () => {
  return (
    <Nav>
      <Main>
        <Image
          src="/full-logo-horizontal.svg"
          alt="logo"
          width={81.07}
          height={20}
        />
        <Links>
          <LoginButton href="/login">Log In</LoginButton>
          <RegisterButton href="/register">Register</RegisterButton>
        </Links>
      </Main>
    </Nav>
  );
};
