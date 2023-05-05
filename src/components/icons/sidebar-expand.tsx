import { useSignal } from "@preact/signals-react";

import { SVGProps } from "@/utils/types";

export const SidebarExpand = (props: SVGProps) => {
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
        d="M13.0339 100L1.27014 88.2446L39.5397 49.975L1.27014 11.7637L13.0339 0L63.0422 50L13.0422 100H13.0339ZM98.7244 99.9168H82.0854V0.0831946H98.7244V99.9168Z"
        fill={hovered.value ? props.hoveredFill || props.fill : props.fill}
      />
    </svg>
  );
};
