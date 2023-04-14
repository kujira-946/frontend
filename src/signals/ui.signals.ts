import { Signal, signal } from "@preact/signals-react";

export type Theme = "light" | "dark";

export type UISignals = {
  theme: Signal<Theme>;
};

export const uiSignals: UISignals = {
  theme: signal<Theme>("dark"),
};
