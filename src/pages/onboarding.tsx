import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Components from "@/components/onboarding";
import * as OverviewsSagas from "@/sagas/overviews.saga";
import * as OverviewGroupsSagas from "@/sagas/overview-groups.saga";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import { updateUserRequest } from "@/sagas/users.saga";
import {
  createPurchaseRequest,
  deleteAssociatedPurchasesRequest,
} from "@/sagas/purchases.saga";

const Onboarding = () => {
  console.log("Onboarding Page Rendered");

  const dispatch = Functions.useAppDispatch();
  const router = useRouter();

  const { currentUser } = Functions.useEntitiesSlice();
  const { loadingUsers } = Functions.useUiSlice();
  const overview = Functions.useFetchCurrentUserOverview();
  const overviewGroups = Functions.useFetchOverviewGroups();

  const currentPage = useSignal(1);
  const supportingText = useSignal("");
  const disableSubmit = useSignal(false);
  const income = useSignal("");
  const savings = useSignal("");

  function toPreviousPage(): void {
    if (currentPage.value - 1 > 0) currentPage.value -= 1;
    else currentPage.value = 1;
  }

  function* completeOnboarding() {
    if (
      currentUser &&
      overview &&
      Number(income.value) &&
      Number(savings.value)
    ) {
      yield dispatch(
        OverviewsSagas.updateOverviewRequest(overview.id, {
          income: Number(income.value),
          savings: Number(savings.value),
        })
      );
      yield dispatch(updateUserRequest(currentUser.id, { onboarded: true }));
    }
  }

  function toNextPage(): void {
    if (currentPage.value + 1 <= Constants.onboardingCopies.length) {
      currentPage.value += 1;
    } else {
      completeOnboarding();
    }
  }

  const onDragEnd = useCallback(Functions.onDragEnd, []);

  const deleteAllPurchases = useCallback((overviewGroupId: number): void => {
    dispatch(deleteAssociatedPurchasesRequest({ overviewGroupId }));
  }, []);

  const addPurchase = useCallback((overviewGroupId: number): void => {
    dispatch(createPurchaseRequest({ placement: 0, overviewGroupId }));
  }, []);

  Functions.useDetectAuthorizedUser(() => {
    if (currentUser && currentUser.onboarded) {
      router.push(Constants.ClientRoutes.LOGBOOKS);
    }
  });

  useEffect(() => {
    if (currentUser && !overview) {
      dispatch(OverviewsSagas.fetchUserOverviewsRequest(currentUser.id));
    }
  }, [currentUser, overview]);

  useEffect(() => {
    if (overview && !overviewGroups) {
      dispatch(
        OverviewGroupsSagas.fetchOverviewOverviewGroupsRequest(overview.id)
      );
    }
  }, [overview, overviewGroups]);

  useEffect(() => {
    if (overviewGroups) {
      const recurringOverviewGroup = Object.values(overviewGroups)[0];
      effect(() => {
        if (Number(income.value)) {
          let remainingBudget =
            Number(income.value) - recurringOverviewGroup.totalCost;
          if (Number(savings.value)) {
            remainingBudget -=
              (Number(income.value) * Number(savings.value)) / 100;
          }
          const formattedBudget = Functions.formattedNumber(remainingBudget);
          if (remainingBudget < 0) {
            supportingText.value = `You are ${formattedBudget} below budget!`;
          } else if (remainingBudget === 0) {
            supportingText.value = "You have no money left over!";
          } else {
            supportingText.value = `$${formattedBudget} remaining`;
          }
        }
      });
    }
  }, [overviewGroups]);

  effect(() => {
    if (currentPage.value === 1) {
      supportingText.value = "";
      disableSubmit.value = false;
    } else if (currentPage.value === 3) {
      disableSubmit.value = false;
    } else if (currentPage.value === 4) {
      disableSubmit.value = false;
    } else if (currentPage.value === 6) {
      disableSubmit.value = false;
    }
  });

  if (!currentUser) {
    return null;
  } else if (loadingUsers) {
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
          {currentPage.value === 2 ? (
            <Components.Income income={income} disableSubmit={disableSubmit} />
          ) : overviewGroups && currentPage.value === 3 ? (
            <Components.Purchases
              key="onboarding-overview-group-recurring-purchases-dropdown"
              type="Recurring"
              overviewGroupId={Object.values(overviewGroups)[0].id}
              onDragEnd={onDragEnd}
              deleteAllPurchases={deleteAllPurchases}
              addPurchase={addPurchase}
            />
          ) : overviewGroups && currentPage.value === 4 ? (
            <Components.Purchases
              key="onboarding-overview-group-incoming-purchases-dropdown"
              type="Incoming"
              overviewGroupId={Object.values(overviewGroups)[1].id}
              onDragEnd={onDragEnd}
              deleteAllPurchases={deleteAllPurchases}
              addPurchase={addPurchase}
            />
          ) : currentPage.value === 5 ? (
            <Components.Savings
              income={Number(income.value)}
              savings={savings}
              disableSubmit={disableSubmit}
            />
          ) : null}
        </Globals.ConfirmationModal>
      </>
    );
  }
};

export default Onboarding;
