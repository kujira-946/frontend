import localFont from "@next/font/local";
import axios from "axios";
import Cookies from "js-cookie";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { fetchUserRequest } from "@/sagas/users.saga";
import { logoutRequest } from "@/sagas/auth.saga";

import { Notification } from "./notification";
import { Loading } from "./loading";
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
    transition: 0.1s ease-in;
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
  pending: string;
  success: string;
  failure: string;
  warning: string;
  primaryLight: string;
  primaryMain: string;
  primaryDark: string;
  secondaryLight: string;
  secondaryMain: string;
  secondaryDark: string;
  need: string;
  planned: string;
  impulse: string;
  regret: string;
  shadowOne: string;
  shadowTwo: string;
  shadowThree: string;
  shadowFour: string;
  shadowFive: string;
  shadowOverlay: string;
};

type Themes = {
  light: ThemeContents;
  dark: ThemeContents;
};

const themes: Themes = {
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
    pending: Styles.pending.light,
    success: Styles.success.light,
    failure: Styles.failure.light,
    warning: Styles.warning.light,
    primaryLight: Styles.primary.light.lighter,
    primaryMain: Styles.primary.light.main,
    primaryDark: Styles.primary.light.darker,
    secondaryLight: Styles.secondary.light.lighter,
    secondaryMain: Styles.secondary.light.main,
    secondaryDark: Styles.secondary.light.darker,
    need: Styles.need.light,
    planned: Styles.planned.light,
    impulse: Styles.impulse.light,
    regret: Styles.regret.light,
    shadowOne: Styles.shadow.light.one,
    shadowTwo: Styles.shadow.light.two,
    shadowThree: Styles.shadow.light.three,
    shadowFour: Styles.shadow.light.four,
    shadowFive: Styles.shadow.light.five,
    shadowOverlay: Styles.shadowOverlay.light,
  },
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
    pending: Styles.pending.dark,
    success: Styles.success.dark,
    failure: Styles.failure.dark,
    warning: Styles.warning.dark,
    primaryLight: Styles.primary.dark.lighter,
    primaryMain: Styles.primary.dark.main,
    primaryDark: Styles.primary.dark.darker,
    secondaryLight: Styles.secondary.dark.lighter,
    secondaryMain: Styles.secondary.dark.main,
    secondaryDark: Styles.secondary.dark.darker,
    need: Styles.need.dark,
    planned: Styles.planned.dark,
    impulse: Styles.impulse.dark,
    regret: Styles.regret.dark,
    shadowOne: Styles.shadow.dark.one,
    shadowTwo: Styles.shadow.dark.two,
    shadowThree: Styles.shadow.dark.three,
    shadowFour: Styles.shadow.dark.four,
    shadowFive: Styles.shadow.dark.five,
    shadowOverlay: Styles.shadowOverlay.dark,
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
const userId = Cookies.get("id");
const jwtAccessToken = Cookies.get("token");
if (jwtAccessToken) {
  axios.defaults.headers.common["Authorization"] = jwtAccessToken;
}

const authedRoutes: string[] = [
  ClientRoutes.ONBOARDING,
  ClientRoutes.LOGBOOKS,
  ClientRoutes.REVIEWS,
  ClientRoutes.SETTINGS,
];

type Props = { children: React.ReactNode };

export const Layout = (props: Props) => {
  console.log("Layout Rendered");

  const router = useRouter();
  const dispatch = Functions.useAppDispatch();

  const { theme } = Functions.useSignalsStore().ui;
  const { currentUser } = Functions.useEntitiesSlice();
  const { loadingUsers } = Functions.useUiSlice();

  const inAuthedRoute = authedRoutes.includes(router.pathname);

  useEffect(() => {
    if (!userId && !jwtAccessToken && inAuthedRoute) {
      router.push("/");
    } else if (userId && !jwtAccessToken) {
      Cookies.remove("id");
      dispatch(logoutRequest(Number(userId)));
    }
  }, []);

  useEffect(() => {
    if (userId && !currentUser) {
      dispatch(Redux.uiActions.setLoadingUsers(true));
      dispatch(fetchUserRequest(Number(userId)));
    } else if (!inAuthedRoute && currentUser) {
      if (currentUser.onboarded) router.push(ClientRoutes.LOGBOOKS);
      else router.push(ClientRoutes.ONBOARDING);
    }
  }, [currentUser]);

  return (
    <ThemeProvider theme={themes[theme.value]}>
      <GlobalStyles />
      <Portal id="app-portal" />
      <Notification />

      {loadingUsers ? (
        <Loading text="Loading your information..." />
      ) : (inAuthedRoute && currentUser) || (!inAuthedRoute && !currentUser) ? (
        props.children
      ) : null}
    </ThemeProvider>
  );
};
