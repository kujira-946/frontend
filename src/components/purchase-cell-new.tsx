import styled from "styled-components";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "./layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.six} ${Styles.pxAsRem.eight};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border-radius: ${Styles.pxAsRem.six};
`;

const CategoryButtons = styled.article`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.four};
`;

type CategoryButtonProps = { category: (typeof categories)[number] };

const CategoryButton = styled.button<CategoryButtonProps>`
  ${Styles.clearButton};
  ${Styles.transition};
  padding: ${Styles.pxAsRem.two} ${Styles.pxAsRem.four};
  color: ${(props: CategoryButtonProps & ThemeProps) => {
    if (props.category === "Need") return props.theme.need;
    else if (props.category === "Planned") return props.theme.planned;
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

const categories = ["Need", "Planned", "Impulse"] as const;

type Props = {
  description: string;
  setDescription: (event: Types.Input) => void;
  cost: string;
  setCost: (event: Types.Input) => void;
  deletePurchase: () => void;

  showDrag?: true;
  showCheck?: true;
  showCategories?: true;
  showDelete?: true;
};

export const PurchaseCellNew = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;

  const checked = useSignal(false);
  const description = useSignal(props.description);
  const cost = useSignal(props.cost);

  return (
    <Container>
      {props.showDrag && theme.value && (
        <Globals.IconContainer>
          <Icons.Drag
            width={10}
            height={10}
            fill={Styles.background[theme.value].eight}
            hoveredFill={Styles.text[theme.value]}
            addHover
          />
        </Globals.IconContainer>
      )}

      {props.showCheck &&
        theme.value &&
        (checked.value ? (
          <Globals.IconContainer>
            <Icons.CheckboxActive
              width={14}
              height={14}
              fill={Styles.primary[theme.value].main}
              hoveredFill={Styles.primary[theme.value].darker}
              addHover
            />
          </Globals.IconContainer>
        ) : (
          <Globals.IconContainer>
            <Icons.CheckboxInactive
              width={14}
              height={14}
              fill={Styles.background[theme.value].eight}
              hoveredFill={Styles.text[theme.value]}
              addHover
            />
          </Globals.IconContainer>
        ))}

      {props.showCategories && (
        <CategoryButtons>
          {categories.map(
            (category: (typeof categories)[number], index: number) => {
              return (
                <CategoryButton
                  key={`purchase-cell-category-button-${category}-${index}`}
                  type="button"
                  category={category}
                >
                  {category}
                </CategoryButton>
              );
            }
          )}
        </CategoryButtons>
      )}

      <Globals.MiniInput
        userInput={description.value}
        setUserInput={(event: Types.Input) => {
          description.value = event.currentTarget.value;
        }}
        placeholder="Description"
        borderRadius="four"
        type="medium"
      />

      <Globals.MiniInput
        userInput={cost.value}
        setUserInput={(event: Types.Input) => {
          cost.value = event.currentTarget.value;
        }}
        placeholder="Cost"
        borderRadius="four"
        type="medium"
        isCost
      />

      {props.showDelete && theme.value && (
        <Globals.IconContainer>
          <Icons.Close
            width={10}
            height={10}
            fill={Styles.background[theme.value].eight}
            hoveredFill={Styles.text[theme.value]}
            addHover
          />
        </Globals.IconContainer>
      )}
    </Container>
  );
};
