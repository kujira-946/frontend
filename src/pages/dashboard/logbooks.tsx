import Head from "next/head";
import { ReactElement, useEffect } from "react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as Components from "@/components/dashboard";
import * as LogbooksSagas from "@/sagas/logbooks.saga";
import * as Functions from "@/utils/functions";
import { NextPageWithLayout } from "../_app";

const Logbooks: NextPageWithLayout = () => {
  const dispatch = Functions.useAppDispatch();

  const { loadingLogbooks } = Functions.useUiSlice();
  const { currentUser, logbooks } = Functions.useEntitiesSlice();

  Functions.useDetectAuthorizedUser();

  useEffect(() => {
    if (currentUser) {
      const userHasNoLogbooks =
        currentUser.logbookIds.length === 0 &&
        logbooks &&
        Object.keys(logbooks).length === 0;

      if (!logbooks) {
        dispatch(Redux.uiActions.setLoadingLogbooks);
        dispatch(LogbooksSagas.fetchUserLogbooksRequest(currentUser.id));
      } else if (userHasNoLogbooks) {
        dispatch(
          LogbooksSagas.createLogbookRequest({
            name: Functions.generateFormattedDate(),
            ownerId: currentUser.id,
          })
        );
      }
    }
  }, [currentUser, logbooks]);

  if (!currentUser) {
    return null;
  } else if (loadingLogbooks) {
    return <Globals.Loading text="Loading your logbooks..." />;
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
