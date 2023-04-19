import styled from "styled-components";
import { Signal } from "@preact/signals-react";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { useEntitiesSlice } from "@/utils/functions";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Copy = styled.section`
  margin-bottom: ${Styles.pxAsRem.sixteen};
`;

const CopyTitle = styled.h1`
  margin: 0 0 ${Styles.pxAsRem.four};
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.eighteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const CopyBody = styled.h2`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.medium};
`;

const NavigationTabs = styled.nav`
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundSix} solid 1px;
`;

type TabButtonProps = { selected: boolean };

const TabButton = styled.button<TabButtonProps>`
  ${Styles.clearButton};
  padding: 0 ${Styles.pxAsRem.twenty} ${Styles.pxAsRem.sixteen};
  color: ${(props: TabButtonProps & ThemeProps) => {
    return props.selected ? props.theme.text : props.theme.backgroundSix;
  }};
  border-bottom: ${(props: TabButtonProps & ThemeProps) => {
    return props.selected
      ? `${props.theme.text} solid 1px`
      : `${props.theme.backgroundSix} solid 1px`;
  }};
  margin-bottom: -1px;
`;

const Text = styled.span`
  text-align: center;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  currentTab: Signal<Types.SettingsTab>;
};

const tabs: Types.SettingsTab[] = [
  "Personal Information",
  "Security",
  "Authentication",
];

const hour = new Date().getHours();

export const SettingsHeader = (props: Props) => {
  const { currentUser } = useEntitiesSlice();

  if (!currentUser) {
    return null;
  } else {
    return (
      <header>
        <Copy>
          <CopyTitle>
            Good {hour > 0 && hour < 12 ? "morning" : "evening"},{" "}
            {currentUser.firstName || currentUser.username}.
          </CopyTitle>
          <CopyBody>You can change your settings here.</CopyBody>
        </Copy>

        <NavigationTabs>
          {tabs.map((tab: Types.SettingsTab) => {
            return (
              <TabButton
                key={`settings-page-tab-button-${tab}`}
                onClick={() => (props.currentTab.value = tab)}
                selected={props.currentTab.value === tab}
              >
                <Text>{tab}</Text>
              </TabButton>
            );
          })}
        </NavigationTabs>
      </header>
    );
  }
};
