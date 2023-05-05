import { Signal, signal } from "@preact/signals-react";

import { DashboardSettingsPage } from "@/utils/types";

export type DashboardSignals = {
  // Dashboard Overview
  totalSpent: Signal<string>;
  remainingBudget: Signal<string>;

  // Dashboard Logbooks
  selectedLogbookId: Signal<number | null>;
  logbookTotalSpent: Signal<number>;

  // Dashboard Settings
  currentSettingsPage: Signal<DashboardSettingsPage>;
};

export const dashboardSignals: DashboardSignals = {
  // Dashboard Overview
  totalSpent: signal<string>("0"),
  remainingBudget: signal<string>("0"),

  // Dashboard Logbooks
  selectedLogbookId: signal<number | null>(null),
  logbookTotalSpent: signal<number>(0),

  // Dashboard Settings
  currentSettingsPage: signal<DashboardSettingsPage>("Personal Information"),
};
