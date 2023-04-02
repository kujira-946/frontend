import { SVGProps } from "@/utils/types";

export const ArrowRight = (props: SVGProps) => {
  return (
    <svg
      width={props.width || "100%"}
      height={props.height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M76.0625 56.25L53.6875 78.6875L62.5 87.5L100 50L62.5 12.5L53.6875 21.3125L76.0625 43.75H0V56.25H76.0625Z"
        fill={props.hovered ? props.hoveredFill : props.fill}
      />
    </svg>
  );
};
