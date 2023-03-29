import { effect, Signal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  income: Signal<string>;
  errorMessage: Signal<string>;
  disableSubmit: Signal<boolean>;
};

export const Income = (props: Props) => {
  effect(() => {
    if (props.income.value.length === 0) {
      props.errorMessage.value = "";
      props.disableSubmit.value = true;
    } else if (Number(props.income.value) < 0 || props.income.value === "0") {
      props.errorMessage.value = "You must enter a number greater than 0.";
      props.disableSubmit.value = true;
    } else if (!Number(props.income.value)) {
      props.errorMessage.value = "You must enter a number.";
      props.disableSubmit.value = true;
    } else {
      props.errorMessage.value = "";
      props.disableSubmit.value = false;
    }
  });

  const setUserInput = function (event: Types.Input): void {
    props.income.value = event.currentTarget.value;
  };

  function onBlur(): void {
    if (props.errorMessage.value === "" && props.income.value !== "") {
      props.income.value = Functions.roundNumber(Number(props.income.value), 2);
    }
  }

  return (
    <Globals.Input
      title="Income ($)"
      userInput={props.income.value}
      setUserInput={setUserInput}
      errorMessage={props.errorMessage.value}
      onBlur={onBlur}
      isCost
    />
  );
};
