import { signal } from "@preact/signals-react";

// ========================================================================================= //
// [ UI SIGNALS ] ========================================================================== //
// ========================================================================================= //

type Theme = "light" | "dark";

export const uiSignals = {
  theme: signal<Theme>("light"),
};

export const uiSignalsHelpers = {
  toggleTheme: function (): void {
    if (uiSignals.theme.value === "light") uiSignals.theme.value = "dark";
    else uiSignals.theme.value = "light";
  },
};
