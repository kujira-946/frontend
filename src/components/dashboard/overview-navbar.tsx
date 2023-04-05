import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSignal } from "@preact/signals-react";

import * as Icons from "@/components/icons";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.nav`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
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

export const OverviewNavbar = () => {
  const router = useRouter();

  const { ui } = Functions.useSignalsStore();

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
    </Container>
  );
};
