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

const logbooksSchema = new schema.Entity("logbooks");
const logbookSchema = new schema.Entity("logbook");

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

enum LogbooksActionTypes {
  FETCH_LOGBOOKS = "FETCH_LOGBOOKS",
  FETCH_USER_LOGBOOKS = "FETCH_USER_LOGBOOKS",
  FETCH_LOGBOOK = "FETCH_LOGBOOK",
  CREATE_LOGBOOK = "CREATE_LOGBOOK",
  UPDATE_LOGBOOK = "UPDATE_LOGBOOK",
  DELETE_LOGBOOK = "DELETE_LOGBOOK",
}

export function fetchLogbooksRequest(): Types.NullAction {
  return {
    type: LogbooksActionTypes.FETCH_LOGBOOKS,
    payload: null,
  };
}

type UserLogbooksAction = Types.SagaAction<{ ownerId: number }>;
export function fetchUserLogbooksRequest(ownerId: number): UserLogbooksAction {
  return {
    type: LogbooksActionTypes.FETCH_USER_LOGBOOKS,
    payload: { ownerId },
  };
}

type LogbookIdAction = Types.SagaAction<{ logbookId: number }>;

export function fetchLogbookRequest(logbookId: number): LogbookIdAction {
  return {
    type: LogbooksActionTypes.FETCH_LOGBOOK,
    payload: { logbookId },
  };
}

type LogbookCreateAction = Types.SagaAction<{
  createData: Types.LogbookCreateData;
}>;
export function createLogbookRequest(
  createData: Types.LogbookCreateData
): LogbookCreateAction {
  return {
    type: LogbooksActionTypes.CREATE_LOGBOOK,
    payload: { createData },
  };
}

type LogbookUpdateAction = Types.SagaAction<{
  logbookId: number;
  updateData: Types.LogbookUpdateData;
}>;
export function updateLogbookRequest(
  logbookId: number,
  updateData: Types.LogbookUpdateData
): LogbookUpdateAction {
  return {
    type: LogbooksActionTypes.UPDATE_LOGBOOK,
    payload: { logbookId, updateData },
  };
}

export function deleteLogbookRequest(logbookId: number): LogbookIdAction {
  return {
    type: LogbooksActionTypes.DELETE_LOGBOOK,
    payload: { logbookId },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchLogbooks() {
  try {
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(true));
    const { data } = yield Saga.call(axios.get, ApiRoutes.LOGBOOKS);
    const { logbooks } = normalize(data.data, [logbooksSchema]).entities;
    yield Saga.put(
      Redux.entitiesActions.setLogbooks(logbooks as Types.LogbooksEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 5000,
      })
    );
  }
}

function* fetchUserLogbooks(action: UserLogbooksAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(true));
    const endpoint = ApiRoutes.LOGBOOKS + `/fetch-user-logbooks`;
    const { data } = yield Saga.call(
      axios.get,
      endpoint,
      action.payload as any
    );
    const { logbooks } = normalize(data.data, [logbooksSchema]).entities;
    yield Saga.put(
      Redux.entitiesActions.addLogbook(logbooks as Types.LogbooksEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 5000,
      })
    );
  }
}

function* fetchLogbook(action: LogbookIdAction) {
  try {
    const { logbookId } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(true));
    const endpoint = ApiRoutes.LOGBOOKS + `/${logbookId}`;
    const { data } = yield Saga.call(axios.get, endpoint);
    const { logbook } = normalize(data.data, logbookSchema).entities;
    yield Saga.put(
      Redux.entitiesActions.addLogbook(logbook as Types.LogbooksEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 5000,
      })
    );
  }
}

function* createLogbook(action: LogbookCreateAction) {
  try {
    const { createData } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(true));
    const { data } = yield Saga.call(
      axios.post,
      ApiRoutes.LOGBOOKS,
      createData
    );
    const { logbook } = normalize(data.data, logbookSchema).entities;
    yield Saga.put(
      Redux.entitiesActions.addLogbook(logbook as Types.LogbooksEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 5000,
      })
    );
  }
}

function* updateLogbook(action: LogbookUpdateAction) {
  try {
    const { logbookId, updateData } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(true));
    const endpoint = ApiRoutes.LOGBOOKS + `/${logbookId}`;
    const { data } = yield Saga.call(axios.patch, endpoint, updateData);
    const { logbook } = normalize(data.data, logbookSchema).entities;
    yield Saga.put(
      Redux.entitiesActions.addLogbook(logbook as Types.LogbooksEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 5000,
      })
    );
  }
}

function* deleteLogbook(action: LogbookIdAction) {
  try {
    const { logbookId } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(true));
    const endpoint = ApiRoutes.LOGBOOKS + `/${logbookId}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.deleteLogbook(logbookId));
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 5000,
      })
    );
  }
}

export function* logbooksSaga() {
  yield Saga.all([
    Saga.takeEvery(LogbooksActionTypes.FETCH_LOGBOOKS, fetchLogbooks),
    Saga.takeEvery(LogbooksActionTypes.FETCH_USER_LOGBOOKS, fetchUserLogbooks),
    Saga.takeEvery(LogbooksActionTypes.FETCH_LOGBOOK, fetchLogbook),
    Saga.takeEvery(LogbooksActionTypes.CREATE_LOGBOOK, createLogbook),
    Saga.takeEvery(LogbooksActionTypes.UPDATE_LOGBOOK, updateLogbook),
    Saga.takeEvery(LogbooksActionTypes.DELETE_LOGBOOK, deleteLogbook),
  ]);
}
