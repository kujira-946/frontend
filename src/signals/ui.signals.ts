import { Signal, signal } from "@preact/signals-react";

export type Theme = "light" | "dark" | null;

export type UISignals = {
  theme: Signal<Theme>;
  showCookieNotification: Signal<Boolean>;
};

export const uiSignals: UISignals = {
  theme: signal<Theme>(null),
  showCookieNotification: signal<Boolean>(false),
};
