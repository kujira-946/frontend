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

type UserLogbooksAction = Types.SagaAction<{
  ownerId: number;
  forCurrentUser: boolean;
}>;
export function fetchUserLogbooksRequest(
  ownerId: number,
  forCurrentUser: boolean = true
): UserLogbooksAction {
  return {
    type: LogbooksActionTypes.FETCH_USER_LOGBOOKS,
    payload: { ownerId, forCurrentUser },
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
  forCurrentUser: boolean;
}>;
export function createLogbookRequest(
  createData: Types.LogbookCreateData,
  forCurrentUser: boolean = true
): LogbookCreateAction {
  return {
    type: LogbooksActionTypes.CREATE_LOGBOOK,
    payload: { createData, forCurrentUser },
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
    const normalizedData = normalize(data.data, [logbooksSchema]);
    const { logbooks } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.setLogbooks(logbooks as Types.LogbooksEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
    yield Functions.sagaError(error);
  }
}

function* fetchUserLogbooks(action: UserLogbooksAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(true));
    const { ownerId, forCurrentUser } = action.payload;
    const endpoint = ApiRoutes.LOGBOOKS + `/fetch-user-logbooks`;
    const { data } = yield Saga.call(axios.post, endpoint, { ownerId });
    const normalizedData = normalize(data.data, [logbooksSchema]);
    const { logbooks } = normalizedData.entities;
    const logbookIds = normalizedData.result;
    yield Saga.put(
      Redux.entitiesActions.addLogbook(logbooks as Types.LogbooksEntity)
    );
    if (forCurrentUser) {
      yield Saga.put(
        Redux.entitiesActions.updateCurrentUserRelations({
          relationalField: "logbookIds",
          ids: logbookIds.length > 0 ? logbookIds : [logbookIds],
        })
      );
    }
    yield Saga.put(
      Redux.entitiesActions.updateUserRelations({
        userId: ownerId,
        relationalField: "logbookIds",
        ids: logbookIds.length > 0 ? logbookIds : [logbookIds],
      })
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
    yield Functions.sagaError(error);
  }
}

function* fetchLogbook(action: LogbookIdAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(true));
    const { logbookId } = action.payload;
    const endpoint = ApiRoutes.LOGBOOKS + `/${logbookId}`;
    const { data } = yield Saga.call(axios.get, endpoint);
    const normalizedData = normalize(data.data, logbookSchema);
    const { logbook } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.addLogbook(logbook as Types.LogbooksEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
    yield Functions.sagaError(error);
  }
}

function* createLogbook(action: LogbookCreateAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(true));
    const { createData, forCurrentUser } = action.payload;
    const { data } = yield Saga.call(
      axios.post,
      ApiRoutes.LOGBOOKS,
      createData
    );
    const normalizedData = normalize(data.data, logbookSchema);
    const { logbook } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.addLogbook(logbook as Types.LogbooksEntity)
    );
    if (forCurrentUser) {
      yield Saga.put(
        Redux.entitiesActions.updateCurrentUserRelations({
          relationalField: "logbookIds",
          ids: [normalizedData.result],
        })
      );
    }
    yield Saga.put(
      Redux.entitiesActions.updateUserRelations({
        userId: createData.ownerId,
        relationalField: "logbookIds",
        ids: [normalizedData.result],
      })
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
    yield Functions.sagaError(error);
  }
}

function* updateLogbook(action: LogbookUpdateAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(true));
    const { logbookId, updateData } = action.payload;
    const endpoint = ApiRoutes.LOGBOOKS + `/${logbookId}`;
    const { data } = yield Saga.call(axios.patch, endpoint, updateData);
    yield Saga.put(
      Redux.entitiesActions.updateLogbook({ logbookId, logbook: data.data })
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
    yield Functions.sagaError(error);
  }
}

function* deleteLogbook(action: LogbookIdAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(true));
    const { logbookId } = action.payload;
    const endpoint = ApiRoutes.LOGBOOKS + `/${logbookId}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.deleteLogbook(logbookId));
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingLogbooks(false));
    yield Functions.sagaError(error);
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
