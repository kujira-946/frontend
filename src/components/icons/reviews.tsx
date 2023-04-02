import { SVGProps } from "@/utils/types";

export const Reviews = (props: SVGProps) => {
  return (
    <svg
      width={props.width || "100%"}
      height={props.height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_621_2)">
        <path
          d="M88.8889 11.1111V88.8889H11.1111V11.1111H88.8889ZM88.8889 0H11.1111C5 0 0 5 0 11.1111V88.8889C0 95 5 100 11.1111 100H88.8889C95 100 100 95 100 88.8889V11.1111C100 5 95 0 88.8889 0Z"
          fill={props.hovered ? props.hoveredFill : props.fill}
        />
        <path
          d="M61.1115 77.7778H22.2227V66.6667H61.1115V77.7778ZM77.7782 55.5556H22.2227V44.4445H77.7782V55.5556ZM77.7782 33.3333H22.2227V22.2222H77.7782V33.3333Z"
          fill={props.hovered ? props.hoveredFill : props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_621_2">
          <rect width="100" height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
