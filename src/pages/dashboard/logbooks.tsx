import Head from "next/head";
import { ReactElement } from "react";

import * as Components from "@/components/dashboard";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { NextPageWithLayout } from "../_app";

const Logbooks: NextPageWithLayout = () => {
  Functions.useDetectAuthorizedUser();

  const { currentUser } = Functions.useEntitiesSlice();

  const navigation: Types.DashboardNavigation[] = [
    { text: "Foo", onClick: () => console.log("Foo"), selected: true },
    { text: "Bar", onClick: () => console.log("Bar"), selected: false },
    { text: "Baz", onClick: () => console.log("Baz"), selected: false },
  ];

  function showInfo(): void {
    console.log("Show Info");
  }

  function createLogbookEntry(): void {
    console.log("Create Logbook Entry");
  }

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

        <Components.DashboardNavbar
          navigation={navigation}
          infoClick={showInfo}
          createClick={createLogbookEntry}
          createText="Log Entry"
        />
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
