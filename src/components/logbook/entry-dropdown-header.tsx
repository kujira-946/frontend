import styled from "styled-components";
import { useCallback, useEffect } from "react";
import { Signal, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { updateLogbookEntryRequest } from "@/sagas/logbook-entries.saga";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type SharedProps = { opened: boolean };

const Container = styled.header<SharedProps>`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  gap: ${Styles.pxAsRem.forty};
  padding: ${Styles.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps & SharedProps) => {
    return props.opened
      ? `${props.theme.backgroundFour} solid 1px`
      : `transparent solid 1px`;
  }};
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
    }
  }
`;

const HeaderSection = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
`;

const HeaderSectionTitle = styled.span`
  display: block;
  color: ${(props: ThemeProps) => props.theme.backgroundSeven};
  font-size: ${Styles.pxAsRem.ten};
  font-weight: ${Styles.fontWeights.bold};
`;

const DeleteButton = styled.button`
  ${Styles.clearButton};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

const headerSections = ["Date*", "Spent", "Budget", "Status"] as const;

type HeaderStatus = "-" | "Over Budget" | "Safe" | "No Budget Set";

type Props = {
  opened: Signal<boolean>;
  confirmLogbookEntryDelete: Signal<boolean>;
  logbookEntry: Types.LogbookEntry;
};

export const LogbookEntryDropdownHeader = (props: Props) => {
  const dispatch = Functions.useAppDispatch();

  const { theme } = Functions.useSignalsStore().ui;
  const { remainingBudget } = Functions.useSignalsStore().dashboard;

  const date = useSignal("-");
  const spent = useSignal("-");
  const budget = useSignal("");
  const status = useSignal<HeaderStatus>("-");

  const dateError = useSignal("");
  const budgetError = useSignal("");

  const selectHeaderError = useCallback(
    (section: typeof headerSections[number]): string => {
      if (section === "Date*") return dateError.value;
      else if (section === "Budget") return budgetError.value;
      else return "";
    },
    []
  );

  const selectHeaderValue = useCallback(
    (section: typeof headerSections[number]): string => {
      if (section === "Date*") return date.value;
      else if (section === "Spent") return spent.value;
      else if (section === "Budget") return budget.value;
      else return status.value;
    },
    []
  );

  function setHeaderStatusImportance(): Types.InputMiniImportance {
    if (status.value === "Safe") return "Primary";
    else if (status.value === "Over Budget") return "Failure";
    else return "Pending";
  }

  function setHeaderDate(event: Types.Input): void {
    date.value = event.currentTarget.value;
  }

  function setHeaderBudget(event: Types.Input): void {
    budget.value = event.currentTarget.value;
  }

  const selectHeaderValueSetter = useCallback(
    (section: typeof headerSections[number]) => {
      if (section === "Date*") {
        return setHeaderDate;
      } else if (section === "Budget") {
        return setHeaderBudget;
      } else {
        return () => undefined;
      }
    },
    []
  );

  const updateDate = useCallback(
    Functions.debounce(() => {
      const formattedDate = Functions.generateFormattedDate(
        new Date(date.value),
        true
      );
      if (
        !dateError.value &&
        date.value !== "" &&
        date.value !== formattedDate &&
        date.value !== props.logbookEntry.date
      ) {
        dispatch(
          updateLogbookEntryRequest(props.logbookEntry.id, {
            date: formattedDate,
          })
        );
        date.value = formattedDate;
      }
    }),
    []
  );

  const updateBudget = useCallback(
    Functions.debounce(() => {
      if (!budgetError.value) {
        if (budget.value === "" && props.logbookEntry.budget !== null) {
          dispatch(
            updateLogbookEntryRequest(props.logbookEntry.id, {
              budget: null,
            })
          );
        } else if (
          budget.value !== "" &&
          Number(budget.value) !== props.logbookEntry.budget
        ) {
          dispatch(
            updateLogbookEntryRequest(props.logbookEntry.id, {
              budget: Number(budget.value),
            })
          );
        }
      }
    }),
    [props.logbookEntry]
  );

  // ↓↓↓ Initializing `date`, `spent`, `budget`, and `status` states. ↓↓↓ //
  useEffect(() => {
    date.value = props.logbookEntry.date;
    spent.value = Functions.formattedNumber(props.logbookEntry.totalSpent);

    if (props.logbookEntry.budget) {
      budget.value = Functions.roundNumber(props.logbookEntry.budget, 2);
      if (props.logbookEntry.totalSpent > props.logbookEntry.budget) {
        status.value = "Over Budget";
      } else if (props.logbookEntry.totalSpent < props.logbookEntry.budget) {
        status.value = "Safe";
      }
    } else {
      status.value = "No Budget Set";
    }
  }, []);

  // ↓↓↓ Setting `dateError` state. ↓↓↓ //
  useEffect(() => {
    if (date.value !== props.logbookEntry.date) {
      const month = Number(date.value.split("/")[0]);
      const day = Number(date.value.split("/")[1]);
      const year = Number(date.value.split("/")[2]);

      const isDateError = Functions.validateDateError(month, day, year);
      dateError.value = isDateError;
    } else {
      dateError.value = "";
    }
  }, [props.logbookEntry, date.value]);

  // ↓↓↓ Updating Logbook Entry `date`. ↓↓↓ //
  useEffect(() => {
    updateDate();
  }, [date.value]);

  // ↓↓↓ Setting `budgetError` state and updating Logbook Entry `budget`. ↓↓↓ //
  useEffect(() => {
    if (budget.value !== "") {
      if (Number(budget.value) === 0) {
        budgetError.value = "Please use positive values.";
      } else if (!Number(budget.value)) {
        budgetError.value = "Must be a number.";
      } else if (Number(budget.value) < 0) {
        budgetError.value = "Please use positive values.";
      } else if (Number(budget.value) > Number(remainingBudget)) {
        budgetError.value = "Exceeds remaining budget!";
      } else {
        budgetError.value = "";
      }
    } else {
      budgetError.value = "";
    }

    updateBudget();
  }, [budget.value]);

  return (
    <Container
      onClick={() => (props.opened.value = !props.opened.value)}
      opened={props.opened.value}
    >
      {headerSections.map((section: typeof headerSections[number]) => {
        return (
          <HeaderSection key={`logbook-entry-dropdown-header-${section}`}>
            <HeaderSectionTitle>{section}</HeaderSectionTitle>
            <Globals.InputMini
              borderRadius="four"
              errorMessage={selectHeaderError(section)}
              placeholder={section === "Date*" ? "MM/DD/YYYY" : "Budget"}
              userInput={selectHeaderValue(section)}
              setUserInput={selectHeaderValueSetter(section)}
              importance={
                section === "Status" ? setHeaderStatusImportance() : undefined
              }
              forwardText={
                section === "Spent" ||
                (section === "Budget" && Number(budget.value))
                  ? "$"
                  : ""
              }
              frozen={section === "Spent" || section === "Status"}
              removeSidePadding={section === "Spent" || section === "Status"}
            />
          </HeaderSection>
        );
      })}

      <DeleteButton
        type="button"
        name="Logbook Entry Dropdown Delete Button"
        tabIndex={-1}
        onClick={(event: Types.OnClick) => {
          event.stopPropagation();
          props.confirmLogbookEntryDelete.value = true;
        }}
      >
        <Icons.Close
          height={12}
          fill={Styles.background[theme.value].seven}
          hoveredFill={Styles.text[theme.value]}
          addHover
        />
      </DeleteButton>
    </Container>
  );
};
