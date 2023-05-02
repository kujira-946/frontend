import Head from "next/head";
import { ReactElement } from "react";

import * as Components from "@/components/reviews";
import { DashboardLayout } from "@/components/dashboard";
import { NextPageWithLayout } from "../_app";
import { useSignalsStore } from "@/utils/functions";

const Reviews: NextPageWithLayout = () => {
  const { selectedLogbookId } = useSignalsStore().dashboard;

  return (
    <>
      <Head>
        <title>Kujira | Reviews</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Reviews
      {/* {selectedLogbookId.value && (
        <Components.ReviewColumns logbookId={selectedLogbookId.value} />
      )} */}
    </>
  );
};

Reviews.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout page="Reviews">{page}</DashboardLayout>;
};

export default Reviews;
