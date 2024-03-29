import { useSignal } from "@preact/signals-react";

import { SVGProps } from "@/utils/types";

export const Drag = (props: SVGProps) => {
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
      <g clipPath="url(#clip0_618_9)">
        <path
          d="M43.75 87.5C43.75 94.375 38.125 100 31.25 100C24.375 100 18.75 94.375 18.75 87.5C18.75 80.625 24.375 75 31.25 75C38.125 75 43.75 80.625 43.75 87.5ZM31.25 37.5C24.375 37.5 18.75 43.125 18.75 50C18.75 56.875 24.375 62.5 31.25 62.5C38.125 62.5 43.75 56.875 43.75 50C43.75 43.125 38.125 37.5 31.25 37.5ZM31.25 0C24.375 0 18.75 5.625 18.75 12.5C18.75 19.375 24.375 25 31.25 25C38.125 25 43.75 19.375 43.75 12.5C43.75 5.625 38.125 0 31.25 0ZM68.75 25C75.625 25 81.25 19.375 81.25 12.5C81.25 5.625 75.625 0 68.75 0C61.875 0 56.25 5.625 56.25 12.5C56.25 19.375 61.875 25 68.75 25ZM68.75 37.5C61.875 37.5 56.25 43.125 56.25 50C56.25 56.875 61.875 62.5 68.75 62.5C75.625 62.5 81.25 56.875 81.25 50C81.25 43.125 75.625 37.5 68.75 37.5ZM68.75 75C61.875 75 56.25 80.625 56.25 87.5C56.25 94.375 61.875 100 68.75 100C75.625 100 81.25 94.375 81.25 87.5C81.25 80.625 75.625 75 68.75 75Z"
          fill={hovered.value ? props.hoveredFill || props.fill : props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_618_9">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
