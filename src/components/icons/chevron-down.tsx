import { useSignal } from "@preact/signals-react";

import { SVGProps } from "@/utils/types";

export const ChevronDown = (props: SVGProps) => {
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
        d="M88.25 19.13L50 57.2967L11.75 19.13L0 30.88L50 80.88L100 30.88L88.25 19.13Z"
        fill={hovered.value ? props.hoveredFill || props.fill : props.fill}
      />
    </svg>
  );
};
