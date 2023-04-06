import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode, createContext } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@/store";
import { SignalsStore, signalsStore } from "@/signals";
import { Layout } from "@/components/layout";

export const SignalsStoreContext = createContext<SignalsStore>(
  {} as SignalsStore
);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ReduxProvider store={store}>
      <SignalsStoreContext.Provider value={signalsStore}>
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </SignalsStoreContext.Provider>
    </ReduxProvider>
  );
}
