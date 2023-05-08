import dynamic from "next/dynamic";
import styled from "styled-components";
import { useEffect } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence } from "framer-motion";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { deleteLogbookEntryRequest } from "@/sagas/logbook-entries.saga";
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
  const confirmLogbookEntryDelete = useSignal(false);

  function openDeleteConfirmationModal(event: Types.OnClick): void {
    event.stopPropagation();
    confirmLogbookEntryDelete.value = true;
  }

  function deleteLogbookEntry(): void {
    dispatch(deleteLogbookEntryRequest(props.logbookEntryId));
  }

  useEffect(() => {
    if (logbookEntry) {
      date.value = logbookEntry.date;
      if (logbookEntry.budget) {
        budget.value = Functions.roundNumber(logbookEntry.budget, 2);
      } else {
        budget.value = "";
      }
    }
  }, [logbookEntry]);

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
              type="large"
              isCost
            />
          </Section>

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
