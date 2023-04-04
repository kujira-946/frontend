import Head from "next/head";

import * as Functions from "@/utils/functions";

const Logbooks = () => {
  console.log("Logbooks Page Rendered");

  const { currentUser } = Functions.useEntitiesSlice();

  Functions.useDetectAuthorizedUser(currentUser);

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

        <>Logbooks Page</>
      </>
    );
  }
};

export default Logbooks;
