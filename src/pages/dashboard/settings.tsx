import Head from "next/head";
import styled from "styled-components";
import { ReactElement } from "react";

import * as Components from "@/components/settings";
import * as Functions from "@/utils/functions";
import { DashboardLayout } from "@/components/dashboard";
import { NextPageWithLayout } from "../_app";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Body = styled.div`
  position: relative;
  height: 100%;
`;

// ========================================================================================= //
// [ PAGE ] ================================================================================ //
// ========================================================================================= //

const Settings: NextPageWithLayout = () => {
  const { currentSettingsTab } = Functions.useSignalsStore().dashboard;

  return (
    <>
      <Head>
        <title>Kujira | Settings</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Body>
        {currentSettingsTab.value === "Personal Information" ? (
          <Components.PersonalInformation />
        ) : currentSettingsTab.value === "Security" ? (
          <Components.Security />
        ) : currentSettingsTab.value === "Authentication" ? (
          <Components.Authentication />
        ) : (
          <Components.Personalization />
        )}
      </Body>
    </>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout page="Settings">{page}</DashboardLayout>;
};

export default Settings;
