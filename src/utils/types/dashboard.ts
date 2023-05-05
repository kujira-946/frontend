import { pages } from "@/components/dashboard/settings-sidebar";

export type DashboardPage = "Logbooks" | "Reviews" | "Settings";

export type DashboardSettingsPage = (typeof pages)[number];

export type InputMiniImportance =
  | "Primary"
  | "Secondary"
  | "Failure"
  | "Pending";
