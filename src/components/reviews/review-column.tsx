import styled from "styled-components";
import { useEffect } from "react";
import { useSignal } from "@preact/signals-react";

import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "../layout";

import { ReviewCell } from "./review-cell";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  flex: 1;
  height: 100%;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  border-radius: ${Styles.pxAsRem.eight};
  overflow-y: auto;

  @media (max-width: ${Styles.breakpoints.dashboardWidth}px) {
    min-width: 300px;
    width: 100%;
  }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
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
    return props.price ? props.theme.primaryMain : props.theme.backgroundTen;
  }};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${(props) => {
    return props.price
      ? Styles.fontWeights.semiBold
      : Styles.fontWeights.medium;
  }};
`;

const Count = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${Styles.pxAsRem.forty};
  height: ${Styles.pxAsRem.forty};
  color: ${(props: ThemeProps) => props.theme.text};
  border: ${(props: ThemeProps) => props.theme.backgroundThree} solid 1px;
  border-radius: ${Styles.pxAsRem.six};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.bold};
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
            {"You've spent "}
            <Spent price>${Functions.formattedNumber(totalSpent.value)}</Spent>.
          </Spent>
        </Descriptor>
        <Count>{props.purchases.length}</Count>
      </Header>

      <Purchases>
        {props.purchases.map((purchase: Types.Purchase, index: number) => {
          return (
            <ReviewCell
              key={`dashboard-reviews-page-purchase-cell-${purchase.id}-${index}`}
              description={purchase.description}
              cost={purchase.cost}
            />
          );
        })}
      </Purchases>
    </Container>
  );
};
