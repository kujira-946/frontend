import styled from "styled-components";
import { Signal } from "@preact/signals-react";

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
  income: number;
  savings: Signal<string>;
  errorMessage: string;
};

export const Savings = (props: Props) => {
  function calculateIncomeSaved(): string {
    if (props.errorMessage.length === 0 && Number(props.savings.value)) {
      const incomeSaved = props.income * (Number(props.savings.value)/100);
      return `: ${incomeSaved}`;
    } else {
      return "";
    }
  }

  return (
    <Container>
      <Input
        title={`Savings (%) ${calculateIncomeSaved()}`}
        userInput={props.savings.value}
        setUserInput={(event: Types.Input) =>
          (props.savings.value = event.currentTarget.value)
        }
        errorMessage={props.errorMessage}
      />
    </Container>
  );
};
