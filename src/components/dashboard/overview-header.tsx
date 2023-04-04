import styled from "styled-components";
import { useEffect } from "react";
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

  function updateIncome(selectionValue: number, _: string, cost: string) {
    return Functions.debounce(() => {
      dispatch(updateOverviewRequest(selectionValue, { income: Number(cost) }));
    }, 1000);
  }

  return (
    <Container>
      <Heading>
        <HeadingTitle>February 2023 Overview</HeadingTitle>
        <HeadingCaption>{props.page}</HeadingCaption>
      </Heading>

      {loadingOverviews && (
        <>
          <Globals.Shimmer height={44} borderRadius="six" />
          <Globals.Shimmer height={44} borderRadius="six" />
          <Globals.Shimmer height={44} borderRadius="six" />
          <Globals.Shimmer height={44} borderRadius="six" />
        </>
      )}

      {!loadingOverviews && overviews && (
        <>
          <Globals.PurchaseCell
            selectionValue={Number(Object.keys(overviews)[0])}
            description="Income"
            cost={Functions.roundNumber(Object.values(overviews)[0].income, 2)}
            updatePurchase={updateIncome}
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
          />

          <Globals.PurchaseCell
            selectionValue={Number(Object.keys(overviews)[0])}
            description="Savings"
            cost={Functions.roundNumber(Object.values(overviews)[0].savings, 2)}
            updatePurchase={updateIncome}
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
          />

          <Globals.PurchaseCell
            selectionValue={Number(Object.keys(overviews)[0])}
            description="Total Spent"
            cost={totalSpent.value.toString()}
            updatePurchase={updateIncome}
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
            costFrozen
          />

          <Globals.PurchaseCell
            selectionValue={Number(Object.keys(overviews)[0])}
            description="Remaining"
            cost={Functions.roundNumber(
              Object.values(overviews)[0].income -
                Object.values(overviews)[0].savings,
              2
            )}
            updatePurchase={updateIncome}
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
            costFrozen
          />
        </>
      )}
    </Container>
  );
};
