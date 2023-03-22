export type NotificationType = "pending" | "success" | "failure" | "warning";

export type UINotification = {
  title: string;
  body: string;
  footnote?: string;
  type?: NotificationType;
  timeout?: number;
};
