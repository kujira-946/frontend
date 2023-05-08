import { useSignal } from "@preact/signals-react";

import { SVGProps } from "@/utils/types";

export const Overview = (props: SVGProps) => {
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
      <path
        d="M44.4444 5.55499H100V16.6661H44.4444V5.55499ZM44.4444 27.7772H77.7778V38.8883H44.4444V27.7772ZM44.4444 61.1105H100V72.2217H44.4444V61.1105ZM44.4444 83.3328H77.7778V94.4439H44.4444V83.3328ZM0 5.55499H33.3333V38.8883H0V5.55499ZM11.1111 16.6661V27.7772H22.2222V16.6661H11.1111ZM0 61.1105H33.3333V94.4439H0V61.1105ZM11.1111 72.2217V83.3328H22.2222V72.2217H11.1111Z"
        fill={hovered.value ? props.hoveredFill || props.fill : props.fill}
      />
    </svg>
  );
};
