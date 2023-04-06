import { useSignal } from "@preact/signals-react";

import { SVGProps } from "@/utils/types";

export const Dashboard = (props: SVGProps) => {
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
      <g clipPath="url(#clip0_802_44)">
        <path
          d="M88.8889 100H11.1111C4.97461 100 0 95.0254 0 88.8889V11.1111C0 4.97461 4.97461 0 11.1111 0H88.8889C95.0254 0 100 4.97461 100 11.1111V88.8889C100 95.0254 95.0254 100 88.8889 100ZM38.8889 11.1111V88.8889H88.8889V11.1111H38.8889ZM11.1111 11.1111V88.8889H27.7778V11.1111H11.1111Z"
          fill={hovered.value ? props.hoveredFill : props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_802_44">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
