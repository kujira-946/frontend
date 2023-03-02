import { SVGProps } from "@/utils/types";

export const Hidden = (props: SVGProps) => {
  return (
    <svg
      width="auto"
      height={props.height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 22.6156C67.2273 22.6156 82.5909 32.2974 90.0909 47.6156C87.4091 53.161 83.6364 57.9337 79.1364 61.7974L85.5455 68.2065C91.8636 62.6156 96.8636 55.6156 100 47.6156C92.1364 27.661 72.7273 13.5246 50 13.5246C44.2273 13.5246 38.6818 14.4337 33.4545 16.1156L40.9545 23.6155C43.9091 23.0246 46.9091 22.6156 50 22.6156ZM45.1364 27.7974L54.5455 37.2065C57.1364 38.3428 59.2273 40.4337 60.3636 43.0246L69.7727 52.4337C70.1364 50.8883 70.4091 49.2519 70.4091 47.5701C70.4545 36.2974 61.2727 27.161 50 27.161C48.3182 27.161 46.7273 27.3883 45.1364 27.7974ZM4.59091 12.9337L16.7727 25.1156C9.36364 30.9337 3.5 38.661 0 47.6156C7.86364 67.5701 27.2727 81.7065 50 81.7065C56.9091 81.7065 63.5455 80.3883 69.6364 77.9792L85.1818 93.5246L91.5909 87.1155L11 6.47919L4.59091 12.9337ZM38.6818 47.0246L50.5455 58.8883C50.3636 58.9337 50.1818 58.9792 50 58.9792C43.7273 58.9792 38.6364 53.8883 38.6364 47.6156C38.6364 47.3883 38.6818 47.2519 38.6818 47.0246ZM23.2273 31.5701L31.1818 39.5246C30.1364 42.0246 29.5455 44.7519 29.5455 47.6156C29.5455 58.8883 38.7273 68.0701 50 68.0701C52.8636 68.0701 55.5909 67.4792 58.0455 66.4337L62.5 70.8883C58.5 71.9792 54.3182 72.6155 50 72.6155C32.7727 72.6155 17.4091 62.9337 9.90909 47.6156C13.0909 41.1156 17.7273 35.7519 23.2273 31.5701Z"
        fill={props.hovered ? props.hoveredFill : props.fill}
      />
    </svg>
  );
};