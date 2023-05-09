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

const SectionError = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.failure};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.bold};
`;

type SpentStatusProps = { status: "OK" | "OVER" };

const SpentStatus = styled.span<SpentStatusProps>`
  color: ${(props: SpentStatusProps & ThemeProps) => {
    return props.status === "OK" ? props.theme.success : props.theme.failure;
  }};
  font-size: inherit;
  font-weight: inherit;
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
  const confirmLogbookEntryDelete = useSignal(false);

  const dateErrorMessage = useSignal("");
  const budgetErrorMessage = useSignal("");

  const updateDate = useCallback(
    Functions.debounce((): void => {
      if (logbookEntry && !dateErrorMessage.value) {
        const formattedDateInput = Functions.generateFormattedDate(
          new Date(date.value),
          true
        );
        if (formattedDateInput !== logbookEntry.date) {
          dispatch(
            updateLogbookEntryRequest(props.logbookEntryId, {
              date: formattedDateInput,
            })
          );
        }
      }
    }),
    [logbookEntry]
  );

  const updateBudget = useCallback(
    Functions.debounce((): void => {
      if (logbookEntry && !budgetErrorMessage.value) {
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

  function determineSpentStatus() {
    if (logbookEntry && logbookEntry.budget) {
      if (logbookEntry.totalSpent <= logbookEntry.budget) {
        return <SpentStatus status="OK">(OK)</SpentStatus>;
      } else {
        return <SpentStatus status="OVER">(OVER)</SpentStatus>;
      }
    }
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

  // ↓↓↓ Handling date update ↓↓↓ //
  useEffect(() => {
    updateDate();
  }, [logbookEntry, dateErrorMessage.value, date.value]);

  // ↓↓↓ Handling budget update ↓↓↓ //
  useEffect(() => {
    updateBudget();
  }, [logbookEntry, budgetErrorMessage.value, budget.value]);

  // ↓↓↓ Handling date error ↓↓↓ //
  useEffect(() => {
    if (logbookEntry && date.value !== "...") {
      effect(() => {
        const splitDate = date.value.split("/");
        const month = splitDate[0];
        const day = splitDate[1];
        const year = splitDate[2];

        if (date.value.length !== 0 && date.value !== logbookEntry.date) {
          if (splitDate.length !== 3) {
            dateErrorMessage.value = "Incorrect format.";
          } else if (month.length > 2) {
            dateErrorMessage.value = "Month too big.";
          } else if (!Number(month)) {
            dateErrorMessage.value = "Month must be a number.";
          } else if (Number(month) < 1) {
            dateErrorMessage.value = "Month too small.";
          } else if (Number(month) > 12) {
            dateErrorMessage.value = "Month too big.";
          } else if (day.length > 2) {
            dateErrorMessage.value = "Day too big.";
          } else if (!Number(day)) {
            dateErrorMessage.value = "Day must be a number.";
          } else if (Number(day) < 1) {
            dateErrorMessage.value = "Day too small.";
          } else if (Number(day) > Functions.getMonthMaxDay(Number(month))) {
            dateErrorMessage.value = "Day too big.";
          } else if (year.length < 4) {
            dateErrorMessage.value = "Year too small.";
          } else if (year.length > 4) {
            dateErrorMessage.value = "Year too big.";
          } else if (!Number(year)) {
            dateErrorMessage.value = "Year must be a number.";
          } else if (Number(year) > new Date().getFullYear()) {
            dateErrorMessage.value = "Year too big.";
          } else {
            dateErrorMessage.value = "";
          }
        } else {
          dateErrorMessage.value = "";
        }
      });
    }
  }, [logbookEntry, date.value]);

  // ↓↓↓ Handling budget error ↓↓↓ //
  effect(() => {
    if (budget.value !== "" && budget.value !== "...") {
      if (!Number(budget.value) && Number(budget.value) !== 0) {
        budgetErrorMessage.value = "Must be a number.";
      } else if (Number(budget.value) === 0 || Number(budget.value) < 1) {
        budgetErrorMessage.value = "Must be greater than zero.";
      } else {
        budgetErrorMessage.value = "";
      }
    } else {
      budgetErrorMessage.value = "";
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
            {!!dateErrorMessage.value && (
              <SectionError>{dateErrorMessage.value}</SectionError>
            )}
            <Globals.MiniInput
              userInput={date.value}
              setUserInput={(event: Types.Input) => {
                date.value = event.currentTarget.value;
              }}
              placeholder="MM/DD/YYYY"
              error={!!dateErrorMessage.value}
              type="large"
            />
          </Section>

          {/* Spent */}
          <Section
            key={`dashboard-logbooks-logbook-entry-header-${props.logbookEntryId}-spent`}
          >
            <SectionTitle>
              Spent {logbookEntry.budget && determineSpentStatus()}
            </SectionTitle>
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
            {!!budgetErrorMessage.value && (
              <SectionError>{budgetErrorMessage.value}</SectionError>
            )}
            <Globals.MiniInput
              userInput={budget.value}
              setUserInput={(event: Types.Input) => {
                budget.value = event.currentTarget.value;
              }}
              placeholder="Budget"
              error={!!budgetErrorMessage.value}
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
