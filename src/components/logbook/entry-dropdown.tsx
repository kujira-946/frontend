import * as Drag from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { memo } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence } from "framer-motion";

import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "../layout";

import { Header } from "./entry-dropdown-header";
import { EntryDropdownBody } from "./entry-dropdown-body";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type ContainerProps = { opened: boolean };

const Container = styled.section<ContainerProps>`
  position: relative;
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border: ${(props: ContainerProps & ThemeProps) => {
    return props.opened
      ? `${props.theme.backgroundSix} solid 1px`
      : `${props.theme.backgroundFour} solid 1px`;
  }};
  border-radius: ${Styles.pxAsRem.six};
  overflow: hidden;
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

  onDragEnd: (
    result: Drag.DropResult,
    provided: Drag.ResponderProvided
  ) => void;
  deleteLogbookEntry: (logbookEntryId: number) => void;
  deleteSelectedPurchases: (logbookEntryIds: number[]) => void;
  deleteAllPurchases: (logbookEntryId: number) => void;
  addPurchase: (logbookEntryId: number) => void;
};

const ExportedComponent = (props: Props) => {
  const opened = useSignal(false);
  const confirmLogbookEntryDelete = useSignal(false);
  const confirmPurchasesDelete = useSignal(false);

  return (
    <>
      <AnimatePresence>
        {confirmLogbookEntryDelete.value && (
          <DynamicDeleteConfirmation
            title="Are you sure you want to delete this logbook entry?"
            open={confirmLogbookEntryDelete}
            onClose={() => (confirmLogbookEntryDelete.value = false)}
            onConfirm={() => props.deleteLogbookEntry(props.logbookEntryId)}
            fixed
          />
        )}
      </AnimatePresence>

      <Container opened={opened.value}>
        <AnimatePresence>
          {confirmPurchasesDelete.value && (
            <DynamicDeleteConfirmation
              title="Delete all purchases for this entry?"
              open={confirmPurchasesDelete}
              onClose={() => (confirmPurchasesDelete.value = false)}
              onConfirm={() => props.deleteAllPurchases(props.logbookEntryId)}
              borderRadius="four"
              fixed
            />
          )}
        </AnimatePresence>

        <Header
          logbookEntryId={props.logbookEntryId}
          opened={opened}
          confirmLogbookEntryDelete={confirmLogbookEntryDelete}
        />

        <AnimatePresence>
          {opened.value && (
            <EntryDropdownBody
              logbookEntryId={props.logbookEntryId}
              opened={opened.value}
              confirmPurchasesDelete={confirmPurchasesDelete}
              onDragEnd={props.onDragEnd}
              deleteLogbookEntry={props.deleteLogbookEntry}
              deleteSelectedPurchases={props.deleteSelectedPurchases}
              deleteAllPurchases={props.deleteAllPurchases}
              addPurchase={props.addPurchase}
            />
          )}
        </AnimatePresence>
      </Container>
    </>
  );
};

export const LogbookEntryDropdown = memo(ExportedComponent);
