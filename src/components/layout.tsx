import * as React from "react";
import { ThemeProvider } from "styled-components";

import * as Colors from "@/utils/colors";
import { uiSignals } from "@/signals";

type ThemeContents = {
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

export type ThemeProps = { theme: ThemeContents };

type Props = { children: React.ReactNode };

export const Layout = (props: Props) => {
  return (
    <ThemeProvider theme={themes[uiSignals.theme.value]}>
      {props.children}
    </ThemeProvider>
  );
};
