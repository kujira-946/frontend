import styled from "styled-components";
import { useEffect } from "react";
import { effect, useSignal } from "@preact/signals-react";

import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { updateOverviewRequest } from "@/sagas/overviews.saga";
import { ThemeProps } from "../layout";
import { LogbooksOverviewUserInfoCell } from "./logbooks-overview-user-info-cell";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twelve};
  padding: ${Styles.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
`;

const UserSummaryHeader = styled.header`
  display: flex;
  flex-direction: column;
`;

const UserSummaryHeaderTitle = styled.h2`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const UserSummaryHeaderErrorMessage = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.failure};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const UserInformation = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const UserSummary = () => {
  const dispatch = Functions.useAppDispatch();

  const { logbookTotalSpent, totalSpent, remainingBudget } =
    Functions.useSignalsStore().dashboard;
  const { overview } = Functions.useEntitiesSlice();
  const overviewGroups = Functions.useGetOverviewOverviewGroups();

  const income = useSignal("...");
  const savings = useSignal("...");

  const incomeError = useSignal(false);
  const savingsError = useSignal(false);
  const errorMessages = useSignal<string[]>([]);

  const updateOverviewIncome = Functions.debounce(
    (overviewId: number): void => {
      dispatch(
        updateOverviewRequest(overviewId, { income: Number(income.value) })
      );
    }
  );

  const updateOverviewSavings = Functions.debounce(
    (overviewId: number): void => {
      dispatch(
        updateOverviewRequest(overviewId, { savings: Number(savings.value) })
      );
    }
  );

  // ↓↓↓ Updating Overview Income ↓↓↓ //
  useEffect(() => {
    if (overview && !incomeError.value) {
      // updateOverviewIncome(overview.id);
    }
  }, [overview, incomeError.value, income.value]);

  // ↓↓↓ Updating Overview Savings ↓↓↓ //
  useEffect(() => {
    if (overview && !savingsError.value) {
      // updateOverviewSavings(overview.id);
    }
  }, [overview, savingsError.value, savings.value]);

  useEffect(() => {
    if (overview && overviewGroups) {
      // ↓↓↓ Setting initial income and savings states. ↓↓↓ //
      income.value = Functions.roundNumber(overview.income, 2);
      savings.value = String(overview.savings);

      // ↓↓↓ Calculating & setting total spent. ↓↓↓ //
      const recurringOverviewGroupTotalSpent = overviewGroups[0].totalSpent;
      const spent = logbookTotalSpent.value + recurringOverviewGroupTotalSpent;
      totalSpent.value = String(spent);

      // ↓↓↓ Calculating & setting remaining budget. ↓↓↓ //
      const savedIncome = overview.income * (overview.savings / 100);
      const budget =
        overview.income - recurringOverviewGroupTotalSpent - savedIncome;

      remainingBudget.value = String(budget);
    }
  }, [overview, overviewGroups]);

  // ↓↓↓ Error Handling ↓↓↓ //
  effect(() => {
    // Income Error
    if (income.value !== "..." && Number(income.value) !== 0) {
      if (!Number(income.value) || Number(income.value) < 0) {
        incomeError.value = true;
      } else {
        incomeError.value = false;
      }
    } else {
      incomeError.value = false;
    }

    // Savings Error
    if (savings.value !== "..." && Number(savings.value) !== 0) {
      if (
        !Number(savings.value) ||
        Number(savings.value) < 0 ||
        Number(savings.value) > 100
      ) {
        savingsError.value = true;
      } else {
        savingsError.value = false;
      }
    } else {
      savingsError.value = false;
    }

    // Error Messages
    if (incomeError.value) {
      if (!Number(income.value)) {
        errorMessages.value[0] = "Income must be a number.";
      } else if (Number(income.value) < 0) {
        errorMessages.value[0] = "Income must be greater than 0.";
      } else {
        errorMessages.value[0] = "";
      }
    } else {
      errorMessages.value[0] = "";
    }
    if (savingsError.value) {
      if (!Number(savings.value)) {
        errorMessages.value[1] = "Savings must be a number.";
      } else if (Number(savings.value) < 0) {
        errorMessages.value[1] = "Savings minimum is 0.";
      } else if (Number(savings.value) > 100) {
        errorMessages.value[1] = "Savings maximum is 100.";
      } else {
        errorMessages.value[1] = "";
      }
    } else {
      errorMessages.value[1] = "";
    }
  });

  return (
    <Container>
      <UserSummaryHeader>
        <UserSummaryHeaderTitle>Your Overview</UserSummaryHeaderTitle>
        {errorMessages.value.length > 0 && (
          <>
            {errorMessages.value.map((errorMessage: string, index: number) => {
              return (
                <UserSummaryHeaderErrorMessage
                  key={`dashboard-layout-overview-error-message-${errorMessage}-${index}`}
                >
                  {errorMessage}
                </UserSummaryHeaderErrorMessage>
              );
            })}
          </>
        )}
      </UserSummaryHeader>

      <UserInformation>
        {/* Income */}
        <LogbooksOverviewUserInfoCell
          description="Income"
          cost={income.value}
          setUserInput={(event: Types.Input) => {
            income.value = event.currentTarget.value;
          }}
          inputError={incomeError.value}
        />

        {/* Savings */}
        <LogbooksOverviewUserInfoCell
          description="Savings (%)"
          caption={
            overview
              ? `$${Functions.formattedNumber(
                  overview.income * (overview.savings / 100)
                )}`
              : ""
          }
          cost={savings.value}
          setUserInput={(event: Types.Input) => {
            savings.value = event.currentTarget.value;
          }}
          inputError={savingsError.value}
        />

        {/* Total Spent */}
        <LogbooksOverviewUserInfoCell
          description="Total Spent"
          cost={`$${Functions.formattedNumber(Number(totalSpent.value))}`}
          inputError={false}
        />

        {/* Remaining Budget */}
        <LogbooksOverviewUserInfoCell
          description="Remaining"
          cost={`$${Functions.formattedNumber(Number(remainingBudget.value))}`}
          inputError={false}
        />
      </UserInformation>
    </Container>
  );
};
