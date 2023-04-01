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

const logbookEntriesSchema = new schema.Entity("logbookEntries");
const logbookEntrySchema = new schema.Entity("logbookEntry");

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

enum LogbookEntriesActionTypes {
  FETCH_LOGBOOK_ENTRIES = "FETCH_LOGBOOK_ENTRIES",
  FETCH_LOGBOOK_LOGBOOK_ENTRIES = "FETCH_LOGBOOK_LOGBOOK_ENTRIES",
  FETCH_LOGBOOK_ENTRY = "FETCH_LOGBOOK_ENTRY",
  CREATE_LOGBOOK_ENTRY = "CREATE_LOGBOOK_ENTRY",
  UPDATE_LOGBOOK_ENTRY = "UPDATE_LOGBOOK_ENTRY",
  DELETE_LOGBOOK_ENTRY = "DELETE_LOGBOOK_ENTRY",
}

export function fetchLogbookEntriesRequest(): Types.NullAction {
  return {
    type: LogbookEntriesActionTypes.FETCH_LOGBOOK_ENTRIES,
    payload: null,
  };
}

type LogbookLogbookEntriesAction = Types.SagaAction<{ logbookId: number }>;
export function fetchLogbookLogbookEntriesRequest(
  logbookId: number
): LogbookLogbookEntriesAction {
  return {
    type: LogbookEntriesActionTypes.FETCH_LOGBOOK_LOGBOOK_ENTRIES,
    payload: { logbookId },
  };
}

type LogbookEntryIdAction = Types.SagaAction<{ logbookEntryId: number }>;

export function fetchLogbookEntryRequest(
  logbookEntryId: number
): LogbookEntryIdAction {
  return {
    type: LogbookEntriesActionTypes.FETCH_LOGBOOK_ENTRY,
    payload: { logbookEntryId },
  };
}

type LogbookEntryCreateAction = Types.SagaAction<{
  createData: Types.LogbookEntryCreateData;
}>;
export function createLogbookEntryRequest(
  createData: Types.LogbookEntryCreateData
): LogbookEntryCreateAction {
  return {
    type: LogbookEntriesActionTypes.CREATE_LOGBOOK_ENTRY,
    payload: { createData },
  };
}

type LogbookEntryUpdateAction = Types.SagaAction<{
  logbookEntryId: number;
  updateData: Types.LogbookUpdateData;
}>;
export function updateLogbookEntryRequest(
  logbookEntryId: number,
  updateData: Types.LogbookUpdateData
): LogbookEntryUpdateAction {
  return {
    type: LogbookEntriesActionTypes.UPDATE_LOGBOOK_ENTRY,
    payload: { logbookEntryId, updateData },
  };
}

export function deleteLogbookEntryRequest(
  logbookEntryId: number
): LogbookEntryIdAction {
  return {
    type: LogbookEntriesActionTypes.DELETE_LOGBOOK_ENTRY,
    payload: { logbookEntryId },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchLogbookEntries() {
  try {
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(true));
    const { data } = yield Saga.call(axios.get, ApiRoutes.LOGBOOK_ENTRIES);
    const normalizedData = normalize(data.data, [logbookEntriesSchema]);
    const { logbookEntries } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.setLogbookEntries(
        logbookEntries as Types.LogbookEntriesEntity
      )
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(false));
    Functions.sagaError(error);
  }
}

function* fetchLogbookLogbookEntries(action: LogbookLogbookEntriesAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(true));
    const { logbookId } = action.payload;
    const endpoint = ApiRoutes.LOGBOOK_ENTRIES + `/fetch-logbook-entries`;
    const { data } = yield Saga.call(axios.get, endpoint, logbookId as any);
    const normalizedData = normalize(data.data, [logbookEntriesSchema]);
    const { logbookEntries } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.addLogbookEntries(
        logbookEntries as Types.LogbookEntriesEntity
      )
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(false));
    Functions.sagaError(error);
  }
}

function* fetchLogbookEntry(action: LogbookEntryIdAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(true));
    const { logbookEntryId } = action.payload;
    const endpoint = ApiRoutes.LOGBOOK_ENTRIES + `/${logbookEntryId}`;
    const { data } = yield Saga.call(axios.get, endpoint);
    const normalizedData = normalize(data.data, logbookEntrySchema);
    const { logbookEntry } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.addLogbookEntries(
        logbookEntry as Types.LogbookEntriesEntity
      )
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(false));
    Functions.sagaError(error);
  }
}

function* createLogbookEntry(action: LogbookEntryCreateAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(true));
    const { createData } = action.payload;
    const { data } = yield Saga.call(
      axios.post,
      ApiRoutes.LOGBOOK_ENTRIES,
      createData
    );
    const normalizedData = normalize(data.data, logbookEntrySchema);
    const { logbookEntry } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.addLogbookEntries(
        logbookEntry as Types.LogbookEntriesEntity
      )
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(false));
    Functions.sagaError(error);
  }
}

function* updateLogbookEntry(action: LogbookEntryUpdateAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(true));
    const { logbookEntryId, updateData } = action.payload;
    const endpoint = ApiRoutes.LOGBOOK_ENTRIES + `/${logbookEntryId}`;
    const { data } = yield Saga.call(axios.patch, endpoint, updateData);
    const normalizedData = normalize(data.data, logbookEntrySchema);
    const { logbookEntry } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.addLogbookEntries(
        logbookEntry as Types.LogbookEntriesEntity
      )
    );
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(false));
    Functions.sagaError(error);
  }
}

function* deleteLogbookEntry(action: LogbookEntryIdAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(true));
    const { logbookEntryId } = action.payload;
    const endpoint = ApiRoutes.LOGBOOK_ENTRIES + `/${logbookEntryId}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.deleteLogbookEntry(logbookEntryId));
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingLogbookEntries(false));
    Functions.sagaError(error);
  }
}

export function* logbookEntriesSaga() {
  yield Saga.all([
    Saga.takeEvery(
      LogbookEntriesActionTypes.FETCH_LOGBOOK_ENTRIES,
      fetchLogbookEntries
    ),
    Saga.takeEvery(
      LogbookEntriesActionTypes.FETCH_LOGBOOK_LOGBOOK_ENTRIES,
      fetchLogbookLogbookEntries
    ),
    Saga.takeEvery(
      LogbookEntriesActionTypes.FETCH_LOGBOOK_ENTRY,
      fetchLogbookEntry
    ),
    Saga.takeEvery(
      LogbookEntriesActionTypes.CREATE_LOGBOOK_ENTRY,
      createLogbookEntry
    ),
    Saga.takeEvery(
      LogbookEntriesActionTypes.UPDATE_LOGBOOK_ENTRY,
      updateLogbookEntry
    ),
    Saga.takeEvery(
      LogbookEntriesActionTypes.DELETE_LOGBOOK_ENTRY,
      deleteLogbookEntry
    ),
  ]);
}
