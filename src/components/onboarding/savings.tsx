import { effect, Signal, useSignal } from "@preact/signals-react";

import * as Functions from "@/utils/functions/functions";
import * as Types from "@/utils/types";
import { Input } from "../input";

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  income: number;
  savings: Signal<string>;
  disableSubmit: Signal<boolean>;
};

export const Savings = (props: Props) => {
  const errorMessage = useSignal("");

  function calculateIncomeSaved(): string {
    if (errorMessage.value.length === 0 && Number(props.savings.value)) {
      const incomeSaved = props.income * (Number(props.savings.value) / 100);
      const formattedIncomeSaved = Functions.formattedNumber(incomeSaved);
      return `: $${formattedIncomeSaved}`;
    } else {
      return "";
    }
  }

  function setUserInput(event: Types.Input): void {
    props.savings.value = event.currentTarget.value;
  }

  effect(() => {
    if (props.savings.value.length === 0) {
      errorMessage.value = "";
      props.disableSubmit.value = true;
    } else if (!Number(props.savings.value) && props.savings.value !== "0") {
      errorMessage.value = "You must enter a number.";
      props.disableSubmit.value = true;
    } else if (Number(props.savings.value) < 0) {
      errorMessage.value = "Minimum 0%";
      props.disableSubmit.value = true;
    } else if (Number(props.savings.value) > 100) {
      errorMessage.value = "Maximum 100%";
      props.disableSubmit.value = true;
    } else {
      errorMessage.value = "";
      props.disableSubmit.value = false;
    }
  });

  return (
    <Input
      title={`Savings (%) ${calculateIncomeSaved()}`}
      userInput={props.savings.value}
      setUserInput={setUserInput}
      errorMessage={errorMessage.value}
    />
  );
};
