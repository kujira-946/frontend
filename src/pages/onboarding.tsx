import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Components from "@/components/onboarding";
import * as Constants from "@/utils/constants.onboarding";
import * as Types from "@/utils/types";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Main = styled.main``;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

const Onboarding = () => {
  const router = useRouter();

  // ↓↓↓ Local State ↓↓↓ //

  const currentPage = useSignal(1);
  const supportingText = useSignal("");
  const income = useSignal("");
  const savings = useSignal("");
  const recurringExpenses = useSignal<Types.Purchase[]>([]);
  const incomingPurchases = useSignal<Types.Purchase[]>([]);
  const errorMessage = useSignal("");
  const disableSubmit = useSignal(false);

  // ↓↓↓ Actions ↓↓↓ //

  function toPreviousPage(): void {
    if (currentPage.value - 1 > 0) currentPage.value -= 1;
    else currentPage.value = 1;
  }

  function toNextPage(): void {
    if (currentPage.value === 6) {
      router.push("/dashboard/logbook");
    } else if (currentPage.value + 1 <= Constants.pages.length) {
      currentPage.value += 1;
    } else {
      currentPage.value = Constants.pages.length;
    }
  }

  function addRecurringExpense(): void {
    recurringExpenses.value = [
      ...recurringExpenses.value,
      { description: "", cost: "" },
    ];
  }

  // ↓↓↓ Error Handling ↓↓↓ //

  effect(() => {
    // Income Page
    if (currentPage.value === 2) {
      if (income.value.length === 0) {
        disableSubmit.value = true;
      } else if (Number(income.value) < 0 || income.value === "0") {
        errorMessage.value = "You must enter a number greater than 0.";
        disableSubmit.value = true;
      } else if (!Number(income.value)) {
        errorMessage.value = "You must enter a number.";
        disableSubmit.value = true;
      } else {
        errorMessage.value = "";
        disableSubmit.value = false;
      }
    }
    // Savings Page
    else if (currentPage.value === 5) {
      if (savings.value.length === 0) {
        disableSubmit.value = true;
      } else if (!Number(savings.value) && savings.value !== "0") {
        errorMessage.value = "You must enter a number.";
        disableSubmit.value = true;
      } else if (Number(savings.value) < 0) {
        errorMessage.value = "Minimum 0%";
        disableSubmit.value = true;
      } else if (Number(savings.value) > 100) {
        errorMessage.value = "Maximum 100%";
        disableSubmit.value = true;
      } else {
        errorMessage.value = "";
        disableSubmit.value = false;
      }
    }
    // Reset
    else {
      errorMessage.value = "";
      disableSubmit.value = false;
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

      <Main>
        <Globals.ConfirmationModal
          backButtonAction={toPreviousPage}
          supportingText={`$3,584.51 remaining`}
          title={Constants.pages[currentPage.value - 1].title}
          cornerText={`${currentPage.value}/${Constants.pages.length}`}
          bodyTexts={Constants.pages[currentPage.value - 1].bodyTexts}
          submitButtonAction={toNextPage}
          submitButtonText={
            Constants.pages[currentPage.value - 1].submitButtonText
          }
          disableSubmit={disableSubmit.value}
          showBackButton={currentPage.value === 1 ? false : true}
          showSubmitArrow
        >
          {currentPage.value === 2 ? (
            <Components.Income
              income={income}
              errorMessage={errorMessage.value}
            />
          ) : currentPage.value === 3 ? (
            <Components.RecurringExpenses
              recurringExpenses={recurringExpenses.value}
              addRecurringExpense={addRecurringExpense}
            />
          ) : currentPage.value === 5 ? (
            <Components.Savings
              income={Number(income.value)}
              savings={savings}
              errorMessage={errorMessage.value}
            />
          ) : null}
        </Globals.ConfirmationModal>
      </Main>
    </>
  );
};

export default Onboarding;
