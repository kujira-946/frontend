import Head from "next/head";
import { ReactElement } from "react";
import { useSignal } from "@preact/signals-react";

import * as Components from "@/components/logbook";
import * as Functions from "@/utils/functions";
import { DashboardLayout } from "@/components/dashboard";
import { NextPageWithLayout } from "../_app";

const Logbooks: NextPageWithLayout = () => {
  const selectedLogbookId = useSignal<number | null>(null);

  Functions.useDetectAuthorizedUser();

  return (
    <>
      <Head>
        <title>Kujira | Logbooks</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Components.LogbooksHeader selectedLogbookId={selectedLogbookId} />

      {selectedLogbookId.value && (
        <Components.LogbookEntries logbookId={selectedLogbookId.value} />
      )}
    </>
  );
};

Logbooks.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout page="Logbooks">{page}</DashboardLayout>;
};

export default Logbooks;
