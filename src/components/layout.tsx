import localFont from "@next/font/local";
import axios from "axios";
import Cookies from "js-cookie";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Globals from "@/components";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { Theme } from "@/signals/ui.signals";
import { ClientRoutes } from "@/utils/constants";

const poppins = localFont({
  src: [
    {
      path: "../fonts/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../fonts/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Poppins-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
  ],
});

const GlobalStyles = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-size: 100%;
    line-height: 170%;
    vertical-align: baseline;
  }

  html,
  body {
    max-width: 100vw;
    color: ${(props: ThemeProps) => props.theme.text};
    background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
    font-family: ${poppins.style.fontFamily};
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  } */

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: ${poppins.style.fontFamily};
  }
`;

const Portal = styled.div``;

type ThemeContents = {
  text: string;
  backgroundOne: string;
  backgroundTwo: string;
  backgroundThree: string;
  backgroundFour: string;
  backgroundFive: string;
  backgroundSix: string;
  backgroundSeven: string;
  backgroundEight: string;
  backgroundNine: string;
  backgroundTen: string;
  primaryLight: string;
  primaryMain: string;
  primaryDark: string;
  need: string;
  planned: string;
  impulse: string;
  regret: string;
  pending: string;
  success: string;
  failure: string;
  warning: string;
  shadowOne: string;
  shadowTwo: string;
  shadowThree: string;
  shadowFour: string;
  shadowFive: string;
  shadowOverlay: string;
};

type Themes = {
  dark: ThemeContents;
  light: ThemeContents;
};

const themes: Themes = {
  dark: {
    text: Styles.text.dark,
    backgroundOne: Styles.background.dark.one,
    backgroundTwo: Styles.background.dark.two,
    backgroundThree: Styles.background.dark.three,
    backgroundFour: Styles.background.dark.four,
    backgroundFive: Styles.background.dark.five,
    backgroundSix: Styles.background.dark.six,
    backgroundSeven: Styles.background.dark.seven,
    backgroundEight: Styles.background.dark.eight,
    backgroundNine: Styles.background.dark.nine,
    backgroundTen: Styles.background.dark.ten,
    primaryLight: Styles.primary.dark.lighter,
    primaryMain: Styles.primary.dark.main,
    primaryDark: Styles.primary.dark.darker,
    need: Styles.need.dark,
    planned: Styles.planned.dark,
    impulse: Styles.impulse.dark,
    regret: Styles.regret.dark,
    pending: Styles.pending.dark,
    success: Styles.success.dark,
    failure: Styles.failure.dark,
    warning: Styles.warning.dark,
    shadowOne: Styles.shadow.dark.one,
    shadowTwo: Styles.shadow.dark.two,
    shadowThree: Styles.shadow.dark.three,
    shadowFour: Styles.shadow.dark.four,
    shadowFive: Styles.shadow.dark.five,
    shadowOverlay: Styles.shadowOverlay.dark,
  },
  light: {
    text: Styles.text.light,
    backgroundOne: Styles.background.light.one,
    backgroundTwo: Styles.background.light.two,
    backgroundThree: Styles.background.light.three,
    backgroundFour: Styles.background.light.four,
    backgroundFive: Styles.background.light.five,
    backgroundSix: Styles.background.light.six,
    backgroundSeven: Styles.background.light.seven,
    backgroundEight: Styles.background.light.eight,
    backgroundNine: Styles.background.light.nine,
    backgroundTen: Styles.background.light.ten,
    primaryLight: Styles.primary.light.lighter,
    primaryMain: Styles.primary.light.main,
    primaryDark: Styles.primary.light.darker,
    need: Styles.need.light,
    planned: Styles.planned.light,
    impulse: Styles.impulse.light,
    regret: Styles.regret.light,
    pending: Styles.pending.light,
    success: Styles.success.light,
    failure: Styles.failure.light,
    warning: Styles.warning.light,
    shadowOne: Styles.shadow.light.one,
    shadowTwo: Styles.shadow.light.two,
    shadowThree: Styles.shadow.light.three,
    shadowFour: Styles.shadow.light.four,
    shadowFive: Styles.shadow.light.five,
    shadowOverlay: Styles.shadowOverlay.light,
  },
};

export type ThemeProps = { theme: ThemeContents };

// ↓↓↓ Global Axios Defaults ↓↓↓ //
if (process.env.NODE_ENV === "production") {
  // axios.defaults.baseURL = "https://kuijra-backend.up.railway.app";
  axios.defaults.baseURL = "http://localhost:8000";
} else {
  axios.defaults.baseURL = "http://localhost:8000";
}
const userId = Cookies.get(Constants.userId);
const jwtAccessToken = Cookies.get(Constants.token);
if (jwtAccessToken) {
  axios.defaults.headers.common["Authorization"] = jwtAccessToken;
}

const cookiePolicyAcceptance = Cookies.get(Constants.cookiePolicyAcceptance);

const authPages: string[] = [
  ClientRoutes.ONBOARDING,
  ClientRoutes.LOGBOOKS,
  ClientRoutes.REVIEWS,
  ClientRoutes.SETTINGS,
];

const legalPages: string[] = [
  ClientRoutes.TERMS,
  ClientRoutes.PRIVACY,
  ClientRoutes.COOKIE,
];

type Props = { children: React.ReactNode };

export const Layout = (props: Props) => {
  const router = useRouter();
  const dispatch = Functions.useAppDispatch();

  const { theme } = Functions.useSignalsStore().ui;
  const { currentUser } = Functions.useEntitiesSlice();
  const { loadingUsers } = Functions.useUiSlice();

  const inAuthPage = authPages.includes(router.pathname);
  const notInLegalPage = !legalPages.includes(router.pathname);

  useEffect(() => {
    if (!!window) {
      if (!localStorage.getItem("theme")) {
        theme.value = "dark";
        localStorage.setItem("theme", "dark");
      } else {
        theme.value = localStorage.getItem("theme") as Theme;
      }
    }

    if (!userId && !jwtAccessToken && inAuthPage) {
      router.push(ClientRoutes.LANDING);
    } else if (userId && !jwtAccessToken) {
      Cookies.remove(Constants.userId);
      dispatch(Sagas.logoutRequest(Number(userId)));
    }

    if (userId && !currentUser) {
      dispatch(Redux.uiActions.setLoadingUsers(true));
      dispatch(Sagas.fetchUserRequest(Number(userId)));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("theme", currentUser.theme);

      if (!inAuthPage && notInLegalPage) {
        if (currentUser.onboarded) router.push(ClientRoutes.LOGBOOKS);
        else router.push(ClientRoutes.ONBOARDING);
      }
    }
  }, [currentUser]);

  if (!theme.value) {
    return null;
  } else {
    return (
      <ThemeProvider theme={themes[theme.value]}>
        <GlobalStyles />
        <Portal id="app-portal" />
        <Globals.Notification />

        {cookiePolicyAcceptance !== "accepted" && (
          <Globals.CookieNotification />
        )}

        {loadingUsers ? (
          <Globals.Loading text="Loading your information..." />
        ) : (
          props.children
        )}
      </ThemeProvider>
    );
  }
};
