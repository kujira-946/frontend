import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { effect, useSignal } from "@preact/signals-react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as Components from "@/components/onboarding";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { GlobalState } from "@/store";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Main = styled.main``;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

const Onboarding = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state: GlobalState) => state.entities);

  useEffect(() => {
    if (user && user.onboarded) router.push(Constants.ClientRoutes.LOGBOOKS);
  }, [user]);

  const currentPage = useSignal(1);
  const supportingText = useSignal("");
  const errorMessage = useSignal("");
  const disableSubmit = useSignal(false);

  const income = useSignal("");
  const recurringExpenses = useSignal<Types.Purchase[]>([]);
  const incomingPurchases = useSignal<Types.Purchase[]>([]);
  const savings = useSignal("");

  effect(() => {
    if (currentPage.value === 1) {
      disableSubmit.value = false;
    } else if (income.value !== "" && savings.value !== "") {
      if (Number(income.value) && Number(savings.value)) {
        const roundedIncome = Functions.roundNumber(Number(income.value), 2);
        const savedIncome =
          Number(roundedIncome) * (Number(savings.value) / 100);
        const roundedSavedIncome = Functions.roundNumber(
          Number(savedIncome),
          2
        );
        const remainingBudget = Functions.roundNumber(
          Number(roundedIncome) - Number(roundedSavedIncome),
          2
        );
        supportingText.value = `$${remainingBudget} remaining`;
      } else {
        supportingText.value = "";
      }
    } else if (income.value !== "") {
      if (Number(income.value)) {
        const roundedIncome = Functions.roundNumber(Number(income.value), 2);
        supportingText.value = `$${roundedIncome} remaining`;
      } else {
        supportingText.value = "";
      }
    } else {
      supportingText.value = "";
    }
  });

  function toPreviousPage(): void {
    if (currentPage.value - 1 > 0) currentPage.value -= 1;
    else currentPage.value = 1;
  }

  function toNextPage(): void {
    if (currentPage.value === 6) {
      if (user) {
        submitOnboarding();
      } else {
        dispatch(
          Redux.uiActions.setNotification({
            title: "Failure",
            body: "Please make sure all previous fields were filled in properly.",
            type: "failure",
            timeout: 10000,
          })
        );
      }
    } else if (currentPage.value + 1 <= Constants.onboardingCopies.length) {
      currentPage.value += 1;
    } else {
      currentPage.value = Constants.onboardingCopies.length;
    }
  }

  function submitOnboarding(): void {
    // 1. Create overview.
    // 2. Use new overview id to create recurring and income overview groups.
    // 3. Set the user's `onboarded` status to `true`.

    if (Number(income.value) && Number(savings.value)) {
      const roundedIncome = Functions.roundNumber(Number(income.value), 2);
      const roundedSavings = Functions.roundNumber(Number(savings.value), 2);

      const overviewData = {
        income: Number(roundedIncome),
        savings: Number(roundedSavings),
        ownerId: user?.id,
      };
      const recurringOverviewGroupData = {};
      const incomingOverviewGroupData = {};

      console.log(overviewData);
    }
  }

  return (
    <>
      <Head>
        <title>Kujira | Onboarding</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Globals.ConfirmationModal
          backButtonAction={toPreviousPage}
          supportingText={supportingText.value}
          title={Constants.onboardingCopies[currentPage.value - 1].title}
          cornerText={`${currentPage.value}/${Constants.onboardingCopies.length}`}
          bodyTexts={
            Constants.onboardingCopies[currentPage.value - 1].bodyTexts
          }
          submitButtonAction={toNextPage}
          submitButtonText={
            Constants.onboardingCopies[currentPage.value - 1].submitButtonText
          }
          disableSubmit={disableSubmit.value}
          showBackButton={currentPage.value === 1 ? false : true}
          showSubmitArrow
        >
          {currentPage.value === 2 ? (
            <Components.Income
              income={income}
              errorMessage={errorMessage}
              disableSubmit={disableSubmit}
            />
          ) : currentPage.value === 3 ? (
            <Components.RecurringExpenses
              recurringExpenses={recurringExpenses}
            />
          ) : currentPage.value === 5 ? (
            <Components.Savings
              income={Number(income.value)}
              savings={savings}
              errorMessage={errorMessage}
              disableSubmit={disableSubmit}
            />
          ) : null}
        </Globals.ConfirmationModal>
      </Main>
    </>
  );
};

export default Onboarding;
