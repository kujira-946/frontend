import { useSignal } from "@preact/signals-react";

import { SVGProps } from "@/utils/types";

export const Filter = (props: SVGProps) => {
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
      <g clipPath="url(#clip0_614_434)">
        <path
          d="M0 77.7778V88.8889H33.3333V77.7778H0ZM0 11.1111V22.2222H55.5556V11.1111H0ZM55.5556 100V88.8889H100V77.7778H55.5556V66.6667H44.4444V100H55.5556ZM22.2222 33.3333V44.4444H0V55.5556H22.2222V66.6667H33.3333V33.3333H22.2222ZM100 55.5556V44.4444H44.4444V55.5556H100ZM66.6667 33.3333H77.7778V22.2222H100V11.1111H77.7778V0H66.6667V33.3333Z"
          fill={hovered.value ? props.hoveredFill || props.fill : props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_614_434">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
