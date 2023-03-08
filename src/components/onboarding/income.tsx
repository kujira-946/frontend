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
  income: Signal<string>;
  errorMessage: string;
};

export const Income = (props: Props) => {
  return (
    <Container>
      <Input
        title="Income ($)"
        userInput={props.income.value}
        setUserInput={(event: Types.Input) =>
          (props.income.value = event.currentTarget.value)
        }
        errorMessage={props.errorMessage}
      />
    </Container>
  );
};
