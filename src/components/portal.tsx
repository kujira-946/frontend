import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};

export const Portal = (props: Props) => {
  let appPortal: HTMLElement | null = null;

  if (typeof window !== "undefined") {
    appPortal = document.getElementById("app-portal");
  }

  return <>{appPortal && createPortal(props.children, appPortal)}</>;
};
