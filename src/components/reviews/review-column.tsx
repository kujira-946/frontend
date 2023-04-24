import styled from "styled-components";
import { useEffect } from "react";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  flex: 1;
  height: 100%;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  border-radius: ${Styles.pxAsRem.six};
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  gap: ${Styles.pxAsRem.twelve};
  padding: ${Styles.pxAsRem.ten} ${Styles.pxAsRem.sixteen};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

const Descriptor = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
`;

type TitleProps = { category: Category };

const Title = styled.h1<TitleProps>`
  margin: 0;
  color: ${(props: TitleProps & ThemeProps) => {
    return props.category === "Need"
      ? props.theme.need
      : props.category === "Planned"
      ? props.theme.planned
      : props.theme.impulse;
  }};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.bold};
`;

type SpentProps = { price?: true };

const Spent = styled.span<SpentProps>`
  margin: 0;
  color: ${(props: SpentProps & ThemeProps) => {
    return props.price ? props.theme.primaryMain : "inherit";
  }};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${(props) => {
    return props.price
      ? Styles.fontWeights.semiBold
      : Styles.fontWeights.medium;
  }};
`;

const Count = styled.span`
  color: ${(props: ThemeProps) => props.theme.secondaryMain};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const Purchases = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
  padding: ${Styles.pxAsRem.eight};
  overflow-y: auto;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Category = "Need" | "Planned" | "Impulse" | "Regret";

type Props = {
  category: Category;
  purchases: Types.Purchase[];
};

export const ReviewColumn = (props: Props) => {
  const totalSpent = useSignal(0);

  useEffect(() => {
    let calculatedTotal = 0;
    props.purchases.forEach((purchase: Types.Purchase) => {
      if (purchase.cost) calculatedTotal += purchase.cost;
    });
    totalSpent.value = calculatedTotal;
  }, []);

  return (
    <Container>
      <Header>
        <Descriptor>
          <Title category={props.category}>{props.category}</Title>
          <Spent>
            You've spent{" "}
            <Spent price>${Functions.formattedNumber(totalSpent.value)}</Spent>{" "}
            on{" "}
            {props.category === "Need"
              ? "need purchases"
              : props.category === "Planned"
              ? "planned purchases"
              : "impulsive purchases"}
            .
          </Spent>
        </Descriptor>
        <Count>{props.purchases.length}</Count>
      </Header>

      <Purchases>
        {props.purchases.map((purchase: Types.Purchase) => {
          return (
            <Globals.PurchaseCell
              key={`dashboard-reviews-page-purchase-cell-${purchase.id}`}
              borderRadius="four"
              purchaseId={purchase.id}
              description={purchase.description}
              cost={Functions.roundNumber(purchase.cost || 0, 2)}
              costForwardText="$"
              hideDrag
              hideCheck
              hideCategories
              hideClose
              descriptionFrozen
              costFrozen
            />
          );
        })}
      </Purchases>
    </Container>
  );
};
