import { Signal, signal } from "@preact/signals-react";

export type DashboardSignals = {
  totalSpent: Signal<string>;
  remainingBudget: Signal<string>;
};

export const dashboardSignals: DashboardSignals = {
  totalSpent: signal<string>("0"),
  remainingBudget: signal<string>("0"),
};
