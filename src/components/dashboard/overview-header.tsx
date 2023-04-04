import styled from "styled-components";
import { useCallback, useEffect, useMemo } from "react";
import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "../layout";
import { updateOverviewRequest } from "@/sagas/overviews.saga";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.sixteen};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

const Heading = styled.section`
  display: flex;
  flex-direction: column;
`;

const HeadingTitle = styled.h1`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.eighteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const HeadingCaption = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.backgroundEight};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.semiBold};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  page: "Logbooks" | "Reviews" | "Settings";
};

export const OverviewHeader = (props: Props) => {
  const dispatch = Functions.useAppDispatch();
  const { overviews } = Functions.useEntitiesSlice();
  const { loadingOverviews } = Functions.useUiSlice();

  const totalSpent = useSignal(0);
  const error = useSignal("");

  const updateIncome = useCallback(
    Functions.debounce((_: number, __: string, cost: string) => {
      if (overviews) {
        const overview = Object.values(overviews)[0];
        if (Number(cost) && Number(cost) !== overview.income) {
          dispatch(
            updateOverviewRequest(overview.id, { income: Number(cost) })
          );
        }
      }
    }, 1000),
    [overviews]
  );

  const updateSavings = useCallback(
    Functions.debounce((_: number, __: string, cost: string) => {
      if (overviews) {
        const overview = Object.values(overviews)[0];
        if (Number(cost) && Number(cost) !== overview.savings) {
          dispatch(
            updateOverviewRequest(overview.id, { savings: Number(cost) })
          );
        }
      }
    }, 1000),
    [overviews]
  );

  const purchaseCells = useMemo(() => {
    if (overviews) {
      const overview = Object.values(overviews)[0];
      const { id, income, savings } = overview;

      return (
        <>
          <Globals.PurchaseCell
            key={`dashboard-overview-header-purchase-cell-income`}
            selectionValue={id}
            description="Income"
            cost={Functions.roundNumber(income, 2)}
            updateAction={updateIncome}
            costFrontText="$"
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
          />

          <Globals.PurchaseCell
            key={`dashboard-overview-header-purchase-cell-savings`}
            selectionValue={id}
            description={`Savings (%)\n$${Functions.roundNumber(
              income * (savings / 100),
              2
            )}`}
            cost={savings.toString()}
            updateAction={updateSavings}
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
          />

          <Globals.PurchaseCell
            key={`dashboard-overview-header-purchase-cell-total-spent`}
            selectionValue={id}
            description="Total Spent"
            cost={totalSpent.value.toString()}
            costFrontText="$"
            importance="Secondary"
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
            costFrozen
          />

          <Globals.PurchaseCell
            key={`dashboard-overview-header-purchase-cell-remaining`}
            selectionValue={id}
            description="Remaining"
            cost={Functions.roundNumber(income - income * (savings / 100), 2)}
            costFrontText="$"
            importance="Primary"
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
            costFrozen
          />
        </>
      );
    }
  }, [overviews]);

  return (
    <Container>
      <Heading>
        <HeadingTitle>February 2023 Overview</HeadingTitle>
        <HeadingCaption>{props.page}</HeadingCaption>
      </Heading>

      {loadingOverviews ? (
        <>
          <Globals.Shimmer height={44} borderRadius="six" />
          <Globals.Shimmer height={44} borderRadius="six" />
          <Globals.Shimmer height={44} borderRadius="six" />
          <Globals.Shimmer height={44} borderRadius="six" />
        </>
      ) : (
        purchaseCells
      )}
    </Container>
  );
};
