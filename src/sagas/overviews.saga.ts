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

const overviewsSchema = new schema.Entity("overviews");
const overviewSchema = new schema.Entity("overview");

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

enum OverviewsActionTypes {
  FETCH_OVERVIEWS = "FETCH_OVERVIEWS",
  FETCH_USER_OVERVIEWS = "FETCH_USER_OVERVIEWS",
  BULK_FETCH_OVERVIEWS = "BULK_FETCH_OVERVIEWS",
  FETCH_OVERVIEW = "FETCH_OVERVIEW",
  CREATE_OVERVIEW = "CREATE_OVERVIEW",
  UPDATE_OVERVIEW = "UPDATE_OVERVIEW",
  DELETE_OVERVIEW = "DELETE_OVERVIEW",
}

export function fetchOverviewsRequest(): Types.NullAction {
  return {
    type: OverviewsActionTypes.FETCH_OVERVIEWS,
    payload: null,
  };
}

type UserOverviewsAction = Types.SagaAction<{ ownerId: number }>;
export function fetchUserOverviewsRequest(
  ownerId: number
): UserOverviewsAction {
  return {
    type: OverviewsActionTypes.FETCH_USER_OVERVIEWS,
    payload: { ownerId },
  };
}

type OverviewIdsAction = Types.SagaAction<{ overviewIds: number[] }>;
export function bulkFetchOverviewsRequest(
  overviewIds: number[]
): OverviewIdsAction {
  return {
    type: OverviewsActionTypes.BULK_FETCH_OVERVIEWS,
    payload: { overviewIds },
  };
}

type OverviewIdAction = Types.SagaAction<{ overviewId: number }>;

export function fetchOverviewRequest(overviewId: number): OverviewIdAction {
  return {
    type: OverviewsActionTypes.FETCH_OVERVIEW,
    payload: { overviewId },
  };
}

type OverviewCreateAction = Types.SagaAction<{
  createData: Types.OverviewCreateData;
}>;
export function createOverviewRequest(
  createData: Types.OverviewCreateData
): OverviewCreateAction {
  return {
    type: OverviewsActionTypes.CREATE_OVERVIEW,
    payload: { createData },
  };
}

type OverviewUpdateAction = Types.SagaAction<{
  overviewId: number;
  updateData: Types.OverviewUpdateData;
}>;
export function updateOverviewRequest(
  overviewId: number,
  updateData: Types.OverviewUpdateData
): OverviewUpdateAction {
  return {
    type: OverviewsActionTypes.UPDATE_OVERVIEW,
    payload: { overviewId, updateData },
  };
}

export function deleteOverviewRequest(overviewId: number): OverviewIdAction {
  return {
    type: OverviewsActionTypes.DELETE_OVERVIEW,
    payload: { overviewId },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchOverviews() {
  try {
    yield Saga.put(Redux.uiActions.setLoadingOverviews(true));
    const { data } = yield Saga.call(axios.get, ApiRoutes.OVERVIEWS);
    const { overviews } = normalize(data.data, [overviewsSchema]).entities;
    yield Saga.put(
      Redux.entitiesActions.setOverviews(overviews as Types.OverviewsEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
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

function* fetchUserOverviews(action: UserOverviewsAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingOverviews(true));
    const endpoint = ApiRoutes.OVERVIEWS + `/fetch-user-overviews`;
    const { data } = yield Saga.call(
      axios.get,
      endpoint,
      action.payload as any
    );
    const normalizedData = normalize(data.data, [overviewsSchema]);
    const { overviews } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.addOverview(overviews as Types.OverviewsEntity)
    );
    // yield Saga.put(
    //   Redux.entitiesActions.addRelationalIdsToCurrentUser({
    //     userId: action.payload.ownerId,
    //     relationalField: "overviewIds",
    //     ids: normalizedData.result,
    //   })
    // );
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
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

function* bulkFetchOverviews(action: OverviewIdsAction) {
  yield Saga.put(Redux.uiActions.setLoadingOverviews(true));
  const endpoint = ApiRoutes.OVERVIEWS + `/bulk-fetch`;
  const { data } = yield Saga.call(axios.get, endpoint, action.payload as any);
  const { overviews } = normalize(data.data, [overviewsSchema]).entities;
  yield Saga.put(
    Redux.entitiesActions.addOverview(overviews as Types.OverviewsEntity)
  );
  yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
  try {
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
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

function* fetchOverview(action: OverviewIdAction) {
  yield Saga.put(Redux.uiActions.setLoadingOverviews(true));
  const endpoint = ApiRoutes.OVERVIEWS + `/${action.payload.overviewId}`;
  const { data } = yield Saga.call(axios.get, endpoint);
  const { overview } = normalize(data.data, overviewSchema).entities;
  yield Saga.put(
    Redux.entitiesActions.addOverview(overview as Types.OverviewsEntity)
  );
  yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
  try {
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
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

function* createOverview(action: OverviewCreateAction) {
  const { createData } = action.payload;
  yield Saga.put(Redux.uiActions.setLoadingOverviews(true));
  const { data } = yield Saga.call(axios.post, ApiRoutes.OVERVIEWS, createData);
  const normalizedData = normalize(data.data, overviewSchema);
  const { overview } = normalizedData.entities;
  yield Saga.put(
    Redux.entitiesActions.addOverview(overview as Types.OverviewsEntity)
  );
  yield Saga.put(
    Redux.entitiesActions.addRelationalIdsToCurrentUser({
      relationalField: "overviewIds",
      ids: [normalizedData.result],
    })
  );
  yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
  try {
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
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

function* updateOverview(action: OverviewUpdateAction) {
  try {
    const { overviewId, updateData } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingOverviews(true));
    const endpoint = ApiRoutes.OVERVIEWS + `${overviewId}`;
    const { data } = yield Saga.call(axios.patch, endpoint, updateData);
    const { overview } = normalize(data.data, overviewSchema).entities;
    yield Saga.put(
      Redux.entitiesActions.addOverview(overview as Types.OverviewsEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
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

function* deleteOverview(action: OverviewIdAction) {
  try {
    const { overviewId } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingOverviews(true));
    const endpoint = ApiRoutes.OVERVIEWS + `${overviewId}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.deleteOverview(overviewId));
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
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

export function* overviewsSaga() {
  yield Saga.all([
    Saga.takeEvery(OverviewsActionTypes.FETCH_OVERVIEWS, fetchOverviews),
    Saga.takeEvery(
      OverviewsActionTypes.FETCH_USER_OVERVIEWS,
      fetchUserOverviews
    ),
    Saga.takeEvery(
      OverviewsActionTypes.BULK_FETCH_OVERVIEWS,
      bulkFetchOverviews
    ),
    Saga.takeEvery(OverviewsActionTypes.FETCH_OVERVIEW, fetchOverview),
    Saga.takeEvery(OverviewsActionTypes.CREATE_OVERVIEW, createOverview),
    Saga.takeEvery(OverviewsActionTypes.UPDATE_OVERVIEW, updateOverview),
    Saga.takeEvery(OverviewsActionTypes.DELETE_OVERVIEW, deleteOverview),
  ]);
}
