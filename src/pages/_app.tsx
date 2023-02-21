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
    background: string;
  };
};

type Themes = {
  light: Theme;
  dark: Theme;
};

const themes: Themes = {
  light: {
    colors: {
      text: "black",
      background: "white",
    },
  },
  dark: {
    colors: {
      text: "white",
      background: "black",
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
