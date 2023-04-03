import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Components from "@/components/onboarding";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { onboardNewUserRequest } from "@/sagas/onboarding.saga";

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

const Onboarding = () => {
  const dispatch = Functions.useAppDispatch();
  const router = useRouter();

  const { currentUser } = Functions.useEntitiesSlice();
  const { loadingOnboarding } = Functions.useUiSlice();

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

  function onboardNewUser(): void {
    if (currentUser) {
      const overviewData: Types.OnboardingOverviewCreateData = {
        income: Number(income.value),
        savings: Number(savings.value),
        ownerId: currentUser.id,
      };

      const recurringOverviewGroupData: Types.OnboardingOverviewGroupCreateData =
        {
          name: "Recurring",
          totalCost: recurringPurchasesTotal.value,
        };

      const incomingOverviewGroupData: Types.OnboardingOverviewGroupCreateData =
        {
          name: "Incoming",
          totalCost: incomingPurchasesTotal.value,
        };

      const recurringPurchasesData: Types.OnboardingPurchaseCreateData[] = [];
      recurringPurchases.value.forEach(
        (purchase: Types.OnboardingPurchase, index: number) => {
          if (purchase.description) {
            const recurringPurchase: Types.OnboardingPurchaseCreateData = {
              placement: index,
              description: purchase.description,
              cost: Number(purchase.cost),
            };
            recurringPurchasesData.push(recurringPurchase);
          }
        }
      );

      const incomingPurchasesData: Types.OnboardingPurchaseCreateData[] = [];
      incomingPurchases.value.forEach(
        (purchase: Types.OnboardingPurchase, index: number) => {
          if (purchase.description) {
            const incomingPurchase: Types.OnboardingPurchaseCreateData = {
              placement: index,
              description: purchase.description,
              cost: Number(purchase.cost),
            };
            incomingPurchasesData.push(incomingPurchase);
          }
        }
      );

      dispatch(
        onboardNewUserRequest({
          overview: overviewData,
          recurringOverviewGroup: recurringOverviewGroupData,
          incomingOverviewGroup: incomingOverviewGroupData,
          recurringPurchases: recurringPurchasesData,
          incomingPurchases: incomingPurchasesData,
        })
      );
    }
  }

  function toPreviousPage(): void {
    if (currentPage.value - 1 > 0) currentPage.value -= 1;
    else currentPage.value = 1;
  }

  function toNextPage(): void {
    if (currentPage.value + 1 <= Constants.onboardingCopies.length) {
      currentPage.value += 1;
    } else {
      onboardNewUser();
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
    } else {
      router.push(Constants.ClientRoutes.LANDING);
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

  if (loadingOnboarding) {
    return <Globals.Loading text="Sit tight as I get you set up!" />;
  } else {
    return (
      <>
        <Head>
          <title>Kujira | Onboarding</title>
          <meta name="description" content="Kujira app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Globals.ConfirmationModal
          showBackButton={currentPage.value === 1 ? false : true}
          backButtonAction={toPreviousPage}
          title={Constants.onboardingCopies[currentPage.value - 1].title}
          cornerText={`${currentPage.value}/${Constants.onboardingCopies.length}`}
          supportingText={supportingText.value}
          bodyTexts={
            Constants.onboardingCopies[currentPage.value - 1].bodyTexts
          }
          submitButtonAction={toNextPage}
          submitButtonText={
            Constants.onboardingCopies[currentPage.value - 1].submitButtonText
          }
          disableSubmit={disableSubmit.value}
          showSubmitArrow
        >
          {renderPage()}
        </Globals.ConfirmationModal>
      </>
    );
  }
};

export default Onboarding;
