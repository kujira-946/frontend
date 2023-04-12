export type DashboardPage = "Logbooks" | "Reviews" | "Settings";

export type DashboardNavigation = {
  text: string;
  onClick: () => void;
  selected: boolean;
};
