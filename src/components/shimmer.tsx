import styled, { keyframes } from "styled-components";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";

type Props = {
  width?: number;
  height?: number;
  borderRadius?: Types.PxAsRem;
};

const effect = keyframes`
  from { background-position: -1200px 0 };
  to { background-position: 1200px 0 };
`;

export const Shimmer = styled.div<Props>`
  width: ${(props) => `${props.width}px` || "100%"};
  height: ${(props) => `${props.height}px` || "100%"};
  background: ${(props: ThemeProps) => {
    return `linear-gradient(
			to right,
			${props.theme.backgroundThree} 8%,
			${props.theme.backgroundFour} 18%,
			${props.theme.backgroundThree} 33%)`;
  }};
  background-size: 1200px 100%;
  border-radius: ${(props) => {
    return props.borderRadius ? Styles.pxAsRem[props.borderRadius] : "0px";
  }};
  animation: ${effect} 2.2s linear infinite;
`;

export const PurchaseShimmer = (props: { borderRadius?: Types.PxAsRem }) => (
  <Shimmer borderRadius={props.borderRadius || "four"} height={40} />
);

export const OverviewShimmer = () => <Shimmer borderRadius="six" height={44} />;

export const LogbookEntryShimmer = () => (
  <Shimmer borderRadius="eight" height={84} />
);
