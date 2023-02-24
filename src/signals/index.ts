import * as UI from "./ui-signals";

export type SignalsStore = {
  ui: UI.UISignals;
  uiHelpers: UI.UISignalsHelpers;
};

export const signalsStore: SignalsStore = {
  ui: UI.uiSignals,
  uiHelpers: UI.uiSignalsHelpers,
};
