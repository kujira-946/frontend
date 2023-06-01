import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Cookies from "js-cookie";

import * as Globals from "@/components";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.nav`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;

  ${Styles.setMediaPaddings()};
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${Styles.widths.desktop}px;
  padding: ${Styles.pxAsRem.twelve} 0;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

const userLoggedIn = Cookies.get(Constants.token);

export const LegalNavbar = () => {
  const { theme } = Functions.useSignalsStore().ui;

  return (
    <Container>
      <Body>
        {theme.value &&
          (theme.value === "light" ? (
            <Image
              width={105.39}
              height={26}
              src="/logo-full-horizontal-light.svg"
              alt="Kujira Logo Full Horizontal"
            />
          ) : (
            <Image
              width={105.39}
              height={26}
              src="/logo-full-horizontal-dark.svg"
              alt="Kujira Logo Full Horizontal"
            />
          ))}

        {window && typeof window !== "undefined" && (
          <Link
            href={
              userLoggedIn
                ? Constants.ClientRoutes.LOGBOOKS
                : Constants.ClientRoutes.LANDING
            }
          >
            <Globals.Button type="button" size="large" primary>
              Go Home
            </Globals.Button>
          </Link>
        )}
      </Body>
    </Container>
  );
};
