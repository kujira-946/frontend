import styled from "styled-components";
import { useMemo } from "react";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
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

const NavigationPillsAndErrorMessage = styled.section`
  display: flex;
  flex-direction: column;
`;

const NavigationPills = styled.article`
  display: flex;
  gap: ${Styles.pxAsRem.eight};
  justify-content: flex-start;
  align-items: center;
`;

const ErrorMessage = styled.p`
  margin: ${Styles.pxAsRem.eight} 0 0;
  color: ${(props: ThemeProps) => props.theme.failure};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const Buttons = styled.section`
  display: flex;
  gap: ${Styles.pxAsRem.twelve};
  margin-left: ${Styles.pxAsRem.twelve};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: Types.DashboardPage;
};

export const DashboardNavbar = (props: Props) => {
  console.log("Dashboard Navbar Rendered");

  const logbooks = Functions.useGetCurrentUserLogbooks();

  const selectedLogbook = useSignal("");

  function showInfo(): void {
    console.log("Show Info:", props.page);
  }

  function createLogbookEntry(): void {
    console.log("Create Logbook Entry:", props.page);
  }

  const currentUserLogbooks = useMemo(() => {
    if (logbooks) {
      return (
        <>
          {logbooks.map((logbook: Types.Logbook, index: number) => {
            return (
              <Globals.NeutralPillButton
                key={`dashboard-navbar-logbook-${logbook.id}-${index}`}
                onClick={() => (selectedLogbook.value = logbook.name)}
                size="smaller"
                selected={selectedLogbook.value === logbook.name}
                compact
              >
                {logbook.name}
              </Globals.NeutralPillButton>
            );
          })}
        </>
      );
    } else {
      return null;
    }
  }, [logbooks, selectedLogbook.value]);

  return (
    <Container>
      <NavigationPillsAndErrorMessage>
        <NavigationPills>
          {props.page === "Logbooks" && currentUserLogbooks}
        </NavigationPills>

        <ErrorMessage>Error Message</ErrorMessage>
      </NavigationPillsAndErrorMessage>

      <Buttons>
        {props.page !== "Settings" && (
          <Globals.NeutralButtonOutlined
            size="medium"
            onClick={showInfo}
            compact
          >
            Info
          </Globals.NeutralButtonOutlined>
        )}
        {props.page === "Logbooks" && (
          <Globals.PrimaryButton
            size="medium"
            onClick={createLogbookEntry}
            compact
          >
            Create Log Entry
          </Globals.PrimaryButton>
        )}
      </Buttons>
    </Container>
  );
};
