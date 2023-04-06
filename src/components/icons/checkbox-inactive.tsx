import { useSignal } from "@preact/signals-react";

import { SVGProps } from "@/utils/types";

export const CheckboxInactive = (props: SVGProps) => {
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
      <g clipPath="url(#clip0_614_431)">
        <path
          d="M88.8889 11.1111V88.8889H11.1111V11.1111H88.8889ZM88.8889 0H11.1111C5 0 0 5 0 11.1111V88.8889C0 95 5 100 11.1111 100H88.8889C95 100 100 95 100 88.8889V11.1111C100 5 95 0 88.8889 0Z"
          fill={hovered.value ? props.hoveredFill : props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_614_431">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
