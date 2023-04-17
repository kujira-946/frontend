import Head from "next/head";
import { ReactElement } from "react";

import * as Components from "@/components/dashboard";
import { NextPageWithLayout } from "../_app";

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Kujira | Settings</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Settings Page
    </>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Components.DashboardLayout page="Settings">
      {page}
    </Components.DashboardLayout>
  );
};

export default Settings;
