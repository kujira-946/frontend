import { effect, useSignal } from "@preact/signals-react";

import * as Globals from "@/components";
import * as Sagas from "@/sagas";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";

import { ConfirmationModal } from "./confirmation-modal";

export const BugReportModal = () => {
  const dispatch = Functions.useAppDispatch();

  const { bugReportModalOpen } = Functions.useSignalsStore().dashboard;
  const { currentUser } = Functions.useEntitiesSlice();

  const title = useSignal("");
  const body = useSignal("");

  const titleError = useSignal("");
  const bodyError = useSignal("");

  function setTitle(event: Types.Input): void {
    title.value = event.currentTarget.value;
  }

  function setBody(event: Types.Input): void {
    body.value = event.currentTarget.value;
  }

  function sendBugReport(): void {
    if (currentUser && !titleError.value && !bodyError.value) {
      dispatch(
        Sagas.createBugReportRequest({
          title: title.value,
          body: body.value || null,
          ownerId: currentUser.id,
        })
      );

      title.value = "";
      body.value = "";
      bugReportModalOpen.value = false;
    }
  }

  effect(() => {
    if (title.value.length === 0) {
      titleError.value = "You must include a title.";
    } else if (title.value.length > 100) {
      titleError.value = "Max. 100 characters.";
    } else {
      titleError.value = "";
    }

    if (body.value.length > 250) {
      bodyError.value = "Max. 250 characters.";
    } else {
      bodyError.value = "";
    }
  });

  return (
    <Globals.Portal>
      <ConfirmationModal
        shouldEnter={bugReportModalOpen.value}
        headerTitle="Bug Report"
        bodyText={["Only use this form to report issues with the app."]}
        submitButtonText="Submit Report"
        submitAction={sendBugReport}
        closeAction={() => (bugReportModalOpen.value = false)}
        disableSubmit={!!titleError.value}
        overlay
      >
        <Globals.FormInput
          key="bug-report-modal-form-input-1-title"
          type="text"
          userInput={title.value}
          setUserInput={setTitle}
          placeholder="*What is the issue?"
          errorMessage={titleError.value}
          borderRadius="six"
          required
        />

        <Globals.FormInput
          key="bug-report-modal-form-input-2-body"
          type="text"
          userInput={body.value}
          setUserInput={setBody}
          placeholder="Please describe your issue in more detail"
          errorMessage={bodyError.value}
          borderRadius="six"
        />
      </ConfirmationModal>
    </Globals.Portal>
  );
};
