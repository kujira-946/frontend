import styled from "styled-components";
import { useContext } from "react";
import { useSignal } from "@preact/signals-react";

import * as Icons from "@/components/icons";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.article`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.six} ${Styles.pxAsRem.eight};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

const DragButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: ${Styles.pxAsRem.four};
`;

type CategoryButtonProps = { category: Types.Category };
const CategoryButton = styled.button<CategoryButtonProps & ThemeProps>`
  ${Styles.clearButton};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.25rem;
  padding: ${Styles.pxAsRem.two} ${Styles.pxAsRem.four};
  color: ${(props: CategoryButtonProps & ThemeProps) => {
    if (props.category === "Need") return props.theme.need;
    else if (props.category === "Planned") return props.theme.planned;
    else if (props.category === "Impulse") return props.theme.impulse;
    else return props.theme.regret;
  }};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border: ${(props: ThemeProps) => props.theme.backgroundThree} solid 1px;
  border-radius: ${Styles.pxAsRem.four};
  font-size: ${Styles.pxAsRem.ten};
  font-weight: ${Styles.fontWeights.semiBold};

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
      border: ${(props: ThemeProps) => props.theme.backgroundSix} solid 1px;
    }
  }
`;

type InputProps = { hasValue: boolean; frozen: boolean };
const Input = styled.input<InputProps>`
  flex: 1;
  padding: ${Styles.pxAsRem.four} ${Styles.pxAsRem.six};
  color: ${(props: ThemeProps) => props.theme.text};
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
  border-radius: ${Styles.pxAsRem.four};
  outline: none;

  ::placeholder {
    ${(props: ThemeProps) => props.theme.backgroundSeven};
  }

  @media (hover: hover) {
    :hover {
      background-color: ${(props: InputProps & ThemeProps) => {
        return !props.frozen && props.theme.backgroundThree;
      }};
      border: ${(props: InputProps & ThemeProps) => {
        return !props.frozen && `${props.theme.backgroundSix} solid 1px`;
      }};
    }
  }

  :active {
    border: ${(props: ThemeProps) => props.theme.backgroundSix} solid 1px;
  }

  ${(props) => props.frozen && Styles.preventUserInteraction};
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  borderRadius?: keyof typeof Styles.pxAsRem;
  hideDrag?: true;
  hideCategories?: true;
  hideClose?: true;
  descriptionFrozen?: true;
  costFrozen?: true;
};

const categories: Types.Category[] = ["Need", "Planned", "Impulse", "Regret"];

export const PurchaseCell = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);

  const dragHovered = useSignal(false);
  function setDragHovered(hover: boolean): void {
    dragHovered.value = hover;
  }

  const description = useSignal("");
  function setDescription(event: Types.Input) {
    description.value = event.currentTarget.value;
  }

  const cost = useSignal("");
  function setCost(event: Types.Input) {
    cost.value = event.currentTarget.value;
  }

  const closeHovered = useSignal(false);
  function setCloseHovered(hover: boolean): void {
    closeHovered.value = hover;
  }

  return (
    <Container
      style={{
        borderRadius: props.borderRadius
          ? Styles.pxAsRem[props.borderRadius]
          : Styles.pxAsRem.six,
      }}
    >
      {!props.hideDrag && (
        <DragButton
          onMouseEnter={() => setDragHovered(true)}
          onMouseLeave={() => setDragHovered(false)}
        >
          <Icons.Drag
            height={12}
            fill={Styles.background[ui.theme.value].six}
            hovered={dragHovered.value}
            hoveredFill={Styles.background[ui.theme.value].eight}
          />
        </DragButton>
      )}

      {!props.hideCategories && (
        <CategoryButtons>
          {categories.map((category: Types.Category) => {
            return (
              <CategoryButton
                key={`purchase-cell-${category}`}
                category={category}
              >
                {category}
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
        frozen={!!props.descriptionFrozen}
      />

      <Input
        key="purchase-cell-cost-input"
        onChange={setCost}
        value={cost.value}
        placeholder="Cost"
        hasValue={cost.value.length > 0}
        frozen={!!props.costFrozen}
      />

      {!props.hideClose && (
        <CloseButton
          onMouseEnter={() => setCloseHovered(true)}
          onMouseLeave={() => setCloseHovered(false)}
        >
          <Icons.Close
            height={12}
            fill={Styles.background[ui.theme.value].six}
            hovered={closeHovered.value}
            hoveredFill={Styles.background[ui.theme.value].eight}
          />
        </CloseButton>
      )}
    </Container>
  );
};
