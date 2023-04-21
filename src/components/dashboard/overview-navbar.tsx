import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

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
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
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

  const { theme } = Functions.useSignalsStore().ui;

  return (
    <Container>
      {theme.value === "light" ? (
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
          if (theme.value) {
            return (
              <NavbarLink
                key={`overview-tab-${link}-${index}`}
                href={link}
                aria-label={`${link}-link-button`}
              >
                {link === Constants.ClientRoutes.LOGBOOKS ? (
                  <Icons.Dashboard
                    height={16}
                    fill={
                      router.pathname === link
                        ? Styles.text[theme.value]
                        : Styles.background[theme.value].seven
                    }
                    hoveredFill={Styles.text[theme.value]}
                    addHover
                  />
                ) : link === Constants.ClientRoutes.REVIEWS ? (
                  <Icons.Reviews
                    height={16}
                    fill={
                      router.pathname === link
                        ? Styles.text[theme.value]
                        : Styles.background[theme.value].seven
                    }
                    hoveredFill={Styles.text[theme.value]}
                    addHover
                  />
                ) : (
                  <Icons.Settings
                    height={16}
                    fill={
                      router.pathname === link
                        ? Styles.text[theme.value]
                        : Styles.background[theme.value].seven
                    }
                    hoveredFill={Styles.text[theme.value]}
                    addHover
                  />
                )}
              </NavbarLink>
            );
          } else {
            return null;
          }
        })}
      </NavbarLinks>
    </Container>
  );
};
