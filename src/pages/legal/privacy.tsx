import Head from "next/head";

import * as Components from "@/components/legal";
import * as Constants from "@/utils/constants";

const Privacy = () => {
  return (
    <>
      <Head>
        <title>Kujira | Privacy Policy</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Components.LegalDocument
        document={Constants.privacyPolicy}
        lastUpdated="May 25, 2023"
      />
    </>
  );
};

export default Privacy;
