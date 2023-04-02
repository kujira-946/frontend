import styled, { keyframes } from "styled-components";

import * as Types from "@/utils/types";

const effect = keyframes`
	0% { background-position: -1200px 0 }
	100% { background-position: 1200px 0 }
`;

type Props = {
  width?: Types.PxAsRem;
  height?: Types.PxAsRem;
  borderRadius?: Types.PxAsRem;
};

export const Shimmer = styled.div<Props>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  border-radius: ${(props) => props.borderRadius || "0px"};
  animation: ${effect} 2.2s linear infinite;
  background: linear-gradient(to right, #f6f6f6 8%, #f0f0f0 18%, #f6f6f6 33%);
  background-color: #ddd;
  background-size: ${(props) => props.height} 100%;
  /* background-size: 1200px 100%; */

  border: red solid 1px;
`;
