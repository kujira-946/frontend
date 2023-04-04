import Head from "next/head";

import * as Functions from "@/utils/functions";

const Logbooks = () => {
  const { currentUser } = Functions.useEntitiesSlice();

  Functions.useDetectAuthorizedUser(currentUser);

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

        <>Settings Page</>
      </>
    );
  }
};

export default Logbooks;
