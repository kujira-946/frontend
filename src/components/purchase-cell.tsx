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

type Category = "Need" | "Planned" | "Impulse" | "Regret";

type CategoryButtonProps = { category: Category };
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
  index?: number;
  onboardingPurchases?: Signal<Types.OnboardingPurchase[]>;
  description: string;
  cost: string;
  disableSubmit?: Signal<boolean>;

  costUpdate?: (cost: string) => void;
  update?: (identifier: number, description: string, cost: string) => void;
  delete?: (identifier: number) => void;
  onCheckActive?: () => void;
  onCheckInactive?: () => void;

  descriptionForwardText?: string;
  costForwardText?: string;
  importance?: "Primary" | "Secondary";
  persistInput?: true;
  hideDrag?: true;
  hideCheck?: true;
  hideCategories?: true;
  hideClose?: true;
  descriptionFrozen?: true;
  costFrozen?: true;
};

const categories: Category[] = ["Need", "Planned", "Impulse", "Regret"];

const ExportedComponent = (props: Props) => {
  const { ui } = Functions.useSignalsStore();

  const checkboxActive = useSignal(false);
  const description = useSignal(props.description);
  const cost = useSignal(props.cost);
  const costError = useSignal("");

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
    if (props.delete) {
      if (props.purchaseId) props.delete(props.purchaseId);
      else if (props.index) props.delete(props.index);
    }
  }

  useEffect(() => {
    if (checkboxActive.value && props.onCheckActive) {
      props.onCheckActive();
    } else if (!checkboxActive.value && props.onCheckInactive) {
      props.onCheckInactive();
    }
  }, [checkboxActive.value, props.onCheckActive, props.onCheckInactive]);

  useEffect(() => {
    if (props.update) {
      if (props.purchaseId) {
        props.update(props.purchaseId, description.value, cost.value);
      } else if (props.index) {
        props.update(props.index, description.value, cost.value);
      }
    } else if (props.costUpdate) {
      props.costUpdate(cost.value);
    }
  }, [description.value, cost.value]);

  useEffect(() => {
    if (props.disableSubmit) props.disableSubmit.value = !!costError.value;
  }, [props.disableSubmit]);

  effect(() => {
    if (cost.value !== "") {
      if (cost.value === "0") {
        costError.value = "";
      } else if (!Number(cost.value)) {
        costError.value = "Must be a number.";
      } else if (Number(cost.value) < 0) {
        costError.value = "Please use positive values.";
      } else {
        costError.value = "";
      }
    }
  });

  return (
    <Container
      style={{
        borderRadius: props.borderRadius
          ? Styles.pxAsRem[props.borderRadius]
          : Styles.pxAsRem.six,
      }}
    >
      {!props.hideDrag && props.provided && (
        <DragButton {...props.provided.dragHandleProps} tabIndex={-1}>
          <Icons.Drag
            height={12}
            fill={Styles.background[ui.theme.value].six}
            hoveredFill={Styles.background[ui.theme.value].eight}
            addHover
          />
        </DragButton>
      )}

      {!props.hideCheck && (
        <CheckButton
          onClick={() => {
            checkboxActive.value = !checkboxActive.value;
          }}
        >
          {checkboxActive.value ? (
            <Icons.CheckboxActive
              height={20}
              fill={Styles.secondary[ui.theme.value].main}
            />
          ) : (
            <Icons.CheckboxInactive
              height={20}
              fill={Styles.background[ui.theme.value].seven}
              hoveredFill={Styles.text[ui.theme.value]}
              addHover
            />
          )}
        </CheckButton>
      )}

      {!props.hideCategories && (
        <CategoryButtons>
          {categories.map((category: Category) => {
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

      <Inputs>
        <Globals.InputMini
          key={`purchase-cell-description-input-${
            props.purchaseId || props.index
          }`}
          borderRadius={props.borderRadius}
          placeholder="Description"
          userInput={props.persistInput ? props.description : description.value}
          setUserInput={updateDescription}
          forwardText={props.descriptionForwardText}
          hasValue={!!props.description}
          frozen={!!props.descriptionFrozen}
        />

        <Globals.InputMini
          key={`purchase-cell-cost-input-${props.purchaseId || props.index}`}
          borderRadius={props.borderRadius}
          placeholder="Cost"
          errorMessage={costError.value}
          userInput={props.persistInput ? props.cost : cost.value}
          setUserInput={updateCost}
          onBlur={onCostBlur}
          forwardText={props.costForwardText}
          importance={props.importance}
          hasValue={!!props.cost}
          frozen={!!props.costFrozen}
        />
      </Inputs>

      {!props.hideClose && (
        <DeleteButton type="button" onClick={deletePurchase}>
          <Icons.Close
            height={12}
            fill={Styles.background[ui.theme.value].six}
            hoveredFill={Styles.text[ui.theme.value]}
            addHover
          />
        </DeleteButton>
      )}
    </Container>
  );
};

export const PurchaseCell = memo(ExportedComponent);
