import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { effect, useSignal } from "@preact/signals-react";

import * as Redux from "@/redux";
import * as Globals from "@/components";
import * as Components from "@/components/onboarding";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Selectors from "@/utils/selectors";
import * as Types from "@/utils/types";
import { updateUserRequest } from "@/sagas/users.saga";
import { createOverviewRequest } from "@/sagas/overviews.saga";
import { createOverviewGroupRequest } from "@/sagas/overview-groups.saga";

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

const Onboarding = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser, overviews, overviewGroups, purchases } =
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

  function createOverview(
    income: number,
    savings: number,
    ownerId: number
  ): void {
    const roundedIncome = Functions.roundNumber(income, 2);
    const roundedSavings = Functions.roundNumber(savings, 2);
    const overviewData: Types.OverviewCreateData = {
      income: Number(roundedIncome),
      savings: Number(roundedSavings),
      ownerId,
    };
    dispatch(createOverviewRequest(overviewData));
  }

  function startOnboardingCompletion(): void {
    if (Number(income.value) && Number(savings.value) && currentUser) {
      createOverview(
        Number(income.value),
        Number(savings.value),
        currentUser.id
      );
    } else {
      dispatch(
        Redux.uiActions.setNotification({
          title: "Failure",
          body: "Failed to complete onboarding. Please make sure all fields were filled in properly.",
          type: "failure",
          timeout: 10000,
        })
      );
    }
  }

  function createOverviewGroups(overviewId: number): void {
    const recurringOverviewGroupData: Types.OverviewGroupCreateData = {
      name: "Recurring",
      totalCost: recurringPurchasesTotal.value,
      overviewId,
    };
    dispatch(createOverviewGroupRequest(recurringOverviewGroupData));
    const incomingOverviewGroupData: Types.OverviewGroupCreateData = {
      name: "Incoming",
      totalCost: incomingPurchasesTotal.value,
      overviewId,
    };
    dispatch(createOverviewGroupRequest(incomingOverviewGroupData));
  }

  function createRecurringPurchases(overviewGroupId: number): void {
    const recurringPurchasesData: Types.PurchaseCreateData[] =
      recurringPurchases.value.filter(
        (purchase: Types.OnboardingPurchase, index: number) => {
          if (purchase.description) {
            const purchaseData: Types.PurchaseCreateData = {
              placement: index + 1,
              description: purchase.description,
              cost: Number(purchase.cost),
              overviewGroupId,
            };
            return purchaseData;
          }
        }
      );
  }

  function createIncomingPurchases(overviewGroupId: number): void {
    const incomingPurchasesData: Types.PurchaseCreateData[] =
      incomingPurchases.value.filter(
        (purchase: Types.OnboardingPurchase, index: number) => {
          if (purchase.description) {
            const purchaseData: Types.PurchaseCreateData = {
              placement: index + 1,
              description: purchase.description,
              cost: Number(purchase.cost),
              overviewGroupId,
            };
            return purchaseData;
          }
        }
      );
  }

  function setUserAsOnboarded(currentUserId: number): void {
    dispatch(updateUserRequest(currentUserId, { onboarded: true }));
  }

  function toNextPage(): void {
    if (currentPage.value + 1 <= Constants.onboardingCopies.length) {
      currentPage.value += 1;
    } else {
      startOnboardingCompletion();
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

  useEffect(() => {
    if (currentUser) {
      if (overviews && !overviewGroups) {
        // createOverviewGroups(overviews[0].id);
      } else if (overviews && overviewGroups && !purchases) {
        // if (the recurring overview group exists) {
        //   createRecurringPurchases(recurring overview group id)
        // }
        // if (the incoming overview group exists) {
        //   createIncomingPurchases(incoming overview group id)
        // }
      } else if (overviews && overviewGroups && purchases) {
        // setUserAsOnboarded(currentUser.id);
      }
    }
  }, [currentUser, overviews, overviewGroups, purchases]);

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
