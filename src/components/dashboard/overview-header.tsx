import styled from "styled-components";
import { memo, useCallback } from "react";
import { useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { updateOverviewRequest } from "@/sagas/overviews.saga";
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

const ExportedComponent = (props: Props) => {
  const dispatch = Functions.useAppDispatch();
  const { loadingOverviews } = Functions.useUiSlice();
  const overview = Functions.useAppSelector(Functions.fetchCurrentUserOverview);

  const totalSpent = useSignal(0);
  const error = useSignal("");

  const updateIncome = useCallback(
    Functions.debounce((_: number, __: string, cost: string) => {
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
    Functions.debounce((_: number, __: string, cost: string) => {
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
            selectionValue={overview.id}
            description="Income"
            cost={Functions.roundNumber(overview.income, 2)}
            updateAction={updateIncome}
            costForwardText="$"
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
          />

          <Globals.PurchaseCell
            key={`dashboard-overview-header-purchase-cell-savings`}
            selectionValue={overview.id}
            description={`Savings (%)\n$${Functions.roundNumber(
              overview.income * (overview.savings / 100),
              2
            )}`}
            cost={overview.savings.toString()}
            updateAction={updateSavings}
            hideDrag
            hideCheck
            hideCategories
            hideClose
            descriptionFrozen
          />

          <Globals.PurchaseCell
            key={`dashboard-overview-header-purchase-cell-total-spent`}
            selectionValue={overview.id}
            description="Total Spent"
            cost={totalSpent.value.toString()}
            costForwardText="$"
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
            selectionValue={overview.id}
            description="Remaining"
            cost={Functions.roundNumber(
              overview.income - overview.income * (overview.savings / 100),
              2
            )}
            costForwardText="$"
            importance="Primary"
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

export const OverviewHeader = memo(ExportedComponent);
