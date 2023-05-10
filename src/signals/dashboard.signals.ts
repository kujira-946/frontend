import { Signal, signal } from "@preact/signals-react";

import { DashboardSettingsTab } from "@/utils/types";

export type DashboardSignals = {
  // Dashboard
  mobileFiltersOpen: Signal<boolean>;
  mobileMenuOpen: Signal<boolean>;
  mobileOverviewOpen: Signal<boolean>;

  // Dashboard Logbooks
  selectedLogbookId: Signal<number | null>;
  logbookTotalSpent: Signal<number>;

  // Dashboard Settings
  currentSettingsTab: Signal<DashboardSettingsTab>;
};

export const dashboardSignals: DashboardSignals = {
  // Dashboard
  mobileFiltersOpen: signal<boolean>(false),
  mobileMenuOpen: signal<boolean>(false),
  mobileOverviewOpen: signal<boolean>(false),

  // Dashboard Logbooks
  selectedLogbookId: signal<number | null>(null),
  logbookTotalSpent: signal<number>(0),

  // Dashboard Settings
  currentSettingsTab: signal<DashboardSettingsTab>("Personal Information"),
};
