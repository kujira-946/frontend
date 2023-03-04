import styled from "styled-components";
import { useContext } from "react";
import { useSignal } from "@preact/signals-react";

import * as Logbook from "@/components/logbook";
import * as Icons from "@/components/icons";
import * as Styles from "@/utils/styles";
import * as Colors from "@/utils/colors";
import * as Sizes from "@/utils/sizes";
import * as Types from "@/types";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = { open: boolean };
const Container = styled.article<ContainerProps>`
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border: ${(props: ContainerProps & ThemeProps) => {
    return props.open
      ? `${props.theme.backgroundSix} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  border-radius: ${Sizes.pxAsRem.six};
  /* overflow: hidden; */
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${Sizes.pxAsRem.twelve};
  padding: ${Sizes.pxAsRem.ten} ${Sizes.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  color: ${(props: ThemeProps) => props.theme.text};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

const HeaderName = styled.input`
  ${Styles.inputStyles("three")};
  padding: ${Sizes.pxAsRem.four} ${Sizes.pxAsRem.six};
  font-size: ${Sizes.pxAsRem.twelve};
  font-weight: ${Sizes.fontWeights.semiBold};
`;

const HeaderCost = styled.span`
  font-size: ${Sizes.pxAsRem.twelve};
  font-weight: ${Sizes.fontWeights.medium};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Sizes.pxAsRem.eight};
  padding: ${Sizes.pxAsRem.eight};
`;

const PurchaseCells = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Sizes.pxAsRem.four};
`;

const AddButton = styled.button`
  ${(props: ThemeProps) => {
    return Styles.setButton(
      "small",
      props.theme.backgroundFour,
      props.theme.backgroundFive,
      false,
      "four"
    );
  }};
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

// TODO : Set `name` value to "" after adding in the ability to edit an overview dropdown name, post MVP.
// TODO : After adding in the above feature, remove the `name` prop.

type Props = {
  headerTitle: string;
  headerCost: number;
  children?: React.ReactNode;
};

export const Dropdown = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);

  const open = useSignal(false);
  function toggleOpen(): void {
    open.value = !open.value;
  }

  // TODO : Uncomment these when dropdown name edit feature is added to the backend.
  // const headerTitle = useSignal("");
  // function setName(event: Types.Input) {
  //   headerTitle.value = event.currentTarget.value;
  // }

  return (
    <Container open={open.value}>
      <Header>
        <HeaderName readOnly={true} value={props.headerTitle} />
        <HeaderCost>${props.headerCost}</HeaderCost>
      </Header>

      <Body>
        <PurchaseCells>{props.children}</PurchaseCells>
        <AddButton>
          <Icons.Add
            height={12}
            fill={Colors.background[ui.theme.value].eight}
          />
          Add
        </AddButton>
      </Body>
    </Container>
  );
};
