import dynamic from "next/dynamic";
import Head from "next/head";
import { ReactElement, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import * as Components from "@/components/logbooks";
import { DashboardLayout } from "@/components/dashboard";
import { useSignalsStore } from "@/utils/functions";
import { NextPageWithLayout } from "../_app";

// ========================================================================================= //
// [ DYNAMIC IMPORT ] ====================================================================== //
// ========================================================================================= //

const DynamicFiltersModal = dynamic(() =>
  import("../../components/modals/mobile-logbook-filters").then(
    (mod) => mod.MobileLogbookFilters
  )
);

// ========================================================================================= //
// [ PAGE ] ================================================================================ //
// ========================================================================================= //

const Logbooks: NextPageWithLayout = () => {
  const { selectedLogbookId, mobileFiltersOpen } = useSignalsStore().dashboard;

  useEffect(() => {
    mobileFiltersOpen.value = false;
  }, []);

  return (
    <>
      <Head>
        <title>Kujira | Logbooks</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence>
        {mobileFiltersOpen.value && (
          <DynamicFiltersModal
            page="Logbooks Filter"
            caption="Select a logbook below."
          />
        )}
      </AnimatePresence>

      {selectedLogbookId.value && (
        <Components.LogbookEntries
          selectedLogbookId={selectedLogbookId.value}
        />
      )}
    </>
  );
};

Logbooks.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout page="Logbooks">{page}</DashboardLayout>;
};

export default Logbooks;
