import * as React from "react";
import styled, { ThemeProvider } from "styled-components";

import * as Colors from "@/utils/colors";
import { SignalsStoreContext } from "@/pages/_app";

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
  impulse: string;
  earned: string;
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
    impulse: Colors.impulse.light,
    earned: Colors.earned.light,
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
    impulse: Colors.impulse.dark,
    earned: Colors.earned.dark,
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
      {props.children}
    </ThemeProvider>
  );
};
