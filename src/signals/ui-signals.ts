import { Signal, signal } from "@preact/signals-react";

// ========================================================================================= //
// [ SIGNALS ] ============================================================================= //
// ========================================================================================= //

type Theme = "light" | "dark";

export type UISignals = {
  theme: Signal<Theme>;
};

export const uiSignals: UISignals = {
  theme: signal<Theme>("dark"),
};

// ========================================================================================= //
// [ SIGNALS HELPERS ] ===================================================================== //
// ========================================================================================= //

export type UISignalsHelpers = {
  toggleTheme: () => void;
};

export const uiSignalsHelpers = {
  toggleTheme: function (): void {
    if (uiSignals.theme.value === "light") uiSignals.theme.value = "dark";
    else uiSignals.theme.value = "light";
  },
};
