import styled from "styled-components";
import { useContext } from "react";
import { useSignal } from "@preact/signals-react";

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
  display: flex;
  align-items: center;
  gap: ${Sizes.pxAsRem.eight};
  padding: ${Sizes.pxAsRem.six} ${Sizes.pxAsRem.eight};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: ${Sizes.pxAsRem.four};
`;

type CategoryButtonProps = { category: Types.Category };
const CategoryButton = styled.button<CategoryButtonProps & ThemeProps>`
  ${Styles.basicButtonStyles};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${Sizes.pxAsRem.two} ${Sizes.pxAsRem.four};
  color: ${(props: CategoryButtonProps & ThemeProps) => {
    if (props.category === "need") return props.theme.need;
    else if (props.category === "planned") return props.theme.planned;
    else return props.theme.impulse;
  }};
  border-radius: ${Sizes.pxAsRem.four};
  font-size: ${Sizes.pxAsRem.ten};
  font-weight: ${Sizes.fontWeights.semiBold};
`;

type InputProps = { hasValue: boolean; frozen: boolean };
const Input = styled.input<InputProps>`
  background-color: ${(props: InputProps & ThemeProps) => {
    return props.hasValue
      ? props.theme.backgroundTwo
      : props.theme.backgroundOne;
  }};
  border: ${(props: InputProps & ThemeProps) => {
    return props.frozen
      ? `${props.theme.backgroundOne} solid 1px`
      : props.hasValue
      ? `${props.theme.backgroundTwo} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  border-radius: ${Sizes.pxAsRem.four};

  ::placeholder {
    ${(props: ThemeProps) => props.theme.backgroundSeven};
  }

  :hover {
    background-color: ${(props: InputProps & ThemeProps) => {
      return !props.frozen && props.theme.backgroundThree;
    }};
    border: ${(props: InputProps & ThemeProps) => {
      return !props.frozen && `${props.theme.backgroundSix} solid 1px`;
    }};
  }

  :active {
    border: ${(props: ThemeProps) => props.theme.backgroundSix} solid 1px;
  }

  ${(props) => props.frozen && Styles.preventUserInput};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  borderRadius: keyof typeof Sizes.pxAsRem;
  hideDrag: boolean;
  hideCategories: boolean;
  hideClose: boolean;

  descriptionFrozen: boolean;
  costFrozen: boolean;
};

const categories: Types.Category[] = ["need", "planned", "impulse"];

export const PurchaseCell = ({
  borderRadius = "six",
  hideDrag = false,
  hideCategories = false,
  hideClose = false,
  ...props
}: Props) => {
  const { ui } = useContext(SignalsStoreContext);

  const description = useSignal("");
  function setDescription(event: Types.Input) {
    description.value = event.currentTarget.value;
  }

  const cost = useSignal("");
  function setCost(event: Types.Input) {
    cost.value = event.currentTarget.value;
  }

  return (
    <Container style={{ borderRadius: Sizes.pxAsRem[borderRadius] }}>
      {!hideDrag && (
        <Icons.Drag height={10} fill={Colors.background[ui.theme.value].six} />
      )}

      {!hideCategories && (
        <CategoryButtons>
          {categories.map((category: Types.Category) => {
            return (
              <CategoryButton
                key={`purchase-cell-${category}`}
                category={category}
              >
                {category.toUpperCase()}
              </CategoryButton>
            );
          })}
        </CategoryButtons>
      )}

      <Input
        key="purchase-cell-description-input"
        onChange={setDescription}
        value={description.value}
        placeholder="Description"
        hasValue={description.value.length > 0}
        frozen={props.descriptionFrozen}
      />

      <Input
        key="purchase-cell-cost-input"
        onChange={setCost}
        value={cost.value}
        placeholder="Cost"
        hasValue={cost.value.length > 0}
        frozen={props.costFrozen}
      />

      {!hideClose && (
        <Icons.Close height={10} fill={Colors.background[ui.theme.value].six} />
      )}
    </Container>
  );
};
