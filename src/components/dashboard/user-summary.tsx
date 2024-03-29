import styled from "styled-components";
import { useEffect } from "react";
import { useSignal } from "@preact/signals-react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import {
  fetchUserOverviewRequest,
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

const ErrorMessage = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.failure};
  font-size: ${Styles.pxAsRem.twelve};
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

  const { totalSpent, remainingBudget } = Functions.useSignalsStore().dashboard;
  const { loadingOverviews } = Functions.useUiSlice();
  const { currentUser, overview } = Functions.useEntitiesSlice();
  const overviewGroups = Functions.useGetOverviewOverviewGroups();

  const savedIncome = useSignal("");
  const errorMessage = useSignal("");

  const updateIncome = Functions.debounce((cost: string) => {
    if (overview) {
      if (Number(cost) && Number(cost) !== overview.income) {
        dispatch(updateOverviewRequest(overview.id, { income: Number(cost) }));
      }
    }
  }, 500);

  const updateSavings = Functions.debounce((cost: string) => {
    if (overview) {
      if (
        cost.length > 0 &&
        (Number(cost) || Number(cost) === 0) &&
        Number(cost) >= 0 &&
        Number(cost) <= 100 &&
        Number(cost) !== overview.savings
      ) {
        dispatch(updateOverviewRequest(overview.id, { savings: Number(cost) }));
      }
    }
  }, 500);

  // ↓↓↓ Fetching the current user's overview. ↓↓↓ //
  useEffect(() => {
    if (currentUser && !overview) {
      dispatch(Redux.uiActions.setLoadingOverviews(true));
      dispatch(fetchUserOverviewRequest(currentUser.id));
    }
  }, [currentUser, overview]);

  // ↓↓↓ Setting `savedIncome` state. ↓↓↓ //
  useEffect(() => {
    if (overview) {
      savedIncome.value = Functions.roundNumber(
        overview.income * (overview.savings / 100),
        2
      );
    }
  }, [overview]);

  // ↓↓↓ Setting `totalSpent` state. ↓↓↓ //
  useEffect(() => {
    if (overview && overviewGroups) {
      const userHasOverviewGroups = Object.keys(overviewGroups).length > 0;

      if (userHasOverviewGroups) {
        let overviewGroupsTotalSpent = 0;
        for (const overviewGroup of overviewGroups) {
          if (overviewGroup.name === "Incoming") {
            continue;
          } else {
            overviewGroupsTotalSpent += overviewGroup.totalSpent;
          }
        }

        if (Number(savedIncome)) {
          overviewGroupsTotalSpent += Number(savedIncome);
        }

        totalSpent.value = Functions.roundNumber(overviewGroupsTotalSpent, 2);
      }
    }
  }, [overview, overviewGroups]);

  // ↓↓↓ Setting `remainingBudget` state ↓↓↓ //
  useEffect(() => {
    if (overview) {
      if (Number(totalSpent.value)) {
        const remainingIncome = overview.income - Number(totalSpent.value);
        remainingBudget.value = Functions.roundNumber(remainingIncome, 2);
      } else {
        remainingBudget.value = Functions.roundNumber(overview.income, 2);
      }
    }
  }, [overview, totalSpent.value]);

  // ↓↓↓ Setting `errorMessage` state. ↓↓↓ //
  useEffect(() => {
    if (overview) {
      const overBudget = Number(totalSpent.value) > overview.income;
      if (overBudget) {
        errorMessage.value = "You've spent more than you can afford!";
      } else {
        errorMessage.value = "";
      }
    }
  }, [overview, totalSpent.value]);

  return (
    <Container>
      <Heading>
        <HeadingTitle>February 2023 Overview</HeadingTitle>
        <HeadingCaption>{props.page}</HeadingCaption>
      </Heading>

      {errorMessage.value && <ErrorMessage>{errorMessage.value}</ErrorMessage>}

      {loadingOverviews ? (
        <>
          <Globals.OverviewShimmer />
          <Globals.OverviewShimmer />
          <Globals.OverviewShimmer />
          <Globals.OverviewShimmer />
        </>
      ) : overview ? (
        <>
          <Globals.PurchaseCell
            key={`dashboard-overview-header-purchase-cell-income`}
            description="Income"
            cost={Functions.roundNumber(overview.income, 2)}
            costUpdate={updateIncome}
            costForwardText="$"
            costPlaceholder="After tax"
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
          />

          <Globals.PurchaseCell
            key={`dashboard-overview-header-purchase-cell-savings`}
            description={`Savings %\n$${savedIncome.value}`}
            cost={Functions.roundNumber(overview.savings, 2)}
            costLimit={100}
            costPlaceholder="% of income"
            costUpdate={updateSavings}
            persistDescriptionInput
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
          />

          <Globals.PurchaseCell
            key={`dashboard-overview-header-purchase-cell-total-spent`}
            description="Total Spent"
            cost={totalSpent.value}
            isError={Number(totalSpent.value) > overview.income}
            costForwardText="$"
            importance="Secondary"
            persistDescriptionInput
            persistCostInput
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
            cost={remainingBudget.value}
            isError={Number(remainingBudget.value) < 0}
            costForwardText="$"
            importance="Primary"
            persistDescriptionInput
            persistCostInput
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
