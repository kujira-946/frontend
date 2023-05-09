import dynamic from "next/dynamic";
import styled from "styled-components";
import { useCallback, useEffect } from "react";
import { effect, useSignal } from "@preact/signals-react";
import { AnimatePresence } from "framer-motion";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import {
  deleteLogbookEntryRequest,
  updateLogbookEntryRequest,
} from "@/sagas/logbook-entries.saga";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.header`
  ${Styles.transition};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${Styles.pxAsRem.forty};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  padding: ${Styles.pxAsRem.twelve};

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
    }
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${Styles.pxAsRem.four};
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.backgroundNine};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.bold};
`;

// ========================================================================================= //
// [ DYNAMIC IMPORT ] ====================================================================== //
// ========================================================================================= //

const DynamicDeleteConfirmation = dynamic(() =>
  import("../modals/delete-confirmation").then((mod) => mod.DeleteConfirmation)
);

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  logbookEntryId: number;
};

export const LogbookEntryHeader = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { theme } = Functions.useSignalsStore().ui;
  const logbookEntry = Functions.useGetLogbookEntry(props.logbookEntryId);

  const date = useSignal("...");
  const budget = useSignal("...");
  const budgetError = useSignal(false);
  const confirmLogbookEntryDelete = useSignal(false);

  const updateBudget = useCallback(
    Functions.debounce((): void => {
      if (logbookEntry && !budgetError.value) {
        if (budget.value === "" && logbookEntry.budget !== null) {
          dispatch(
            updateLogbookEntryRequest(props.logbookEntryId, {
              budget: null,
            })
          );
        } else if (
          budget.value !== "" &&
          Number(budget.value) !== logbookEntry.budget
        ) {
          dispatch(
            updateLogbookEntryRequest(props.logbookEntryId, {
              budget: Number(budget.value),
            })
          );
        }
      }
    }),
    [logbookEntry]
  );

  function openDeleteConfirmationModal(event: Types.OnClick): void {
    event.stopPropagation();
    confirmLogbookEntryDelete.value = true;
  }

  function deleteLogbookEntry(): void {
    dispatch(deleteLogbookEntryRequest(props.logbookEntryId));
  }

  // ↓↓↓ Initial state setup. ↓↓↓ //
  useEffect(() => {
    if (logbookEntry) {
      date.value = logbookEntry.date;
      if (logbookEntry.budget === 0) {
        budget.value = Functions.roundNumber(0, 2);
      } else if (logbookEntry.budget) {
        budget.value = Functions.roundNumber(logbookEntry.budget, 2);
      } else {
        budget.value = "";
      }
    }
  }, [logbookEntry]);

  // ↓↓↓ Handling budget update ↓↓↓ //
  useEffect(() => {
    updateBudget();
  }, [logbookEntry, budgetError.value, budget.value]);

  // ↓↓↓ Handling budget error ↓↓↓ //
  effect(() => {
    if (
      budget.value !== "" &&
      !Number(budget.value) &&
      Number(budget.value) !== 0
    ) {
      budgetError.value = true;
    } else {
      budgetError.value = false;
    }
  });

  if (!logbookEntry) {
    return null;
  } else {
    return (
      <>
        <AnimatePresence>
          {confirmLogbookEntryDelete.value && (
            <DynamicDeleteConfirmation
              title="Are you sure you want to delete this logbook entry?"
              body="Once deleted, it can never be recovered."
              open={confirmLogbookEntryDelete}
              onConfirm={deleteLogbookEntry}
              fixed
            />
          )}
        </AnimatePresence>

        <Container>
          {/* Date */}
          <Section
            key={`dashboard-logbooks-logbook-entry-header-${props.logbookEntryId}-date`}
          >
            <SectionTitle>Date</SectionTitle>
            <Globals.MiniInput
              userInput={date.value}
              setUserInput={(event: Types.Input) => {
                date.value = event.currentTarget.value;
              }}
              placeholder="MM/DD/YYYY"
              type="large"
            />
          </Section>

          {/* Spent */}
          <Section
            key={`dashboard-logbooks-logbook-entry-header-${props.logbookEntryId}-spent`}
          >
            <SectionTitle>Spent</SectionTitle>
            <Globals.MiniInput
              userInput={Functions.roundNumber(logbookEntry.totalSpent, 2)}
              placeholder="Spent"
              type="large"
              isCost
              frozen
            />
          </Section>

          {/* Budget */}
          <Section
            key={`dashboard-logbooks-logbook-entry-header-${props.logbookEntryId}-budget`}
          >
            <SectionTitle>Budget</SectionTitle>
            <Globals.MiniInput
              userInput={budget.value}
              setUserInput={(event: Types.Input) => {
                budget.value = event.currentTarget.value;
              }}
              placeholder="Budget"
              error={budgetError.value}
              type="large"
              isCost
            />
          </Section>

          {/* Delete Button */}
          {theme.value && (
            <Globals.IconContainer onClick={openDeleteConfirmationModal}>
              <Icons.Close
                width={14}
                height={14}
                fill={Styles.background[theme.value].eight}
                hoveredFill={Styles.text[theme.value]}
                addHover
              />
            </Globals.IconContainer>
          )}
        </Container>
      </>
    );
  }
};
