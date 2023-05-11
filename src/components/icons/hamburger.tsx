import { useSignal } from "@preact/signals-react";

import { SVGProps } from "@/utils/types";

export const Hamburger = (props: SVGProps) => {
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
      <g clipPath="url(#clip0_7_20)">
        <path
          d="M94 0H6C2.68629 0 0 2.68629 0 6V18C0 21.3137 2.68629 24 6 24H94C97.3137 24 100 21.3137 100 18V6C100 2.68629 97.3137 0 94 0Z"
          fill={hovered.value ? props.hoveredFill || props.fill : props.fill}
        />
        <path
          d="M94 38H6C2.68629 38 0 40.6863 0 44V56C0 59.3137 2.68629 62 6 62H94C97.3137 62 100 59.3137 100 56V44C100 40.6863 97.3137 38 94 38Z"
          fill={hovered.value ? props.hoveredFill || props.fill : props.fill}
        />
        <path
          d="M94 76H6C2.68629 76 0 78.6863 0 82V94C0 97.3137 2.68629 100 6 100H94C97.3137 100 100 97.3137 100 94V82C100 78.6863 97.3137 76 94 76Z"
          fill={hovered.value ? props.hoveredFill || props.fill : props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_7_20">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
