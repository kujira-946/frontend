import { Signal, signal } from "@preact/signals-react";

export type Theme = "light" | "dark" | null;

export type UISignals = {
  theme: Signal<Theme>;
};

export const uiSignals: UISignals = {
  theme: signal<Theme>(null),
};
