import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useContext } from "react";
import { useSignal } from "@preact/signals-react";

import * as Icons from "@/components/icons";
import * as Constants from "@/utils/constants";
import * as Styles from "@/utils/styles";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "../layout";
import { useRouter } from "next/router";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  width: 400px;
  height: 100%;
  border-right: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Styles.pxAsRem.sixteen};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

const NavbarLinks = styled.section`
  display: flex;
  gap: ${Styles.pxAsRem.twentyFour};
`;

const NavbarLink = styled(Link)`
  display: flex;
  align-items: center;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

const links = [
  Constants.ClientRoutes.LOGBOOKS,
  Constants.ClientRoutes.REVIEWS,
  Constants.ClientRoutes.SETTINGS,
];

export const Overview = () => {
  console.log("Overview Component Render");

  const router = useRouter();

  const { ui } = useContext(SignalsStoreContext);

  const dashboardHovered = useSignal(false);
  const reviewsHovered = useSignal(false);
  const settingsHovered = useSignal(false);

  function setHover(link: Constants.ClientRoutes, value: boolean): void {
    if (link === Constants.ClientRoutes.LOGBOOKS) {
      dashboardHovered.value = value;
    } else if (link === Constants.ClientRoutes.REVIEWS) {
      reviewsHovered.value = value;
    } else {
      settingsHovered.value = value;
    }
  }

  return (
    <Container>
      <Navbar>
        {ui.theme.value === "light" ? (
          <Image
            src="/logo-symbol-light.svg"
            alt="Light Logo"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src="/logo-symbol-dark.svg"
            alt="Dark Logo"
            width={24}
            height={24}
          />
        )}

        <NavbarLinks>
          {links.map((link: Constants.ClientRoutes, index: number) => {
            return (
              <NavbarLink
                key={`overview-tab-${link}-${index}`}
                href={link}
                onMouseEnter={() => setHover(link, true)}
                onMouseLeave={() => setHover(link, false)}
              >
                {link === Constants.ClientRoutes.LOGBOOKS ? (
                  <Icons.Dashboard
                    width={16}
                    height={16}
                    fill={
                      router.pathname === link
                        ? Styles.text[ui.theme.value]
                        : Styles.background[ui.theme.value].six
                    }
                    hoveredFill={Styles.text[ui.theme.value]}
                    hovered={dashboardHovered.value}
                  />
                ) : link === Constants.ClientRoutes.REVIEWS ? (
                  <Icons.Reviews
                    width={16}
                    height={16}
                    fill={
                      router.pathname === link
                        ? Styles.text[ui.theme.value]
                        : Styles.background[ui.theme.value].six
                    }
                    hoveredFill={Styles.text[ui.theme.value]}
                    hovered={reviewsHovered.value}
                  />
                ) : (
                  <Icons.Settings
                    width={16}
                    height={16}
                    fill={
                      router.pathname === link
                        ? Styles.text[ui.theme.value]
                        : Styles.background[ui.theme.value].six
                    }
                    hoveredFill={Styles.text[ui.theme.value]}
                    hovered={settingsHovered.value}
                  />
                )}
              </NavbarLink>
            );
          })}
        </NavbarLinks>
      </Navbar>
    </Container>
  );
};
