import type { AppProps } from "next/app";
import { createContext } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { Layout } from "@/components/layout";
import { store } from "@/store";
import { SignalsStore, signalsStore } from "@/signals";

export const SignalsStoreContext = createContext<SignalsStore>(
  {} as SignalsStore
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <SignalsStoreContext.Provider value={signalsStore}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SignalsStoreContext.Provider>
    </ReduxProvider>
  );
}
