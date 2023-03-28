import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Components from "@/components/onboarding";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Selectors from "@/utils/selectors";
import * as Types from "@/utils/types";

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

const Onboarding = () => {
  const router = useRouter();

  const { currentUser } = Selectors.useEntitiesSlice();

  // ↓↓↓ Onboarding Page Data ↓↓↓ //
  const currentPage = useSignal(1);
  const recurringExpensesTotal = useSignal(0);
  const incomingPurchasesTotal = useSignal(0);
  const supportingText = useSignal("");
  const errorMessage = useSignal("");
  const disableSubmit = useSignal(false);

  // ↓↓↓ Submission Data ↓↓↓ //
  const income = useSignal("");
  const recurringExpenses = useSignal<Types.BarePurchase[]>([
    { description: "", cost: "" },
  ]);
  const incomingPurchases = useSignal<Types.BarePurchase[]>([
    { description: "", cost: "" },
  ]);
  const savings = useSignal("");

  useEffect(() => {
    if (currentUser && currentUser.onboarded) {
      router.push(Constants.ClientRoutes.LOGBOOKS);
    }
  }, [currentUser]);

  // ↓↓↓ Handling Supporting Text Value ↓↓↓ //
  effect(() => {
    if (currentPage.value === 1) {
      disableSubmit.value = false;
    } else if (recurringExpensesTotal.value < 0) {
      recurringExpensesTotal.value = 0;
    } else if (incomingPurchasesTotal.value < 0) {
      incomingPurchasesTotal.value = 0;
    } else if (currentPage.value === Constants.onboardingCopies.length) {
      // NOTE : The function below should be invoked when clicking on the submit button on the last page, rather
      //        than being automatically invoked.
      // completeOnboarding();
    } else if (Number(income.value)) {
      let remainingBudget = Number(income.value);
      remainingBudget -= recurringExpensesTotal.value;
      remainingBudget -= incomingPurchasesTotal.value;
      if (Number(savings.value)) {
        const savedIncome =
          Number(income.value) * (Number(savings.value) / 100);
        remainingBudget -= savedIncome;
      }
      const roundedRemainingBudget = Functions.roundNumber(remainingBudget, 2);
      supportingText.value = `$${roundedRemainingBudget} remaining`;
    } else {
      supportingText.value = "";
    }
  });

  function toPreviousPage(): void {
    if (currentPage.value - 1 > 0) currentPage.value -= 1;
    else currentPage.value = 1;
  }

  function toNextPage(): void {
    if (currentPage.value + 1 <= Constants.onboardingCopies.length) {
      currentPage.value += 1;
    } else {
      currentPage.value = Constants.onboardingCopies.length;
    }
  }

  function completeOnboarding(): void {
    // 1. Create overview.
    // 2. (if Redux overview is not `null`) Use new overview id to create recurring and income overview groups and set state.
    // 3. (if Redux recurring & income overviews are not `null`) Set the user's `onboarded` status to `true`.

    if (Number(income.value) && Number(savings.value)) {
      const roundedIncome = Functions.roundNumber(Number(income.value), 2);
      const roundedSavings = Functions.roundNumber(Number(savings.value), 2);

      const overviewData = {
        income: Number(roundedIncome),
        savings: Number(roundedSavings),
        ownerId: currentUser?.id,
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

      <Globals.ConfirmationModal
        backButtonAction={toPreviousPage}
        supportingText={supportingText.value}
        title={Constants.onboardingCopies[currentPage.value - 1].title}
        cornerText={`${currentPage.value}/${Constants.onboardingCopies.length}`}
        bodyTexts={Constants.onboardingCopies[currentPage.value - 1].bodyTexts}
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
          <Components.ExpensesPartial
            key="onboarding-page-recurring-expenses"
            title="Recurring"
            total={recurringExpensesTotal}
            expenses={recurringExpenses}
            disableSubmit={disableSubmit}
          />
        ) : currentPage.value === 4 ? (
          <Components.ExpensesPartial
            key="onboarding-page-incoming-purchases"
            title="Incoming"
            total={incomingPurchasesTotal}
            expenses={incomingPurchases}
            disableSubmit={disableSubmit}
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
    </>
  );
};

export default Onboarding;
