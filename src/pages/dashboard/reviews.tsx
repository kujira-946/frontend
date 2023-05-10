import dynamic from "next/dynamic";
import Head from "next/head";
import { ReactElement, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import * as Components from "@/components/reviews";
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

const Reviews: NextPageWithLayout = () => {
  const { selectedLogbookId, mobileFiltersOpen } = useSignalsStore().dashboard;

  useEffect(() => {
    mobileFiltersOpen.value = false;
  }, []);

  return (
    <>
      <Head>
        <title>Kujira | Reviews</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence>
        {mobileFiltersOpen.value && (
          <DynamicFiltersModal
            page="Reviews"
            caption="Select a logbook to review your purchasing habits."
          />
        )}
      </AnimatePresence>

      {selectedLogbookId.value && (
        <Components.ReviewColumns logbookId={selectedLogbookId.value} />
      )}
    </>
  );
};

Reviews.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout page="Reviews">{page}</DashboardLayout>;
};

export default Reviews;
