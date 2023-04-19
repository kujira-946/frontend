import Head from "next/head";
import styled from "styled-components";
import { ReactElement } from "react";
import { useSignal } from "@preact/signals-react";

import * as Components from "@/components/settings";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { DashboardLayout } from "@/components/dashboard";
import { NextPageWithLayout } from "../_app";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.sixteen};
  height: 100%;
  padding: ${Styles.pxAsRem.sixteen};
`;

// ========================================================================================= //
// [ PAGE ] ================================================================================ //
// ========================================================================================= //

const Settings: NextPageWithLayout = () => {
  const currentTab = useSignal<Types.SettingsTab>("Personal Information");

  return (
    <>
      <Head>
        <title>Kujira | Settings</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Body>
        <Components.SettingsHeader currentTab={currentTab} />

        {currentTab.value === "Personal Information" ? (
          <Components.PersonalInformation />
        ) : currentTab.value === "Security" ? (
          <Components.Security />
        ) : (
          <Components.Authentication />
        )}
      </Body>
    </>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout page="Settings">{page}</DashboardLayout>;
};

export default Settings;
