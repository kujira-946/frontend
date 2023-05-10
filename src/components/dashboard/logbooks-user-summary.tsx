import styled, { css } from "styled-components";
import { useCallback, useEffect } from "react";
import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { updateOverviewRequest } from "@/sagas/overviews.saga";
import { LogbooksOverviewUserInfoCell } from "./logbooks-overview-user-info-cell";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
`;

type SharedProps = { inModal?: true };

const Header = styled.header<SharedProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${Styles.pxAsRem.twelve};
  padding: ${(props) => {
    return !props.inModal
      ? `${Styles.pxAsRem.twelve} ${Styles.pxAsRem.twelve} 0rem`
      : `${Styles.pxAsRem.eight} ${Styles.pxAsRem.twelve}`;
  }};

  ${(props) => {
    if (props.inModal) {
      return css`
        border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour}
          solid 1px;

        ${Styles.setMediaPaddings("eight")};
      `;
    }
  }}
`;

const HeaderText = styled.section`
  display: flex;
  flex-direction: column;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const ErrorMessage = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.failure};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const InfoCells = styled.article<SharedProps>`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
  padding: ${Styles.pxAsRem.twelve};

  ${(props) => {
    return (
      props.inModal && Styles.setMediaPaddings("twenty", "twenty", "fourteen")
    );
  }};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const LogbooksUserSummary = (props: SharedProps) => {
  const dispatch = Functions.useAppDispatch();

  const { theme } = Functions.useSignalsStore().ui;
  const { logbookTotalSpent, mobileOverviewOpen } =
    Functions.useSignalsStore().dashboard;
  const { overview } = Functions.useEntitiesSlice();
  const overviewGroups = Functions.useGetOverviewOverviewGroups();

  const income = useSignal("...");
  const savings = useSignal("...");
  const totalSpent = useSignal("0");
  const remainingBudget = useSignal("0");

  const incomeError = useSignal(false);
  const savingsError = useSignal(false);
  const totalSpentError = useSignal(false);
  const remainingBudgetError = useSignal(false);
  const errorMessages = useSignal<string[]>([]);

  const updateOverviewIncome = useCallback(
    Functions.debounce((overviewId: number): void => {
      dispatch(
        updateOverviewRequest(overviewId, { income: Number(income.value) })
      );
    }),
    []
  );

  const updateOverviewSavings = useCallback(
    Functions.debounce((overviewId: number): void => {
      dispatch(
        updateOverviewRequest(overviewId, { savings: Number(savings.value) })
      );
    }),
    []
  );

  // ↓↓↓ Initializations, calculations, and error setting. ↓↓↓ //
  useEffect(() => {
    if (overview && overviewGroups && overviewGroups[0]) {
      // Setting initial income and savings states.
      income.value = Functions.roundNumber(overview.income, 2);
      savings.value = String(overview.savings);

      // Calculating & setting total spent.
      const recurringOverviewGroupTotalSpent = overviewGroups[0].totalSpent;
      const spent = logbookTotalSpent.value + recurringOverviewGroupTotalSpent;
      totalSpent.value = Functions.formattedNumber(spent);

      // Calculating & setting remaining budget.
      const savedIncome = overview.income * (overview.savings / 100);
      const budget = overview.income - savedIncome - spent;
      remainingBudget.value = Functions.formattedNumber(budget);

      // Total Spent & Remaining Budget Error Handling
      if (spent > overview.income) {
        totalSpentError.value = true;
      } else {
        totalSpentError.value = false;
      }
      if (budget < 0) {
        remainingBudgetError.value = true;
      } else {
        remainingBudgetError.value = false;
      }
    }
  }, [overview, overviewGroups, logbookTotalSpent.value]);

  // ↓↓↓ Updating Overview Income ↓↓↓ //
  useEffect(() => {
    if (
      overview &&
      income.value !== "..." &&
      !incomeError.value &&
      Number(income.value) !== overview.income
    ) {
      updateOverviewIncome(overview.id);
    }
  }, [overview, incomeError.value, income.value]);

  // ↓↓↓ Updating Overview Savings ↓↓↓ //
  useEffect(() => {
    if (
      overview &&
      savings.value !== "..." &&
      !savingsError.value &&
      Number(savings.value) !== overview.savings
    ) {
      updateOverviewSavings(overview.id);
    }
  }, [overview, savingsError.value, savings.value]);

  // ↓↓↓ Income & Savings Error Handling ↓↓↓ //
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
      <Header inModal={props.inModal}>
        <HeaderText>
          <HeaderTitle>Your Overview</HeaderTitle>
          {errorMessages.value.length > 0 &&
            errorMessages.value.map((errorMessage: string, index: number) => {
              return (
                <ErrorMessage
                  key={`dashboard-layout-overview-error-message-${errorMessage}-${index}`}
                >
                  {errorMessage}
                </ErrorMessage>
              );
            })}
        </HeaderText>
        {theme.value && props.inModal && (
          <Globals.IconButton
            type="button"
            onClick={() => (mobileOverviewOpen.value = false)}
          >
            <Icons.Close
              width={16}
              height={16}
              fill={Styles.background[theme.value].eight}
              addHover
            />
          </Globals.IconButton>
        )}
      </Header>

      <InfoCells inModal={props.inModal}>
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
          cost={`$${totalSpent.value}`}
          caption={
            totalSpentError.value
              ? "You've spent more than your income allows!"
              : ""
          }
          inputError={totalSpentError.value}
        />

        {/* Remaining Budget */}
        <LogbooksOverviewUserInfoCell
          description="Remaining"
          cost={`$${remainingBudget.value}`}
          caption={
            remainingBudgetError.value
              ? "You've spent more than you can afford!"
              : ""
          }
          inputError={remainingBudgetError.value}
        />
      </InfoCells>
    </Container>
  );
};
