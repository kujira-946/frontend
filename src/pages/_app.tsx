import * as React from "react";
import { Provider } from "react-redux";
import localFont from "@next/font/local";
import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import * as Colors from "@/utils/colors";
import { store } from "@/store";

const poppins = localFont({
  src: [
    {
      path: "./fonts/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "./fonts/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Poppins-ThinItalic.ttf",
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
    font-size: 100%;
    font: inherit;
    line-height: 150%;
    vertical-align: baseline;
  }

  html,
  body {
    max-width: 100vw;
    color: ${(props: ThemeProps) => props.theme.text};
    background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
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
  }
`;

type Theme = {
  text: string;
  backgroundOne: string;
  backgroundTwo: string;
  backgroundThree: string;
  backgroundFour: string;
  backgroundFive: string;
  backgroundSix: string;
  primaryLight: string;
  primaryMain: string;
  primaryDark: string;
  secondaryLight: string;
  secondaryMain: string;
  secondaryDark: string;
  need: string;
  impulse: string;
  earned: string;
  pending: string;
  success: string;
  failure: string;
  warning: string;
  shadowOne: string;
  shadowTwo: string;
  shadowOverlay: string;
};

type Themes = {
  light: Theme;
  dark: Theme;
};

const themes: Themes = {
  light: {
    text: Colors.text.light,
    backgroundOne: Colors.background.light.one,
    backgroundTwo: Colors.background.light.two,
    backgroundThree: Colors.background.light.three,
    backgroundFour: Colors.background.light.four,
    backgroundFive: Colors.background.light.five,
    backgroundSix: Colors.background.light.six,
    primaryLight: Colors.primary.light.lighter,
    primaryMain: Colors.primary.light.main,
    primaryDark: Colors.primary.light.darker,
    secondaryLight: Colors.secondary.light.lighter,
    secondaryMain: Colors.secondary.light.main,
    secondaryDark: Colors.secondary.light.darker,
    need: Colors.need.light,
    impulse: Colors.impulse.light,
    earned: Colors.earned.light,
    pending: Colors.pending.light,
    success: Colors.success.light,
    failure: Colors.failure.light,
    warning: Colors.warning.light,
    shadowOne: Colors.shadow.light.one,
    shadowTwo: Colors.shadow.light.two,
    shadowOverlay: Colors.shadowOverlay.light,
  },
  dark: {
    text: Colors.text.dark,
    backgroundOne: Colors.background.dark.one,
    backgroundTwo: Colors.background.dark.two,
    backgroundThree: Colors.background.dark.three,
    backgroundFour: Colors.background.dark.four,
    backgroundFive: Colors.background.dark.five,
    backgroundSix: Colors.background.dark.six,
    primaryLight: Colors.primary.dark.lighter,
    primaryMain: Colors.primary.dark.main,
    primaryDark: Colors.primary.dark.darker,
    secondaryLight: Colors.secondary.dark.lighter,
    secondaryMain: Colors.secondary.dark.main,
    secondaryDark: Colors.secondary.dark.darker,
    need: Colors.need.dark,
    impulse: Colors.impulse.dark,
    earned: Colors.earned.dark,
    pending: Colors.pending.dark,
    success: Colors.success.dark,
    failure: Colors.failure.dark,
    warning: Colors.warning.dark,
    shadowOne: Colors.shadow.dark.one,
    shadowTwo: Colors.shadow.dark.two,
    shadowOverlay: Colors.shadowOverlay.dark,
  },
};

export type ThemeProps = { theme: Theme };

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  return (
    <Provider store={store}>
      <ThemeProvider theme={themes[theme]}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
