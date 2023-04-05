import Head from "next/head";

import * as Components from "@/components/dashboard";
import * as Functions from "@/utils/functions";

const Settings = () => {
  const { currentUser } = Functions.useEntitiesSlice();

  Functions.useDetectAuthorizedUser();

  if (!currentUser) {
    return null;
  } else {
    return (
      <>
        <Head>
          <title>Kujira | Settings</title>
          <meta name="description" content="Kujira app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Components.DashboardPartial page="Settings">
          Settings Page
        </Components.DashboardPartial>
      </>
    );
  }
};

export default Settings;
