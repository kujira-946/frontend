import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { MiniInput } from "../mini-input";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.six} ${Styles.pxAsRem.eight};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border-radius: ${Styles.pxAsRem.eight};
`;

type StaticCellProps = {
  bold?: true;
  primary?: boolean;
};

const StaticCell = styled.article<StaticCellProps>`
  flex: 1;
  flex-shrink: 0;
  padding: ${Styles.pxAsRem.six} ${Styles.pxAsRem.eight};
  color: ${(props: StaticCellProps & ThemeProps) => {
    return props.primary ? props.theme.primaryMain : props.theme.text;
  }};
  border-radius: ${Styles.pxAsRem.four};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${(props) => {
    return props.bold ? Styles.fontWeights.bold : Styles.fontWeights.regular;
  }};
`;

const Caption = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.backgroundTen};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.medium};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  description: "Income" | "Savings (%)" | "Total Spent" | "Remaining";
  caption?: string;
  cost: string;
  setUserInput?: (event: Types.Input) => void;
  inputError?: boolean;
};

export const LogbooksOverviewUserInfoCell = (props: Props) => {
  return (
    <Container>
      <StaticCell>
        {props.description}
        {props.caption && <Caption>{props.caption}</Caption>}
      </StaticCell>

      {props.description === "Total Spent" ||
      props.description === "Remaining" ? (
        <StaticCell bold primary={props.description === "Remaining"}>
          {props.cost}
        </StaticCell>
      ) : (
        <MiniInput
          userInput={props.cost}
          setUserInput={props.setUserInput || undefined}
          placeholder="Cost"
          error={props.inputError}
          type="medium"
          isCost={props.description !== "Savings (%)"}
        />
      )}
    </Container>
  );
};
