import { Signal, signal } from "@preact/signals-react";

import { DashboardSettingsTab } from "@/utils/types";

export type DashboardSignals = {
  // Dashboard Overview
  totalSpent: Signal<string>;
  remainingBudget: Signal<string>;

  // Dashboard Logbooks
  selectedLogbookId: Signal<number | null>;
  logbookTotalSpent: Signal<number>;

  // Dashboard Settings
  currentSettingsTab: Signal<DashboardSettingsTab>;
};

export const dashboardSignals: DashboardSignals = {
  // Dashboard Overview
  totalSpent: signal<string>("0"),
  remainingBudget: signal<string>("0"),

  // Dashboard Logbooks
  selectedLogbookId: signal<number | null>(null),
  logbookTotalSpent: signal<number>(0),

  // Dashboard Settings
  currentSettingsTab: signal<DashboardSettingsTab>("Personal Information"),
};
