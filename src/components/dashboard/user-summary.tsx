import styled from "styled-components";
import { useCallback, useEffect, useMemo } from "react";
import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import {
  fetchUserOverviewsRequest,
  updateOverviewRequest,
} from "@/sagas/overviews.saga";
import { ThemeProps } from "../layout";

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
  page: Types.DashboardPage;
};

export const UserSummary = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { loadingOverviews } = Functions.useUiSlice();
  const { currentUser, overviews } = Functions.useEntitiesSlice();
  const overview = Functions.useFetchCurrentUserOverview();
  const overviewGroups = Functions.useFetchOverviewGroups();

  const recurringTotalCost = useSignal(0);
  const error = useSignal("");

  const totalSpent = useMemo(() => {
    if (overview) {
      return recurringTotalCost.value.toString();
    } else {
      return "0";
    }
  }, [overview]);

  const remainingBudget = useMemo(() => {
    if (overview) {
      return Functions.roundNumber(
        overview.income -
          overview.income * (overview.savings / 100) -
          recurringTotalCost.value,
        2
      );
    } else {
      return "0";
    }
  }, [overview]);

  const updateIncome = useCallback(
    Functions.debounce((cost: string) => {
      if (overview) {
        if (Number(cost) && Number(cost) !== overview.income) {
          dispatch(
            updateOverviewRequest(overview.id, { income: Number(cost) })
          );
        }
      }
    }, 500),
    [overview]
  );

  const updateSavings = useCallback(
    Functions.debounce((cost: string) => {
      if (overview) {
        if (Number(cost) && Number(cost) !== overview.savings) {
          dispatch(
            updateOverviewRequest(overview.id, { savings: Number(cost) })
          );
        }
      }
    }, 500),
    [overview]
  );

  useEffect(() => {
    if (currentUser && !overviews) {
      dispatch(fetchUserOverviewsRequest(currentUser.id));
    }
  }, [currentUser, overviews]);

  useEffect(() => {
    if (
      overviewGroups &&
      Object.keys(overviewGroups).length > 0 &&
      recurringTotalCost.value === 0
    ) {
      let overviewGroupsTotalSpent = 0;
      for (const overviewGroup of overviewGroups) {
        if (overviewGroup.name !== "Incoming") {
          overviewGroupsTotalSpent += overviewGroup.totalCost;
        }
        break;
      }
      recurringTotalCost.value = overviewGroupsTotalSpent;
    }
  }, [overviewGroups, recurringTotalCost.value]);

  return (
    <Container>
      <Heading>
        <HeadingTitle>February 2023 Overview</HeadingTitle>
        <HeadingCaption>{props.page}</HeadingCaption>
      </Heading>

      {loadingOverviews ? (
        <>
          <Globals.Shimmer borderRadius="six" height={44} />
          <Globals.Shimmer borderRadius="six" height={44} />
          <Globals.Shimmer borderRadius="six" height={44} />
          <Globals.Shimmer borderRadius="six" height={44} />
        </>
      ) : overview ? (
        <>
          <Globals.PurchaseCell
            key={`dashboard-overview-header-purchase-cell-income`}
            description="Income"
            cost={Functions.roundNumber(overview.income, 2)}
            costUpdate={updateIncome}
            costForwardText="$"
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
          />

          <Globals.PurchaseCell
            key={`dashboard-overview-header-purchase-cell-savings`}
            description={`Savings (%)\n$${Functions.roundNumber(
              overview.income * (overview.savings / 100),
              2
            )}`}
            cost={overview.savings.toString()}
            costUpdate={updateSavings}
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
          />

          <Globals.PurchaseCell
            key={`dashboard-overview-header-purchase-cell-total-spent`}
            description="Total Spent"
            cost={totalSpent}
            costForwardText="$"
            importance="Secondary"
            persistInput
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
            costFrozen
          />

          <Globals.PurchaseCell
            key={`dashboard-overview-header-purchase-cell-remaining`}
            description="Remaining"
            cost={remainingBudget}
            costForwardText="$"
            importance="Primary"
            persistInput
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
            costFrozen
          />
        </>
      ) : null}
    </Container>
  );
};
