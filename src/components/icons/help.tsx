import { SVGProps } from "@/utils/types";

export const Help = (props: SVGProps) => {
  return (
    <svg
      width="auto"
      height={props.height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_902_10)">
        <path
          d="M45 80H55V70H45V80ZM50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM50 90C27.95 90 10 72.05 10 50C10 27.95 27.95 10 50 10C72.05 10 90 27.95 90 50C90 72.05 72.05 90 50 90ZM50 20C38.95 20 30 28.95 30 40H40C40 34.5 44.5 30 50 30C55.5 30 60 34.5 60 40C60 50 45 48.75 45 65H55C55 53.75 70 52.5 70 40C70 28.95 61.05 20 50 20Z"
          fill={props.hovered ? props.hoveredFill : props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_902_10">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
