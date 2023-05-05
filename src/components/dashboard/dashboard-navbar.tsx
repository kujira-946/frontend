import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${Styles.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border-right: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

const Header = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Styles.pxAsRem.twenty};
`;

const Links = styled.article`
  display: flex;
  flex-direction: column;
`;

const NavigationButton = styled(Globals.IconButton)`
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
    }
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage;
};

export const DashboardNavbar = (props: Props) => {
  const router = useRouter();

  const { theme } = Functions.useSignalsStore().ui;

  if (!theme.value) {
    return null;
  } else {
    return (
      <Container>
        <Header>
          {theme.value === "light" ? (
            <Image
              width={28}
              height={28}
              src="/logo-symbol-light.svg"
              alt="Light Theme Logo"
            />
          ) : (
            <Image
              width={28}
              height={28}
              src="/logo-symbol-dark.svg"
              alt="Dark Theme Logo"
            />
          )}

          <Links>
            {/* Logbooks Button */}
            <NavigationButton
              onClick={() => router.push(Constants.ClientRoutes.LOGBOOKS)}
            >
              <Icons.Dashboard
                width={16}
                height={16}
                fill={
                  props.page === "Logbooks"
                    ? Styles.text[theme.value]
                    : Styles.background[theme.value].eight
                }
                addHover
              />
            </NavigationButton>

            {/* Reviews Button */}
            <NavigationButton
              onClick={() => router.push(Constants.ClientRoutes.REVIEWS)}
            >
              <Icons.Reviews
                width={16}
                height={16}
                fill={
                  props.page === "Reviews"
                    ? Styles.text[theme.value]
                    : Styles.background[theme.value].eight
                }
                addHover
              />
            </NavigationButton>

            {/* Settings Button */}
            <NavigationButton
              onClick={() => router.push(Constants.ClientRoutes.SETTINGS)}
            >
              <Icons.Settings
                width={16}
                height={16}
                fill={
                  props.page === "Settings"
                    ? Styles.text[theme.value]
                    : Styles.background[theme.value].eight
                }
                addHover
              />
            </NavigationButton>
          </Links>
        </Header>

        <NavigationButton onClick={() => console.log("Report Bug")}>
          <Icons.BugReport
            width={16}
            height={16}
            fill={Styles.background[theme.value].eight}
            addHover
          />
        </NavigationButton>
      </Container>
    );
  }
};
