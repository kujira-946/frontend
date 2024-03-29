import { useSignal } from "@preact/signals-react";

import { SVGProps } from "@/utils/types";

export const Revealed = (props: SVGProps) => {
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
        d="M50 25.0076C67.2273 25.0076 82.5909 34.6894 90.0909 50.0076C82.5909 65.3258 67.2273 75.0076 50 75.0076C32.7727 75.0076 17.4091 65.3258 9.90909 50.0076C17.4091 34.6894 32.7727 25.0076 50 25.0076ZM50 15.9167C27.2727 15.9167 7.86364 30.0531 0 50.0076C7.86364 69.9621 27.2727 84.0985 50 84.0985C72.7273 84.0985 92.1364 69.9621 100 50.0076C92.1364 30.0531 72.7273 15.9167 50 15.9167ZM50 38.644C56.2727 38.644 61.3636 43.7349 61.3636 50.0076C61.3636 56.2803 56.2727 61.3712 50 61.3712C43.7273 61.3712 38.6364 56.2803 38.6364 50.0076C38.6364 43.7349 43.7273 38.644 50 38.644ZM50 29.5531C38.7273 29.5531 29.5455 38.7349 29.5455 50.0076C29.5455 61.2803 38.7273 70.4621 50 70.4621C61.2727 70.4621 70.4545 61.2803 70.4545 50.0076C70.4545 38.7349 61.2727 29.5531 50 29.5531Z"
        fill={hovered.value ? props.hoveredFill || props.fill : props.fill}
      />
    </svg>
  );
};
