import { dashboardSettingsTabs } from "@/components/dashboard/settings-sidebar";

export type DashboardPage = "Logbooks" | "Reviews" | "Settings";

export type DashboardSettingsTab = (typeof dashboardSettingsTabs)[number];

export type MobileNavbarPage = DashboardPage | "Navigation" | "Logbooks Filter";

export type InputMiniImportance =
  | "Primary"
  | "Secondary"
  | "Failure"
  | "Pending";
