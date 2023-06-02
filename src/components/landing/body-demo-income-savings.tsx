import styled from "styled-components";
import { Signal, effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  totalSpent: Signal<string>;
  remainingBudget: Signal<string>;
};

export const BodyDemoIncomeSavings = (props: Props) => {
  console.log("Body demo income savings rendered");

  const income = useSignal("");
  const savings = useSignal("");

  const incomeError = useSignal("");
  const savingsError = useSignal("");

  function calculateIncomeSaved(): number {
    if (!incomeError.value && !savingsError.value) {
      return Number(income.value) * (Number(savings.value) / 100);
    } else {
      return 0;
    }
  }

  function setTotalSpent(): void {
    if (!incomeError.value && !savingsError.value) {
      props.totalSpent.value = Functions.formattedNumber(
        Number(income.value) - calculateIncomeSaved()
      );
    } else {
      props.totalSpent.value = "";
    }
  }

  function setRemainingBudget(): void {
    if (!incomeError.value && !savingsError.value) {
      props.remainingBudget.value = Functions.formattedNumber(
        Number(income.value)
      );
    } else {
      props.remainingBudget.value = "";
    }
  }

  function setIncome(event: Types.Input): void {
    income.value = event.target.value;
    setRemainingBudget();
  }

  function setSavings(event: Types.Input): void {
    savings.value = event.target.value;
    setTotalSpent();
  }

  function incomeOnBlur(): void {
    if (incomeError.value === "" && income.value !== "") {
      income.value = Functions.roundNumber(Number(income.value), 2);
    }
  }

  effect(() => {
    // ↓↓↓ Income Error ↓↓↓ //
    if (income.value.length === 0) {
      incomeError.value = "";
    } else if (!Number(income.value) && income.value !== "0") {
      incomeError.value = "You must enter a number.";
    } else if (Number(income.value) < 0 || income.value === "0") {
      incomeError.value = "You must enter a number greater than 0.";
    } else {
      incomeError.value = "";
    }

    // ↓↓↓ Savings Error ↓↓↓ //
    if (savings.value.length === 0) {
      savingsError.value = "";
    } else if (!Number(savings.value) && savings.value !== "0") {
      savingsError.value = "You must enter a number.";
    } else if (Number(savings.value) < 0) {
      savingsError.value = "Minimum 0%";
    } else if (Number(savings.value) > 100) {
      savingsError.value = "Maximum 100%";
    } else {
      savingsError.value = "";
    }
  });

  return (
    <Container>
      <Globals.FormInput
        key="landing-page-body-demo-one-form-input-income"
        type="text"
        userInput={income.value}
        setUserInput={setIncome}
        placeholder="Income ($)"
        errorMessage={incomeError.value}
        onBlur={incomeOnBlur}
        isCost
        required
      />

      <Globals.FormInput
        key="landing-page-body-demo-one-form-input-savings"
        type="text"
        userInput={savings.value}
        setUserInput={setSavings}
        placeholder={`Savings (%) $${Functions.formattedNumber(
          calculateIncomeSaved()
        )}`}
        errorMessage={savingsError.value}
        required
      />
    </Container>
  );
};
