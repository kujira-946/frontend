import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";

const Logbooks = () => {
  const { currentUser } = Functions.useEntitiesSlice();

  const router = useRouter();
  useEffect(() => {
    if (!currentUser) router.push(Constants.ClientRoutes.LANDING);
  }, [currentUser]);

  return (
    <>
      <Head>
        <title>Kujira | Settings</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>Settings Page</>
    </>
  );
};

export default Logbooks;
