import styled from "styled-components";
import { useContext, useEffect } from "react";
import { Signal, useSignal } from "@preact/signals-react";

import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
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

type InputProps = {
  hasValue: boolean;
  frozen: boolean;
  error?: boolean;
};

const Input = styled.input<InputProps>`
  width: 100%;
  padding: ${Styles.pxAsRem.four} ${Styles.pxAsRem.six};
  color: ${(props: ThemeProps) => props.theme.text};
  background-color: ${(props: InputProps & ThemeProps) => {
    return props.hasValue
      ? props.theme.backgroundTwo
      : props.theme.backgroundOne;
  }};
  border: ${(props: InputProps & ThemeProps) => {
    return props.error
      ? `${props.theme.failure} solid 1px`
      : props.frozen
      ? `${props.theme.backgroundOne} solid 1px`
      : props.hasValue
      ? `${props.theme.backgroundTwo} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  border-radius: ${Styles.pxAsRem.four};
  transition: ease-in 0.1s;
  outline: none;

  ::placeholder {
    ${(props: ThemeProps) => props.theme.backgroundSeven};
  }

  :focus {
    border: ${(props: ThemeProps & InputProps) => {
      return props.error
        ? `${props.theme.failure} solid 1px`
        : `${props.theme.backgroundSix} solid 1px`;
    }};
  }

  @media (hover: hover) {
    :hover {
      border: ${(props: InputProps & ThemeProps) => {
        return !props.frozen && `${props.theme.backgroundSix} solid 1px`;
      }};
    }
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
  index: number;
  expenses: Signal<Types.BarePurchase[]>;
  disableSubmit: Signal<boolean>;

  description: string;
  cost: string;
  onCheckActive?: () => void;
  onCheckInactive?: () => void;
  onCloseClick?: () => void;

  borderRadius?: keyof typeof Styles.pxAsRem;
  hideDrag?: true;
  hideCheck?: true;
  hideCategories?: true;
  hideClose?: true;
  descriptionFrozen?: true;
  costFrozen?: true;
};

const categories: Category[] = ["Need", "Planned", "Impulse", "Regret"];

export const PurchaseCell = (props: Props) => {
  const { ui } = useContext(SignalsStoreContext);

  const dragHovered = useSignal(false);
  const checkboxHovered = useSignal(false);
  const checkboxActive = useSignal(false);
  const description = useSignal(props.description);
  const cost = useSignal(props.cost);
  const costError = useSignal(false);
  const closeHovered = useSignal(false);

  function updateDescription(event: Types.Input): void {
    description.value = event.currentTarget.value;
  }

  function updateCost(event: Types.Input): void {
    cost.value = event.currentTarget.value;
    if (!Number(cost.value)) costError.value = true;
    else costError.value = false;
  }

  function roundCost(): void {
    if (!costError.value) {
      cost.value = Functions.roundNumber(Number(cost.value), 2);
    }
  }

  function updateExpenses(expense: Types.BarePurchase): void {
    const updatedExpenses = Functions.deepCopy(props.expenses.value);
    updatedExpenses[props.index] = expense;
    props.expenses.value = updatedExpenses;
  }

  useEffect(() => {
    if (checkboxActive.value && props.onCheckActive) {
      props.onCheckActive();
    } else if (!checkboxActive.value && props.onCheckInactive) {
      props.onCheckInactive();
    }
  }, [checkboxActive.value, props.onCheckActive, props.onCheckInactive]);

  useEffect(() => {
    const expense: Types.BarePurchase = {
      selected: checkboxActive.value,
      description: description.value,
      cost: cost.value,
    };
    updateExpenses(expense);
  }, [description.value, cost.value]);

  useEffect(() => {
    props.disableSubmit.value = costError.value;
  }, [costError.value]);

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
          onMouseEnter={() => (dragHovered.value = true)}
          onMouseLeave={() => (dragHovered.value = false)}
        >
          <Icons.Drag
            height={12}
            fill={Styles.background[ui.theme.value].six}
            hovered={dragHovered.value}
            hoveredFill={Styles.background[ui.theme.value].eight}
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
              hovered={checkboxHovered.value}
              hoveredFill={Styles.text[ui.theme.value]}
            />
          )}
        </CheckButton>
      )}

      {/* {!props.hideCheck && props.selected ? (
        <CheckButton onClick={() => updateCheckboxActive(false)}>
          <Icons.CheckboxActive
            height={20}
            fill={Styles.secondary[ui.theme.value].main}
          />
        </CheckButton>
      ) : (
        <CheckButton
          onClick={() => updateCheckboxActive(true)}
          onMouseEnter={() => (checkboxHovered.value = true)}
          onMouseLeave={() => (checkboxHovered.value = false)}
        >
          <Icons.CheckboxInactive
            height={20}
            fill={Styles.background[ui.theme.value].seven}
            hovered={checkboxHovered.value}
            hoveredFill={Styles.text[ui.theme.value]}
          />
        </CheckButton>
      )} */}

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

      <Input
        key="purchase-cell-description-input"
        value={props.description}
        placeholder="Description"
        onChange={updateDescription}
        hasValue={props.description.length > 0}
        frozen={!!props.descriptionFrozen}
      />

      <Input
        key="purchase-cell-cost-input"
        value={props.cost}
        placeholder="Cost"
        onChange={updateCost}
        onBlur={roundCost}
        hasValue={props.cost.length > 0}
        frozen={!!props.costFrozen}
        error={costError.value}
      />

      {!props.hideClose && props.onCloseClick && (
        <CloseButton
          onClick={props.onCloseClick}
          onMouseEnter={() => (closeHovered.value = true)}
          onMouseLeave={() => (closeHovered.value = false)}
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
