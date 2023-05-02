import Head from "next/head";
import { ReactElement } from "react";

import * as Components from "@/components/logbook";
import { DashboardLayout } from "@/components/dashboard";
import { useSignalsStore } from "@/utils/functions";
import { NextPageWithLayout } from "../_app";

const Logbooks: NextPageWithLayout = () => {
  const { selectedLogbookId } = useSignalsStore().dashboard;

  return (
    <>
      <Head>
        <title>Kujira | Logbooks</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Logbooks
      {/* {selectedLogbookId.value && (
        <Components.LogbookEntries logbookId={selectedLogbookId.value} />
      )} */}
    </>
  );
};

Logbooks.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout page="Logbooks">{page}</DashboardLayout>;
};

export default Logbooks;
