import { dashboardSettingsTabs } from "@/components/dashboard/settings-sidebar";

export type DashboardPage = "Logbooks" | "Reviews" | "Settings";

export type DashboardSettingsTab = (typeof dashboardSettingsTabs)[number];

export type InputMiniImportance =
  | "Primary"
  | "Secondary"
  | "Failure"
  | "Pending";
