import dynamic from "next/dynamic";
import Head from "next/head";
import styled from "styled-components";
import { ReactElement, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import * as Components from "@/components/settings";
import * as Functions from "@/utils/functions";
import { DashboardLayout } from "@/components/dashboard";
import { NextPageWithLayout } from "../_app";

// ========================================================================================= //
// [ DYNAMIC IMPORT ] ====================================================================== //
// ========================================================================================= //

const DynamicFiltersModal = dynamic(() =>
  import("../../components/modals/mobile-settings-filters").then(
    (mod) => mod.MobileSettingsFilters
  )
);

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
  const { currentSettingsTab, mobileFiltersOpen } =
    Functions.useSignalsStore().dashboard;

  useEffect(() => {
    mobileFiltersOpen.value = false;
  }, []);

  return (
    <>
      <Head>
        <title>Kujira | Settings</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence>
        {mobileFiltersOpen.value && <DynamicFiltersModal />}
      </AnimatePresence>

      <Body>
        {currentSettingsTab.value === "Personal Information" ? (
          <Components.PersonalInformation />
        ) : currentSettingsTab.value === "Security" ? (
          <Components.Security />
        ) : currentSettingsTab.value === "Personalization" ? (
          <Components.Personalization />
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
