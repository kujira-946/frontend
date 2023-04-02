import { SVGProps } from "@/utils/types";

export const Close = (props: SVGProps) => {
  return (
    <svg
      width={props.width || "auto"}
      height={props.height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_614_439)">
        <path
          d="M85.9 0L50 35.9L14.1 0L0 14.1L35.9 50L0 85.9L14.1 100L50 64.1L85.9 100L100 85.9L64.1 50L100 14.1L85.9 0Z"
          fill={props.hovered ? props.hoveredFill : props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_614_439">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
