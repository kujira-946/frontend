import { useSignal } from "@preact/signals-react";

import { SVGProps } from "@/utils/types";

export const SidebarCollapse = (props: SVGProps) => {
  const hovered = useSignal(false);

  return (
    <svg
      width={props.width || "100%"}
      height={props.height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => props.addHover && (hovered.value = true)}
      onMouseLeave={() => props.addHover && (hovered.value = false)}
      style={{ cursor: props.addHover ? "pointer" : "default" }}
    >
      <path
        d="M86.9606 100L36.944 50L86.9606 0L98.7327 11.7637L60.4631 50.0333L98.7327 88.3028L86.9606 100ZM17.9091 99.9168H1.27014V0.0831946H17.9091V99.9168Z"
        fill={hovered.value ? props.hoveredFill || props.fill : props.fill}
      />
    </svg>
  );
};
