import { useSignal } from "@preact/signals-react";

import { SVGProps } from "@/utils/types";

export const ChevronRight = (props: SVGProps) => {
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
      <g clip-path="url(#clip0_711_36)">
        <path
          d="M30.875 0L19.125 11.75L57.2917 50L19.125 88.25L30.875 100L80.875 50L30.875 0Z"
          fill={hovered.value ? props.hoveredFill || props.fill : props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_711_36">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
