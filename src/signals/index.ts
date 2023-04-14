import * as UI from "./ui.signals";
import * as Dashboard from "./dashboard.signals";

// ========================================================================================= //
// [ SIGNALS STORE ] ======================================================================= //
// ========================================================================================= //

export type SignalsStore = {
  ui: UI.UISignals;
  dashboard: Dashboard.DashboardSignals;
};

export const signalsStore: SignalsStore = {
  ui: UI.uiSignals,
  dashboard: Dashboard.dashboardSignals,
};
