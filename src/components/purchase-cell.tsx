import styled from "styled-components";
import { memo, useEffect } from "react";
import { effect, Signal, useSignal } from "@preact/signals-react";
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

type ContainerProps = {
  borderRadius?: Types.PxAsRem;
  selected: boolean;
  isError?: boolean;
};

const Container = styled.article<ContainerProps>`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.six} ${Styles.pxAsRem.eight};
  background-color: ${(props: ContainerProps & ThemeProps) => {
    return props.selected
      ? props.theme.backgroundTwo
      : props.theme.backgroundOne;
  }};
  border: ${(props: ContainerProps & ThemeProps) => {
    return props.isError
      ? `${props.theme.failure} solid 1px`
      : props.selected
      ? `${props.theme.secondaryMain} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  border-radius: ${(props) => {
    return props.borderRadius
      ? Styles.pxAsRem[props.borderRadius]
      : Styles.pxAsRem.six;
  }};
`;

const DragButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
`;

const CheckButton = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: ${Styles.pxAsRem.four};
`;

type CategoryButtonProps = {
  category: Types.Category;
};

const CategoryButton = styled.button<CategoryButtonProps & ThemeProps>`
  ${Styles.clearButton};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.25rem;
  padding: ${Styles.pxAsRem.two} ${Styles.pxAsRem.four};
  color: ${(props: CategoryButtonProps & ThemeProps) => {
    if (props.category === "need") return props.theme.need;
    else if (props.category === "planned") return props.theme.planned;
    else if (props.category === "impulse") return props.theme.impulse;
    else return props.theme.regret;
  }};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border: ${(props: ThemeProps) => props.theme.backgroundThree} solid 1px;
  border-radius: ${Styles.pxAsRem.four};
  font-size: ${Styles.pxAsRem.ten};
  font-weight: ${Styles.fontWeights.semiBold};

  ${Styles.transition};

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
      border: ${(props: ThemeProps) => props.theme.backgroundSix} solid 1px;
    }
  }
`;

const Inputs = styled.div`
  display: flex;
  gap: ${Styles.pxAsRem.eight};
  width: 100%;
`;

const DeleteButton = styled.button`
  ${Styles.clearButton};
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
  provided?: DraggableProvided;
  purchaseId?: number;
  category?: Types.Category;
  description: string;
  cost: string;

  costLimit?: number;
  higherCostError?: string;
  disableSubmit?: Signal<boolean>;
  isError?: boolean;

  setPurchaseCategory?: (purchaseId: number, category: Types.Category) => void;
  costUpdate?: (cost: string, costError?: Signal<string>) => void;
  update?: (purchaseId: number, description: string, cost: string) => void;
  delete?: (purchaseId: number) => void;
  onCheckActive?: (purchaseId: number) => void;
  onCheckInactive?: (purchaseId: number) => void;

  descriptionForwardText?: string;
  costForwardText?: string;
  costPlaceholder?: string;
  importance?: "Primary" | "Secondary";
  persistDescriptionInput?: true;
  persistCostInput?: true;

  hideDrag?: true;
  hideCheck?: true;
  hideCategories?: true;
  hideClose?: true;

  descriptionFrozen?: true;
  costFrozen?: true;
};

const categories: Types.Category[] = ["need", "planned", "impulse"];

const ExportedComponent = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;

  const checkboxActive = useSignal(false);
  const description = useSignal(props.description);
  const cost = useSignal(props.cost);
  const costError = useSignal("");
  const selectCategories = useSignal(!props.category);

  function updateDescription(event: Types.Input): void {
    description.value = event.currentTarget.value;
  }

  function updateCost(event: Types.Input): void {
    cost.value = event.currentTarget.value;
  }

  function onCostBlur(): void {
    if (!costError.value && cost.value !== "") {
      cost.value = Functions.roundNumber(Number(cost.value), 2);
    }
  }

  function deletePurchase(): void {
    if (props.delete && props.purchaseId) props.delete(props.purchaseId);
  }

  useEffect(() => {
    if (props.purchaseId) {
      if (checkboxActive.value && props.onCheckActive) {
        props.onCheckActive(props.purchaseId);
      } else if (!checkboxActive.value && props.onCheckInactive) {
        props.onCheckInactive(props.purchaseId);
      }
    }
  }, [checkboxActive.value]);

  useEffect(() => {
    if (props.update && props.purchaseId) {
      props.update(props.purchaseId, description.value, cost.value);
    } else if (props.costUpdate) {
      props.costUpdate(cost.value);
    }
  }, [description.value, cost.value]);

  useEffect(() => {
    if (props.disableSubmit) props.disableSubmit.value = !!costError.value;
  }, [props.disableSubmit]);

  effect(() => {
    if (Number(cost.value) === 0) {
      costError.value = "";
    } else if (cost.value !== "") {
      if (!Number(cost.value)) {
        costError.value = "Must be a number.";
      } else if (Number(cost.value) < 0) {
        costError.value = "Please use positive values.";
      } else if (props.costLimit && Number(cost.value) > props.costLimit) {
        costError.value =
          props.higherCostError || `Can't be greater than ${props.costLimit}.`;
      } else {
        costError.value = "";
      }
    } else {
      costError.value = "";
    }
  });

  return (
    <Container
      borderRadius={props.borderRadius}
      selected={checkboxActive.value}
      isError={props.isError}
    >
      {!props.hideDrag && props.provided && theme.value && (
        <DragButton {...props.provided.dragHandleProps} tabIndex={-1}>
          <Icons.Drag
            height={12}
            fill={Styles.background[theme.value].six}
            hoveredFill={Styles.background[theme.value].eight}
            addHover
          />
        </DragButton>
      )}

      {!props.hideCheck && theme.value && (
        <CheckButton
          tabIndex={-1}
          onClick={() => {
            checkboxActive.value = !checkboxActive.value;
          }}
        >
          {checkboxActive.value ? (
            <Icons.CheckboxActive
              height={20}
              fill={Styles.secondary[theme.value].main}
              hoveredFill={Styles.text[theme.value]}
              addHover
            />
          ) : (
            <Icons.CheckboxInactive
              height={20}
              fill={Styles.background[theme.value].seven}
              hoveredFill={Styles.text[theme.value]}
              addHover
            />
          )}
        </CheckButton>
      )}

      {!props.hideCategories && props.category && !selectCategories.value && (
        <CategoryButton
          tabIndex={-1}
          onClick={() => (selectCategories.value = true)}
          category={props.category}
        >
          {props.category.slice(0, 1).toUpperCase() + props.category.slice(1)}
        </CategoryButton>
      )}

      {!props.hideCategories &&
        props.purchaseId &&
        props.setPurchaseCategory &&
        selectCategories.value && (
          <CategoryButtons>
            {categories.map((category: Types.Category) => {
              return (
                <CategoryButton
                  key={`purchase-cell-${category}`}
                  tabIndex={-1}
                  onClick={() => {
                    props.setPurchaseCategory(props.purchaseId, category);
                    selectCategories.value = false;
                  }}
                  category={category}
                >
                  {category.slice(0, 1).toUpperCase() + category.slice(1)}
                </CategoryButton>
              );
            })}
          </CategoryButtons>
        )}

      <Inputs>
        <Globals.InputMini
          key={`purchase-cell-description-input`}
          borderRadius={props.borderRadius}
          placeholder="Description"
          userInput={
            props.persistDescriptionInput
              ? props.description
              : description.value
          }
          setUserInput={updateDescription}
          forwardText={props.descriptionForwardText}
          hasValue={!!props.description}
          frozen={!!props.descriptionFrozen}
        />

        <Globals.InputMini
          key={`purchase-cell-cost-input`}
          borderRadius={props.borderRadius}
          placeholder={props.costPlaceholder || "Cost"}
          errorMessage={costError.value}
          userInput={props.persistCostInput ? props.cost : cost.value}
          setUserInput={updateCost}
          onBlur={onCostBlur}
          forwardText={props.costForwardText}
          importance={props.importance}
          hasValue={!!props.cost}
          frozen={!!props.costFrozen}
        />
      </Inputs>

      {!props.hideClose && theme.value && (
        <DeleteButton
          type="button"
          name="Purchase Cell Delete Button"
          tabIndex={-1}
          onClick={deletePurchase}
        >
          <Icons.Close
            height={12}
            fill={Styles.background[theme.value].seven}
            hoveredFill={Styles.text[theme.value]}
            addHover
          />
        </DeleteButton>
      )}
    </Container>
  );
};

export const PurchaseCell = memo(ExportedComponent);
