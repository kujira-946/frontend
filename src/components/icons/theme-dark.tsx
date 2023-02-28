import styled from "styled-components";

import { SVGProps } from "@/utils/types";

export const ThemeDark = (props: SVGProps) => {
  return (
    <svg
      width="auto"
      height={props.height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.7014 12.4062C31.5474 50.1251 58.4608 74.4873 78.0206 81.4407C71.0671 86.8935 62.4128 89.995 53.3583 89.995C31.2972 89.995 13.3383 72.036 13.3383 49.975C13.3383 32.7164 24.3438 17.959 39.7014 12.4062ZM53.3082 0C25.3443 0 3.33325 22.6613 3.33325 49.975C3.33325 77.5888 25.7445 100 53.3583 100C71.9175 100 88.0256 89.895 96.6799 74.8874C59.1111 73.6368 36.1997 32.7164 55.0591 0C54.4588 0 53.9085 0 53.3082 0Z"
        fill={props.fill}
      />
    </svg>
  );
};
