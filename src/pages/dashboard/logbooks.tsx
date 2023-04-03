import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import { fetchUserDataRequest } from "@/sagas/fetch-user-data.saga";

const Logbooks = () => {
  const dispatch = Functions.useAppDispatch();
  const { currentUser } = Functions.useEntitiesSlice();

  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserDataRequest(currentUser.id));
    } else {
      router.push(Constants.ClientRoutes.LANDING);
    }
  }, [currentUser]);

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
};

export default Logbooks;
