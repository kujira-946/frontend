import styled from "styled-components";
import { memo, useEffect } from "react";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";

import { MobileNavbarContainer } from "./mobile-navbar-container";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Buttons = styled.div`
  display: flex;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage;
};

const ExportedComponent = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;
  const { mobileFiltersOpen, mobileMenuOpen, selectedLogbookId } =
    Functions.useSignalsStore().dashboard;

  const logbook = Functions.useAppSelector((state) => {
    return selectedLogbookId.value
      ? Functions.getLogbook(state, selectedLogbookId.value)
      : undefined;
  });

  const caption = useSignal("");

  useEffect(() => {
    if (props.page !== "Settings") {
      if (logbook) caption.value = logbook.name;
      else if (props.page === "Logbooks") caption.value = "Select a logbook.";
      else caption.value = "";
    } else {
      caption.value = "";
    }
  }, [props.page, logbook]);

  return (
    <MobileNavbarContainer page={props.page} caption={caption.value}>
      {theme.value && (
        <Buttons>
          <Globals.IconButton
            type="button"
            onClick={() => (mobileFiltersOpen.value = true)}
          >
            <Icons.Filter
              width={16}
              height={16}
              fill={Styles.background[theme.value].eight}
              addHover
            />
          </Globals.IconButton>
          <Globals.IconButton
            type="button"
            onClick={() => (mobileMenuOpen.value = true)}
          >
            <Icons.Hamburger
              width={16}
              height={16}
              fill={Styles.background[theme.value].eight}
              addHover
            />
          </Globals.IconButton>
        </Buttons>
      )}
    </MobileNavbarContainer>
  );
};

export const DashboardMobileNavbar = memo(ExportedComponent);
