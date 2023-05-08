import styled from "styled-components";
import { motion } from "framer-motion";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

import { MobileNavbarContainer } from "../navbars/mobile-navbar-container";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Overlay = styled(motion.div)`
  position: fixed;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Styles.zIndexes.mobileMenuModal - 1};
  width: 100%;
  height: 100%;
  background-color: ${(props: ThemeProps) => props.theme.primaryMain};
`;

const Container = styled(motion.main)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Styles.zIndexes.mobileMenuModal};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage | "Navigation";
  children: React.ReactNode;
};

export const MobileMenuModal = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;
  const { mobileMenuOpen } = Functions.useSignalsStore().dashboard;

  return (
    <Globals.Portal>
      <Overlay
        initial={Constants.mobileMenuMotion.initial}
        animate={Constants.mobileMenuMotion.animate}
        exit={Constants.mobileMenuMotion.initial}
      />

      <Container
        initial={Constants.mobileMenuMotion.initial}
        animate={Constants.mobileMenuMotion.animate}
        exit={Constants.mobileMenuMotion.initial}
        transition={{ delay: 0.1 }}
      >
        <MobileNavbarContainer page="Navigation">
          {theme.value && (
            <Globals.IconButton
              type="button"
              onClick={() => (mobileMenuOpen.value = false)}
            >
              <Icons.Close
                width={16}
                height={16}
                fill={Styles.background[theme.value].eight}
                addHover
              />
            </Globals.IconButton>
          )}
        </MobileNavbarContainer>

        {props.children}
      </Container>
    </Globals.Portal>
  );
};