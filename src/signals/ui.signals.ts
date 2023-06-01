import { Signal, signal } from "@preact/signals-react";

export type Theme = "light" | "dark" | null;

export type UISignals = {
  theme: Signal<Theme>;
  cookieNotification: Signal<Boolean>;
};

export const uiSignals: UISignals = {
  theme: signal<Theme>(null),
  cookieNotification: signal<Boolean>(false),
};
