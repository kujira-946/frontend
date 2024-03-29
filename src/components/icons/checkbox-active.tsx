import { useSignal } from "@preact/signals-react";

import { SVGProps } from "@/utils/types";

export const CheckboxActive = (props: SVGProps) => {
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
      <g clipPath="url(#clip0_614_437)">
        <path
          d="M88.8889 0H11.1111C5 0 0 5 0 11.1111V88.8889C0 95 5 100 11.1111 100H88.8889C95 100 100 95 100 88.8889V11.1111C100 5 95 0 88.8889 0ZM88.8889 88.8889H11.1111V11.1111H88.8889V88.8889ZM83.2778 33.3333L75.4444 25.4444L38.8333 62.0556L24.5 47.7778L16.6111 55.6111L38.8333 77.7778L83.2778 33.3333Z"
          fill={hovered.value ? props.hoveredFill || props.fill : props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_614_437">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
