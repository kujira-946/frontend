import styled from "styled-components";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { DashboardSettingsPage } from "@/utils/types";
import { ThemeProps } from "../layout";

import { DashboardSidebarHeader } from "./dashboard-sidebar-header";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article`
  display: flex;
  flex-direction: column;
  width: ${Styles.widths.dashboardSidebar}px;
  height: 100%;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
`;

const FilterButtons = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${Styles.pxAsRem.twelve};
  overflow-y: auto;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const pages = [
  "Personal Information",
  "Security",
  "Authentication",
] as const;

export const SettingsSidebar = () => {
  const { currentSettingsPage } = Functions.useSignalsStore().dashboard;

  return (
    <Container>
      <DashboardSidebarHeader
        title="Settings"
        caption="Navigate your settings below."
        standalone
      />

      <FilterButtons>
        {pages.map((page: DashboardSettingsPage, index: number) => {
          return (
            <Globals.FilterButton
              key={`dashboard-settings-sidebar-filter-button-${page}-${index}`}
              type="button"
              onClick={() => (currentSettingsPage.value = page)}
              size="medium"
              borderRadius="six"
              selected={currentSettingsPage.value === page}
            >
              {page}
            </Globals.FilterButton>
          );
        })}
      </FilterButtons>
    </Container>
  );
};
