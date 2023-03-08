import * as React from "react";
import localFont from "@next/font/local";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import * as Colors from "@/utils/colors";
import { SignalsStoreContext } from "@/pages/_app";

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
    transition: 0.1s ease-in;
  }
`;

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
    text: Colors.text.light,
    backgroundOne: Colors.background.light.one,
    backgroundTwo: Colors.background.light.two,
    backgroundThree: Colors.background.light.three,
    backgroundFour: Colors.background.light.four,
    backgroundFive: Colors.background.light.five,
    backgroundSix: Colors.background.light.six,
    backgroundSeven: Colors.background.light.seven,
    backgroundEight: Colors.background.light.eight,
    pending: Colors.pending.light,
    success: Colors.success.light,
    failure: Colors.failure.light,
    warning: Colors.warning.light,
    primaryLight: Colors.primary.light.lighter,
    primaryMain: Colors.primary.light.main,
    primaryDark: Colors.primary.light.darker,
    secondaryLight: Colors.secondary.light.lighter,
    secondaryMain: Colors.secondary.light.main,
    secondaryDark: Colors.secondary.light.darker,
    need: Colors.need.light,
    planned: Colors.planned.light,
    impulse: Colors.impulse.light,
    shadowOne: Colors.shadow.light.one,
    shadowTwo: Colors.shadow.light.two,
    shadowThree: Colors.shadow.light.three,
    shadowFour: Colors.shadow.light.four,
    shadowFive: Colors.shadow.light.five,
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
    backgroundSeven: Colors.background.dark.seven,
    backgroundEight: Colors.background.dark.eight,
    pending: Colors.pending.dark,
    success: Colors.success.dark,
    failure: Colors.failure.dark,
    warning: Colors.warning.dark,
    primaryLight: Colors.primary.dark.lighter,
    primaryMain: Colors.primary.dark.main,
    primaryDark: Colors.primary.dark.darker,
    secondaryLight: Colors.secondary.dark.lighter,
    secondaryMain: Colors.secondary.dark.main,
    secondaryDark: Colors.secondary.dark.darker,
    need: Colors.need.dark,
    planned: Colors.planned.dark,
    impulse: Colors.impulse.dark,
    shadowOne: Colors.shadow.dark.one,
    shadowTwo: Colors.shadow.dark.two,
    shadowThree: Colors.shadow.dark.three,
    shadowFour: Colors.shadow.dark.four,
    shadowFive: Colors.shadow.dark.five,
    shadowOverlay: Colors.shadowOverlay.dark,
  },
};

export type ThemeProps = { theme: ThemeContents };

type Props = { children: React.ReactNode };

export const Layout = (props: Props) => {
  const { ui } = React.useContext(SignalsStoreContext);

  return (
    <ThemeProvider theme={themes[ui.theme.value]}>
      <GlobalStyles />
      {props.children}
    </ThemeProvider>
  );
};
