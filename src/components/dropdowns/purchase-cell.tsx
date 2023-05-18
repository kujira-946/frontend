import styled from "styled-components";
import { memo, useEffect } from "react";
import { effect, useSignal } from "@preact/signals-react";
import { DraggableProvided } from "react-beautiful-dnd";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = { selected: boolean };

const Container = styled.section<ContainerProps>`
  ${Styles.transition};
  display: flex;
  gap: ${Styles.pxAsRem.eight};
  width: 100%;
  padding: ${Styles.pxAsRem.six} ${Styles.pxAsRem.eight};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border: ${(props: ContainerProps & ThemeProps) => {
    return props.selected
      ? `${props.theme.primaryMain} solid 1px`
      : "transparent solid 1px";
  }};
  border-radius: ${Styles.pxAsRem.six};
`;

const CategoryButtons = styled.article`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.four};
`;

type CategoryButtonProps = { category: Types.Category };

const CategoryButton = styled.button<CategoryButtonProps>`
  ${Styles.clearButton};
  ${Styles.transition};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.25rem;
  padding: ${Styles.pxAsRem.two} ${Styles.pxAsRem.four};
  color: ${(props: CategoryButtonProps & ThemeProps) => {
    if (props.category === "need") return props.theme.need;
    else if (props.category === "planned") return props.theme.planned;
    else return props.theme.impulse;
  }};
  background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
  border: ${(props: ThemeProps) => `${props.theme.backgroundSix} solid 1px`};
  border-radius: ${Styles.pxAsRem.four};
  font-size: ${Styles.pxAsRem.ten};
  font-weight: ${Styles.fontWeights.semiBold};

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => {
        return props.theme.backgroundFour;
      }};
    }
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

const categories: Types.Category[] = ["need", "planned", "impulse"];

type Props = {
  purchaseId: number;
  provided?: DraggableProvided;
  selectAction?: (purchaseId: number) => void;
  category: Types.Category | null;
  setPurchaseCategory?: (purchaseId: number, category: Types.Category) => void;

  description: string;
  cost: number;
  updatePurchase: (
    purchaseId: number,
    purchaseDescription: string,
    purchaseCost: number,
    description: string,
    cost: string
  ) => void;
  deletePurchase: (purchaseId: number, purchaseCost: number) => void;
  showDelete?: true;
};

const ExportedComponent = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;

  const selected = useSignal(false);
  const showCategoryButtons = useSignal(!props.category);
  const description = useSignal(props.description);
  const cost = useSignal(
    props.cost ? Functions.roundNumber(props.cost, 2) : ""
  );
  const costError = useSignal(false);

  useEffect(() => {
    props.updatePurchase(
      props.purchaseId,
      props.description,
      props.cost,
      description.value,
      cost.value
    );
  }, [description.value, cost.value]);

  effect(() => {
    if (!Number(cost.value) || Number(cost.value) < 0) {
      costError.value = true;
    } else {
      costError.value = false;
    }
  });

  return (
    <Container selected={selected.value}>
      {/* Drag */}
      {props.provided && theme.value && (
        <Globals.IconContainer
          {...props.provided.dragHandleProps}
          tabIndex={-1}
          cursor="grab"
        >
          <Icons.Drag
            width={14}
            height={14}
            fill={Styles.background[theme.value].eight}
            hoveredFill={Styles.text[theme.value]}
            addHover
          />
        </Globals.IconContainer>
      )}

      {/* Check */}
      {props.selectAction &&
        theme.value &&
        (selected.value ? (
          <Globals.IconContainer
            onClick={() => {
              selected.value = false;
              if (props.selectAction) props.selectAction(props.purchaseId);
            }}
          >
            <Icons.CheckboxActive
              width={14}
              height={14}
              fill={Styles.primary[theme.value].main}
              hoveredFill={Styles.primary[theme.value].darker}
              addHover
            />
          </Globals.IconContainer>
        ) : (
          <Globals.IconContainer
            onClick={() => {
              selected.value = true;
              if (props.selectAction) props.selectAction(props.purchaseId);
            }}
          >
            <Icons.CheckboxInactive
              width={14}
              height={14}
              fill={Styles.background[theme.value].eight}
              hoveredFill={Styles.text[theme.value]}
              addHover
            />
          </Globals.IconContainer>
        ))}

      {/* Categories */}
      {props.setPurchaseCategory &&
        (props.category && !showCategoryButtons.value ? (
          <CategoryButton
            key={`purchase-cell-category-button-${props.category}-${props.purchaseId}`}
            type="button"
            category={props.category}
            onClick={() => (showCategoryButtons.value = true)}
            tabIndex={-1}
            style={{ alignSelf: "center" }}
          >
            {props.category.slice(0, 1).toUpperCase() + props.category.slice(1)}
          </CategoryButton>
        ) : (
          showCategoryButtons.value && (
            <CategoryButtons>
              {categories.map((category: Types.Category) => {
                return (
                  <CategoryButton
                    key={`purchase-cell-category-button-${category}-${props.purchaseId}`}
                    type="button"
                    onClick={() => {
                      if (props.setPurchaseCategory) {
                        props.setPurchaseCategory(props.purchaseId, category);
                        showCategoryButtons.value = false;
                      }
                    }}
                    category={category}
                    tabIndex={-1}
                  >
                    {category.slice(0, 1).toUpperCase() + category.slice(1)}
                  </CategoryButton>
                );
              })}
            </CategoryButtons>
          )
        ))}

      {/* Description */}
      <Globals.MiniInput
        userInput={description.value}
        setUserInput={(event: Types.Input) => {
          description.value = event.currentTarget.value;
        }}
        placeholder="Description"
        borderRadius="four"
        type="medium"
      />

      {/* Cost */}
      <Globals.MiniInput
        userInput={cost.value}
        setUserInput={(event: Types.Input) => {
          cost.value = event.currentTarget.value;
        }}
        placeholder="Cost"
        error={costError.value}
        onBlur={() => {
          if (!costError.value) {
            cost.value = Functions.roundNumber(Number(cost.value), 2);
          }
        }}
        borderRadius="four"
        type="medium"
        isCost
      />

      {/* Delete */}
      {props.showDelete && theme.value && (
        <Globals.IconContainer
          onClick={() =>
            props.deletePurchase(props.purchaseId, Number(props.cost))
          }
        >
          <Icons.Close
            width={14}
            height={14}
            fill={Styles.background[theme.value].eight}
            hoveredFill={Styles.text[theme.value]}
            addHover
          />
        </Globals.IconContainer>
      )}
    </Container>
  );
};

export const PurchaseCell = memo(ExportedComponent);
