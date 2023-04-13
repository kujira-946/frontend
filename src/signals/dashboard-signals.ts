import { Signal, signal } from "@preact/signals-react";

export type DashboardSignals = {
  selectedLogbookId: Signal<number | null>;
};

export const dashboardSignals: DashboardSignals = {
  selectedLogbookId: signal<number | null>(null),
};
