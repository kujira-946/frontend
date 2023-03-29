import { effect, Signal } from "@preact/signals-react";

import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { Input } from "../input";

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  income: number;
  savings: Signal<string>;
  errorMessage: Signal<string>;
  disableSubmit: Signal<boolean>;
};

export const Savings = (props: Props) => {
  effect(() => {
    if (props.savings.value.length === 0) {
      props.errorMessage.value = "";
      props.disableSubmit.value = true;
    } else if (!Number(props.savings.value) && props.savings.value !== "0") {
      props.errorMessage.value = "You must enter a number.";
      props.disableSubmit.value = true;
    } else if (Number(props.savings.value) < 0) {
      props.errorMessage.value = "Minimum 0%";
      props.disableSubmit.value = true;
    } else if (Number(props.savings.value) > 100) {
      props.errorMessage.value = "Maximum 100%";
      props.disableSubmit.value = true;
    } else {
      props.errorMessage.value = "";
      props.disableSubmit.value = false;
    }
  });

  function calculateIncomeSaved(): string {
    if (props.errorMessage.value.length === 0 && Number(props.savings.value)) {
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

  return (
    <Input
      title={`Savings (%) ${calculateIncomeSaved()}`}
      userInput={props.savings.value}
      setUserInput={setUserInput}
      errorMessage={props.errorMessage.value}
    />
  );
};
