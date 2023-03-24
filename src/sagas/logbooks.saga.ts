import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";

enum LogbooksActionTypes {
  FETCH_LOGBOOKS = "FETCH_LOGBOOKS",
  FETCH_USER_LOGBOOKS = "FETCH_USER_LOGBOOKS",
  FETCH_LOGBOOK = "FETCH_LOGBOOK",
  CREATE_LOGBOOK = "CREATE_LOGBOOK",
  UPDATE_LOGBOOK = "UPDATE_LOGBOOK",
  DELETE_LOGBOOK = "DELETE_LOGBOOK",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

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

type LogbookCreateAction = Types.SagaAction<{ data: Types.LogbookCreateData }>;
export function createLogbookRequest(
  data: Types.LogbookCreateData
): LogbookCreateAction {
  return {
    type: LogbooksActionTypes.CREATE_LOGBOOK,
    payload: { data },
  };
}

type LogbookUpdateAction = Types.SagaAction<{
  logbookId: number;
  data: Types.LogbookUpdateData;
}>;
export function updateLogbookRequest(
  logbookId: number,
  data: Types.LogbookUpdateData
): LogbookUpdateAction {
  return {
    type: LogbooksActionTypes.UPDATE_LOGBOOK,
    payload: { logbookId, data },
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
    yield Saga.put(Redux.uiActions.setFetchingLogbooks(true));
    const response = yield Saga.call(axios.get, ApiRoutes.LOGBOOKS);
    yield Saga.put(Redux.entitiesActions.setLogbooks(response.data.data));
    yield Saga.put(Redux.uiActions.setFetchingLogbooks(false));
  } catch (error) {
    console.log(error);
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
    yield Saga.put(Redux.uiActions.setFetchingLogbooks(true));
    const endpoint = ApiRoutes.LOGBOOKS + "/fetch-user-logbooks";
    const response = yield Saga.call(axios.get, endpoint, action.payload);
    yield Saga.put(Redux.entitiesActions.setLogbooks(response.data.data));
    yield Saga.put(Redux.uiActions.setFetchingLogbooks(false));
  } catch (error) {
    console.log(error);
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
    yield Saga.put(Redux.uiActions.setFetchingLogbooks(true));
    const endpoint = ApiRoutes.LOGBOOKS + `${logbookId}`;
    const response = yield Saga.call(axios.get, endpoint);
    yield Saga.put(Redux.entitiesActions.setLogbooks(response.data.data));
    yield Saga.put(Redux.uiActions.setFetchingLogbooks(false));
  } catch (error) {
    console.log(error);
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
    const { data } = action.payload;
    yield Saga.put(Redux.uiActions.setFetchingLogbooks(true));
    const response = yield Saga.call(axios.post, ApiRoutes.LOGBOOKS, data);
    yield Saga.put(Redux.entitiesActions.setLogbooks(response.data.data));
    yield Saga.put(Redux.uiActions.setFetchingLogbooks(false));
  } catch (error) {
    console.log(error);
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
    const { logbookId, data } = action.payload;
    yield Saga.put(Redux.uiActions.setFetchingLogbooks(true));
    const endpoint = ApiRoutes.LOGBOOKS + `/${logbookId}`;
    const response = yield Saga.call(axios.patch, endpoint, data);
    yield Saga.put(Redux.entitiesActions.setLogbooks(response.data.data));
    yield Saga.put(Redux.uiActions.setFetchingLogbooks(false));
  } catch (error) {
    console.log(error);
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
    yield Saga.put(Redux.uiActions.setFetchingLogbooks(true));
    const endpoint = ApiRoutes.LOGBOOKS + `/${logbookId}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.uiActions.setFetchingLogbooks(false));
  } catch (error) {
    console.log(error);
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
