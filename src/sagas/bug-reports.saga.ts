import * as Saga from "redux-saga/effects";
import axios from "axios";
import { normalize, schema } from "normalizr";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";

// ========================================================================================= //
// [ SCHEMAS ] ============================================================================= //
// ========================================================================================= //

const bugReportSchema = new schema.Entity("bugReport");

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

enum BugReportActionTypes {
  CREATE_BUG_REPORT = "CREATE_BUG_REPORT",
  DELETE_BUG_REPORT = "DELETE_BUG_REPORT",
}

type CreateAction = Types.SagaAction<{
  createData: Types.BugReportCreateData;
}>;
export function createBugReportRequest(
  createData: Types.BugReportCreateData
): CreateAction {
  return {
    type: BugReportActionTypes.CREATE_BUG_REPORT,
    payload: { createData },
  };
}

type DeleteAction = Types.SagaAction<{ bugReportId: number }>;
export function deleteBugReportRequest(bugReportId: number): DeleteAction {
  return {
    type: BugReportActionTypes.DELETE_BUG_REPORT,
    payload: { bugReportId },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* createBugReport(action: CreateAction) {
  try {
    const { createData } = action.payload;

    console.log("createData:", createData);

    const { data } = yield Saga.call(
      axios.post,
      ApiRoutes.BUG_REPORTS,
      createData
    );
    yield Saga.put(
      Redux.entitiesActions.updateCurrentUserRelations({
        relationalField: "bugReportIds",
        ids: data.id ? [data.id] : [],
      })
    );
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: data.title,
        body: data.body,
        type: "success",
        timeout: 5000,
      })
    );
  } catch (error) {
    yield Functions.sagaError(error);
  }
}

function* deleteBugReport(action: DeleteAction) {
  try {
    const { bugReportId } = action.payload;
    const { data } = yield Saga.call(
      axios.delete,
      `/${ApiRoutes.BUG_REPORTS}/${bugReportId}`
    );
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Success!",
        body: data.body,
        type: "success",
        timeout: 5000,
      })
    );
  } catch (error) {
    yield Functions.sagaError(error);
  }
}

export function* bugReportsSaga() {
  yield Saga.all([
    Saga.takeEvery(BugReportActionTypes.CREATE_BUG_REPORT, createBugReport),
    Saga.takeEvery(BugReportActionTypes.DELETE_BUG_REPORT, deleteBugReport),
  ]);
}
