import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import { ThemeProp } from "@/pages/_app";

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
      background-color: ${(props: ThemeProp) => props.theme.backgroundThree};
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
          >
            <svg
              width="auto"
              height="12"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.7014 12.4062C31.5474 50.1251 58.4608 74.4873 78.0206 81.4407C71.0671 86.8935 62.4128 89.995 53.3583 89.995C31.2972 89.995 13.3383 72.036 13.3383 49.975C13.3383 32.7164 24.3438 17.959 39.7014 12.4062ZM53.3082 0C25.3443 0 3.33325 22.6613 3.33325 49.975C3.33325 77.5888 25.7445 100 53.3583 100C71.9175 100 88.0256 89.895 96.6799 74.8874C59.1111 73.6368 36.1997 32.7164 55.0591 0C54.4588 0 53.9085 0 53.3082 0Z"
                fill="#595F98"
              />
            </svg>
          </ThemeButton>
          <LoginButton href="/login">Log In</LoginButton>
          <RegisterButton href="/register">Register</RegisterButton>
        </Links>
      </Main>
    </Nav>
  );
};
