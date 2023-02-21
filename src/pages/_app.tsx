import * as React from "react";
import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";

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
    vertical-align: baseline;
  }

  html,
  body {
    max-width: 100vw;
    color: ${(props: ThemeProp) => props.theme.colors.text};
    background-color: ${(props: ThemeProp) => props.theme.colors.backgroundTwo};
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
  colors: {
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
};

type Themes = {
  light: Theme;
  dark: Theme;
};

const themes: Themes = {
  light: {
    colors: {
      text: "#262626",
      backgroundOne: "#F5F5F5",
      backgroundTwo: "#F0F0F0",
      backgroundThree: "#E6E6E6",
      backgroundFour: "#C4C4C4",
      backgroundFive: "#B7B7B7",
      backgroundSix: "#757575",
      primaryLight: "#9CE3D1",
      primaryMain: "#4CCCAD",
      primaryDark: "#278B73",
      secondaryLight: "#C3DFF9",
      secondaryMain: "#68AEEF",
      secondaryDark: "#177BD9",
      need: "#4BC320",
      impulse: "#EE8320",
      earned: "#9246CE",
      pending: "#A3B4C2",
      success: "#2CD379",
      failure: "#E13333",
      warning: "#F4BF58",
      shadowOne: "box-shadow: 0px 8px 16px #E8E8E8",
      shadowTwo: "box-shadow: 0px 8px 16px #CCCCCC",
      shadowOverlay: "box-shadow: 0px 8px 16px #2F2F2F",
    },
  },
  dark: {
    colors: {
      text: "#F5F5F5",
      backgroundOne: "#262626",
      backgroundTwo: "#2B2B2B",
      backgroundThree: "#363636",
      backgroundFour: "#545454",
      backgroundFive: "#616161",
      backgroundSix: "#A3A3A3",
      primaryLight: "#38E1B8",
      primaryMain: "#189D7D",
      primaryDark: "#0A4235",
      secondaryLight: "#8DB4D8",
      secondaryMain: "#4181BC",
      secondaryDark: "#274E72",
      need: "#6CBC4F",
      impulse: "#C8803E",
      earned: "#AD66E5",
      pending: "#46759D",
      success: "#117B68",
      failure: "#DA4A4A",
      warning: "#E4A427",
      shadowOne: "box-shadow: 0px 8px 16px #232323",
      shadowTwo: "box-shadow: 0px 8px 16px #1C1C1C",
      shadowOverlay: "box-shadow: 0px 8px 16px #000000",
    },
  },
};

export type ThemeProp = { theme: Theme };

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
