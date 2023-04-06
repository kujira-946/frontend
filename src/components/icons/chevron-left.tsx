import { useSignal } from "@preact/signals-react";

import { SVGProps } from "@/utils/types";

export const ChevronLeft = (props: SVGProps) => {
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
      <g clipPath="url(#clip0_711_33)">
        <path
          d="M80.88 11.75L69.13 0L19.13 50L69.13 100L80.88 88.25L42.7133 50L80.88 11.75Z"
          fill={hovered.value ? props.hoveredFill : props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_711_33">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
