import { useEffect } from "react";
import { effect, Signal, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  income: Signal<string>;
  disableSubmit: Signal<boolean>;
};

export const Income = (props: Props) => {
  const errorMessage = useSignal("");

  function onBlur(): void {
    if (errorMessage.value === "" && props.income.value !== "") {
      props.income.value = Functions.roundNumber(Number(props.income.value), 2);
    }
  }

  useEffect(() => {
    effect(() => {
      if (props.income.value.length === 0) {
        errorMessage.value = "";
        props.disableSubmit.value = true;
      } else if (Number(props.income.value) < 0 || props.income.value === "0") {
        errorMessage.value = "You must enter a number greater than 0.";
        props.disableSubmit.value = true;
      } else if (!Number(props.income.value)) {
        errorMessage.value = "You must enter a number.";
        props.disableSubmit.value = true;
      } else {
        errorMessage.value = "";
        props.disableSubmit.value = false;
      }
    });
  }, [props.income, props.disableSubmit]);

  return (
    <Globals.FormInput
      userInput={props.income.value}
      setUserInput={(event: Types.Input): void => {
        props.income.value = event.currentTarget.value;
      }}
      placeholder="Income ($)"
      errorMessage={errorMessage.value}
      onBlur={onBlur}
      borderRadius="six"
      isCost
    />
  );
};
