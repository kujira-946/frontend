import { SVGProps } from "@/utils/types";

export const ChevronRight = (props: SVGProps) => {
  return (
    <svg
      width={props.width || "auto"}
      height={props.height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_711_36)">
        <path
          d="M30.875 0L19.125 11.75L57.2917 50L19.125 88.25L30.875 100L80.875 50L30.875 0Z"
          fill={props.hovered ? props.hoveredFill : props.fill}
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
