import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";

enum LogbookEntriesActionTypes {
  FETCH_LOGBOOK_ENTRIES = "FETCH_LOGBOOK_ENTRIES",
  FETCH_LOGBOOK_LOGBOOK_ENTRIES = "FETCH_LOGBOOK_LOGBOOK_ENTRIES",
  FETCH_LOGBOOK_ENTRY = "FETCH_LOGBOOK_ENTRY",
  CREATE_LOGBOOK_ENTRY = "CREATE_LOGBOOK_ENTRY",
  UPDATE_LOGBOOK_ENTRY = "UPDATE_LOGBOOK_ENTRY",
  DELETE_LOGBOOK_ENTRY = "DELETE_LOGBOOK_ENTRY",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

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
  data: Types.LogbookEntryCreateData;
}>;
export function createLogbookEntryRequest(
  data: Types.LogbookEntryCreateData
): LogbookEntryCreateAction {
  return {
    type: LogbookEntriesActionTypes.CREATE_LOGBOOK_ENTRY,
    payload: { data },
  };
}

type LogbookEntryUpdateAction = Types.SagaAction<{
  logbookEntryId: number;
  data: Types.LogbookUpdateData;
}>;
export function updateLogbookEntryRequest(
  logbookEntryId: number,
  data: Types.LogbookUpdateData
): LogbookEntryUpdateAction {
  return {
    type: LogbookEntriesActionTypes.UPDATE_LOGBOOK_ENTRY,
    payload: { logbookEntryId, data },
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
    yield Saga.put(Redux.uiActions.setFetchingLogbookEntries(true));
    const response = yield Saga.call(axios.get, ApiRoutes.LOGBOOK_ENTRIES);
    yield Saga.put(Redux.entitiesActions.setLogbookEntries(response.data.data));
    yield Saga.put(Redux.uiActions.setFetchingLogbookEntries(false));
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

function* fetchLogbookLogbookEntries(action: LogbookLogbookEntriesAction) {
  try {
    yield Saga.put(Redux.uiActions.setFetchingLogbookEntries(true));
    const endpoint = ApiRoutes.LOGBOOK_ENTRIES + "/fetch-logbook-entries";
    const response = yield Saga.call(axios.get, endpoint, action.payload);
    yield Saga.put(Redux.entitiesActions.setLogbookEntries(response.data.data));
    yield Saga.put(Redux.uiActions.setFetchingLogbookEntries(false));
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

function* fetchLogbookEntry(action: LogbookEntryIdAction) {
  try {
    const { logbookEntryId } = action.payload;
    yield Saga.put(Redux.uiActions.setFetchingLogbookEntries(true));
    const endpoint = ApiRoutes.LOGBOOK_ENTRIES + `/${logbookEntryId}`;
    const response = yield Saga.call(axios.get, endpoint);
    yield Saga.put(Redux.entitiesActions.setLogbookEntries(response.data.data));
    yield Saga.put(Redux.uiActions.setFetchingLogbookEntries(false));
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

function* createLogbookEntry(action: LogbookEntryCreateAction) {
  try {
    yield Saga.put(Redux.uiActions.setFetchingLogbookEntries(true));
    const response = yield Saga.call(
      axios.post,
      ApiRoutes.LOGBOOK_ENTRIES,
      action.payload
    );
    yield Saga.put(Redux.entitiesActions.setLogbookEntries(response.data.data));
    yield Saga.put(Redux.uiActions.setFetchingLogbookEntries(false));
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

function* updateLogbookEntry(action: LogbookEntryUpdateAction) {
  try {
    const { logbookEntryId, data } = action.payload;
    yield Saga.put(Redux.uiActions.setFetchingLogbookEntries(true));
    const endpoint = ApiRoutes.LOGBOOK_ENTRIES + `/${logbookEntryId}`;
    const response = yield Saga.call(axios.patch, endpoint, data);
    yield Saga.put(Redux.entitiesActions.setLogbookEntries(response.data.data));
    yield Saga.put(Redux.uiActions.setFetchingLogbookEntries(false));
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

function* deleteLogbookEntry(action: LogbookEntryIdAction) {
  try {
    const { logbookEntryId } = action.payload;
    yield Saga.put(Redux.uiActions.setFetchingLogbookEntries(true));
    const endpoint = ApiRoutes.LOGBOOK_ENTRIES + `/${logbookEntryId}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.uiActions.setFetchingLogbookEntries(false));
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
