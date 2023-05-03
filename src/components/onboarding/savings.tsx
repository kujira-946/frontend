import { useEffect } from "react";
import { effect, Signal, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";

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
    if (!errorMessage.value && Number(props.savings.value)) {
      const incomeSaved = props.income * (Number(props.savings.value) / 100);
      const formattedIncomeSaved = Functions.formattedNumber(incomeSaved);
      return `: $${formattedIncomeSaved}`;
    } else {
      return "";
    }
  }

  useEffect(() => {
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
  }, [props.savings, props.disableSubmit]);

  return (
    <Globals.FormInput
      type="text"
      userInput={props.savings.value}
      setUserInput={(event: Types.Input): void => {
        props.savings.value = event.currentTarget.value;
      }}
      placeholder={`Savings(%) ${calculateIncomeSaved()}`}
      errorMessage={errorMessage.value}
      borderRadius="six"
      required
    />
  );
};
