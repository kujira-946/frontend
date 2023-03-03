import styled from "styled-components";
import { useSignal } from "@preact/signals-react";

import * as Styles from "@/utils/styles";
import * as Sizes from "@/utils/sizes";
import * as Types from "@/types";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.header`
  display: flex;
  align-items: center;
  gap: ${Sizes.pxAsRem.twelve};
  padding: ${Sizes.pxAsRem.ten} ${Sizes.pxAsRem.twelve};
  color: ${(props: ThemeProps) => props.theme.text};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

const Name = styled.input`
  ${Styles.inputStyles("three")};
  padding: ${Sizes.pxAsRem.four} ${Sizes.pxAsRem.six};
  font-size: ${Sizes.pxAsRem.twelve};
  font-weight: ${Sizes.fontWeights.semiBold};
`;

const Cost = styled.span`
  font-size: ${Sizes.pxAsRem.twelve};
  font-weight: ${Sizes.fontWeights.medium};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  cost: number;
};

export const DropdownHeader = (props: Props) => {
  const name = useSignal("");

  function setName(event: Types.Input) {
    name.value = event.currentTarget.value;
  }

  return (
    <Container>
      <Name onChange={setName} value={name.value} />
      <Cost>${props.cost}</Cost>
    </Container>
  );
};
