import Head from "next/head";
import { ReactElement } from "react";

import * as Components from "@/components/dashboard";
import * as Functions from "@/utils/functions";
import { NextPageWithLayout } from "../_app";

const Logbooks: NextPageWithLayout = () => {
  Functions.useDetectAuthorizedUser();

  const { currentUser } = Functions.useEntitiesSlice();

  if (!currentUser) {
    return null;
  } else {
    return (
      <>
        <Head>
          <title>Kujira | Logbooks</title>
          <meta name="description" content="Kujira app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </>
    );
  }
};

Logbooks.getLayout = function getLayout(page: ReactElement) {
  return (
    <Components.DashboardLayout page="Logbooks">
      {page}
    </Components.DashboardLayout>
  );
};

export default Logbooks;
