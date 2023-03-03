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

const Container = styled.article`
  border-radius: ${Sizes.pxAsRem.six};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${Sizes.pxAsRem.twelve};
  padding: ${Sizes.pxAsRem.ten} ${Sizes.pxAsRem.twelve};
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
  name: string;
  cost: number;
};

export const Dropdown = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);

  const open = useSignal(false);
  function toggleOpen(): void {
    open.value = !open.value;
  }

  // TODO : Uncomment these when dropdown name edit feature is added to the backend.
  // const name = useSignal("");
  // function setName(event: Types.Input) {
  //   name.value = event.currentTarget.value;
  // }

  return (
    <Container>
      <Header>
        <HeaderName value={props.name} />
        <HeaderCost>{props.cost}</HeaderCost>
      </Header>

      <Body>
        <PurchaseCells>{fjiojewia.map((foo: bar) => {
					return <Logbook.PurchaseCell />
				})}</PurchaseCells>
        <AddButton>
          <Icons.Add
            height={12}
            fill={Colors.background[ui.theme.value].eight}
          />{" "}
          Add
        </AddButton>
      </Body>
    </Container>
  );
};
