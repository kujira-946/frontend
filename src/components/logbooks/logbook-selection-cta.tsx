import styled from "styled-components";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  padding: ${Styles.pxAsRem.twelve};
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  border-radius: ${Styles.pxAsRem.eight};
`;

const Title = styled.h1`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.eighteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const SelectionButtons = styled.article`
  margin-top: ${Styles.pxAsRem.twelve};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const LogbookSelectionCTA = () => {
  const { selectedLogbookId } = Functions.useSignalsStore().dashboard;
  const logbooks = Functions.useGetCurrentUserLogbooks();

  return (
    <Container>
      <Title>Please select a logbook below.</Title>
      {logbooks && (
        <SelectionButtons>
          {logbooks.map((logbook: Types.Logbook, index: number) => {
            return (
              <Globals.FilterButton
                key={`dashboard-logbooks-page-logbook-selection-cta-${logbook.id}-${index}`}
                type="button"
                size="medium"
                selected={selectedLogbookId.value === logbook.id}
                onClick={() => (selectedLogbookId.value = logbook.id)}
                borderRadius="six"
                inModal
              >
                {logbook.name}
              </Globals.FilterButton>
            );
          })}
        </SelectionButtons>
      )}
    </Container>
  );
};
