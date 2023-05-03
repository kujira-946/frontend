import styled from "styled-components";
import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = { selected: boolean };

const Container = styled.section<ContainerProps>`
  ${Styles.transition};
  display: flex;
  justify-content: center;
  align-items: center;
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
  category?: Types.Category;
  selectAction?: (purchaseId: number) => void;
  description: string;
  setDescription: (event: Types.Input) => void;
  cost: string;
  setCost: (event: Types.Input) => void;
  deletePurchase: (purchaseId: number) => void;

  showDrag?: boolean;
  showCheck?: boolean;
  showCategories?: boolean;
  showDelete?: boolean;
};

export const PurchaseCellNew = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;

  const selected = useSignal(false);
  const description = useSignal(props.description);
  const cost = useSignal(props.cost);
  const costError = useSignal(false);

  effect(() => {
    if ((!Number(cost.value) && cost.value !== "") || Number(cost.value) < 0) {
      costError.value = true;
    } else {
      costError.value = false;
    }
  });

  return (
    <Container selected={selected.value}>
      {/* Drag */}
      {props.showDrag && theme.value && (
        <Globals.IconContainer cursor="grab">
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
      {props.showCheck &&
        props.selectAction &&
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
      {props.showCategories &&
        (!props.category ? (
          <CategoryButtons>
            {categories.map((category: (typeof categories)[number]) => {
              return (
                <CategoryButton
                  key={`purchase-cell-category-button-${category}-${props.purchaseId}`}
                  type="button"
                  category={category}
                  tabIndex={-1}
                >
                  {category.slice(0, 1).toUpperCase() + category.slice(1)}
                </CategoryButton>
              );
            })}
          </CategoryButtons>
        ) : (
          <CategoryButton
            key={`purchase-cell-category-button-${props.category}-${props.purchaseId}`}
            type="button"
            category={props.category}
            tabIndex={-1}
          >
            {props.category.slice(0, 1).toUpperCase() + props.category.slice(1)}
          </CategoryButton>
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
        borderRadius="four"
        type="medium"
        isCost
      />

      {/* Delete */}
      {props.showDelete && theme.value && (
        <Globals.IconContainer
          onClick={() => props.deletePurchase(props.purchaseId)}
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
