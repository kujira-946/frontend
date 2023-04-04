import Head from "next/head";

import * as Functions from "@/utils/functions";

const Logbooks = () => {
  const { currentUser } = Functions.useEntitiesSlice();

  if (!currentUser) {
    return null;
  } else {
    return (
      <>
        <Head>
          <title>Kujira | Reviews</title>
          <meta name="description" content="Kujira app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <>Reviews Page</>
      </>
    );
  }
};

export default Logbooks;
