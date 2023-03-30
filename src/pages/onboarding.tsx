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

  const { currentUser, overviews, overviewGroups } =
    Selectors.useEntitiesSlice();

  // ↓↓↓ Confirmation Modal Component Data ↓↓↓ //
  const currentPage = useSignal(1);
  const recurringPurchasesTotal = useSignal(0);
  const incomingPurchasesTotal = useSignal(0);
  const supportingText = useSignal("");
  const disableSubmit = useSignal(false);

  // ↓↓↓ Submission Data ↓↓↓ //
  const income = useSignal("");
  const recurringPurchases = useSignal<Types.OnboardingPurchase[]>([
    { description: "", cost: "" },
  ]);
  const incomingPurchases = useSignal<Types.OnboardingPurchase[]>([
    { description: "", cost: "" },
  ]);
  const savings = useSignal("");

  function toPreviousPage(): void {
    if (currentPage.value - 1 > 0) currentPage.value -= 1;
    else currentPage.value = 1;
  }

  function createOverview(): void {
    const roundedIncome = Functions.roundNumber(Number(income.value), 2);
    const roundedSavings = Functions.roundNumber(Number(savings.value), 2);
    const overviewData = {
      income: Number(roundedIncome),
      savings: Number(roundedSavings),
      ownerId: currentUser?.id,
    };

    console.log("Overview Data:", overviewData);
  }

  function createOverviewGroups(): void {
    if (overviews) {
      const recurringOverviewGroupData: Types.OnboardingOverviewGroup = {
        name: "Recurring",
        totalCost: recurringPurchasesTotal.value,
      };
      const incomingOverviewGroupData: Types.OnboardingOverviewGroup = {
        name: "Incoming",
        totalCost: incomingPurchasesTotal.value,
      };

      console.log("Recurring Overview Group Data:", recurringOverviewGroupData);
      console.log("Incoming Overview Group Data:", incomingOverviewGroupData);
    }
  }

  function createPurchases(): void {
    if (overviewGroups) {
      const recurringPurchasesData = recurringPurchases.value.filter(
        (purchase: Types.OnboardingPurchase, index: number) => {
          if (purchase.description) {
            return {
              placement: index + 1,
              description: purchase.description,
              cost: Number(purchase.cost),
            };
          }
        }
      );
      const incomingPurchasesData = incomingPurchases.value.filter(
        (purchase: Types.OnboardingPurchase, index: number) => {
          if (purchase.description) {
            return {
              placement: index + 1,
              description: purchase.description,
              cost: Number(purchase.cost),
            };
          }
        }
      );

      if (recurringPurchasesData.length > 0) {
        console.log("Recurring Purchases:", recurringPurchasesData);
      }
      if (incomingPurchasesData.length > 0) {
        console.log("Incoming Purchases:", incomingPurchasesData);
      }
    }
  }

  function completeOnboarding(): void {
    // 1. Create overview.
    // 2. (if Redux overview is not `null`) Use new overview id to create recurring and income overview groups and set state.
    // 3. (if Redux recurring & income overviews are not `null`) Set the user's `onboarded` status to `true`.

    if (Number(income.value) && Number(savings.value)) {
      createOverview();
      createOverviewGroups();
      createPurchases();
    }
  }

  function toNextPage(): void {
    if (currentPage.value + 1 <= Constants.onboardingCopies.length) {
      currentPage.value += 1;
    } else {
      completeOnboarding();
    }
  }

  function renderPage() {
    switch (currentPage.value) {
      case 2:
        return (
          <Components.Income income={income} disableSubmit={disableSubmit} />
        );
      case 3:
        return (
          <Components.DropdownPartial
            key="onboarding-page-recurring-purchases"
            title="Recurring"
            totalCost={recurringPurchasesTotal}
            purchases={recurringPurchases}
            disableSubmit={disableSubmit}
          />
        );
      case 4:
        return (
          <Components.DropdownPartial
            key="onboarding-page-incoming-purchases"
            title="Incoming"
            totalCost={incomingPurchasesTotal}
            purchases={incomingPurchases}
            disableSubmit={disableSubmit}
          />
        );
      case 5:
        return (
          <Components.Savings
            income={Number(income.value)}
            savings={savings}
            disableSubmit={disableSubmit}
          />
        );
      default:
        return null;
    }
  }

  useEffect(() => {
    if (currentUser && currentUser.onboarded) {
      router.push(Constants.ClientRoutes.LOGBOOKS);
    }
  }, [currentUser]);

  // ↓↓↓ Handling Supporting Text Value ↓↓↓ //
  effect(() => {
    if (currentPage.value === 1) {
      disableSubmit.value = false;
    } else if (disableSubmit.value) {
      supportingText.value = "";
    } else if (recurringPurchasesTotal.value < 0) {
      recurringPurchasesTotal.value = 0;
    } else if (incomingPurchasesTotal.value < 0) {
      incomingPurchasesTotal.value = 0;
    } else if (Number(income.value)) {
      let remainingBudget = Number(income.value);
      remainingBudget -= recurringPurchasesTotal.value;
      remainingBudget -= incomingPurchasesTotal.value;
      if (Number(savings.value)) {
        const savedIncome =
          Number(income.value) * (Number(savings.value) / 100);
        remainingBudget -= savedIncome;
      }
      const formattedBudget = Functions.formattedNumber(remainingBudget);
      supportingText.value = `$${formattedBudget} remaining`;
    } else {
      supportingText.value = "";
    }
  });

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
        {renderPage()}
      </Globals.ConfirmationModal>
    </>
  );
};

export default Onboarding;
