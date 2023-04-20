import { Signal, signal } from "@preact/signals-react";

export type DashboardSignals = {
  totalSpent: Signal<string>;
  remainingBudget: Signal<string>;
  logbookTotalSpent: Signal<number>;
};

export const dashboardSignals: DashboardSignals = {
  totalSpent: signal<string>("0"),
  remainingBudget: signal<string>("0"),
  logbookTotalSpent: signal<number>(0),
};
