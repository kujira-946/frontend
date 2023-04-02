import { SVGProps } from "@/utils/types";

export const Add = (props: SVGProps) => {
  return (
    <svg
      width={props.width || "auto"}
      height={props.height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_617_7)">
        <path
          d="M41.7926 0V41.793H0V58.2074H41.7926V100H58.207V58.2074H100V41.793H58.207V0H41.7926Z"
          fill={props.hovered ? props.hoveredFill : props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_617_7">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
