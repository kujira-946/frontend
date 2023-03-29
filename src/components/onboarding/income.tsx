import styled from "styled-components";
import { effect, Signal } from "@preact/signals-react";

import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { Input } from "../input";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section``;

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

  function onBlur(): void {
    if (props.errorMessage.value === "") {
      props.income.value = Functions.roundNumber(Number(props.income.value), 2);
    }
  }

  return (
    <Container>
      <Input
        title="Income ($)"
        forwardText={props.income.value === "" ? "" : "$"}
        userInput={props.income.value}
        setUserInput={(event: Types.Input) =>
          (props.income.value = event.currentTarget.value)
        }
        errorMessage={props.errorMessage.value}
        onBlur={onBlur}
      />
    </Container>
  );
};
