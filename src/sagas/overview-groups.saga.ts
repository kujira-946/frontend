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

const overviewGroupsSchema = new schema.Entity("overviewGroups");
const overviewGroupSchema = new schema.Entity("overviewGroup");

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

enum OverviewGroupsActionTypes {
  FETCH_OVERVIEW_GROUPS = "FETCH_OVERVIEW_GROUPS",
  FETCH_OVERVIEW_OVERVIEW_GROUPS = "FETCH_OVERVIEW_OVERVIEW_GROUPS",
  BULK_FETCH_OVERVIEW_GROUPS = "BULK_FETCH_OVERVIEW_GROUPS",
  FETCH_OVERVIEW_GROUP = "FETCH_OVERVIEW_GROUP",
  CREATE_OVERVIEW_GROUP = "CREATE_OVERVIEW_GROUP",
  UPDATE_OVERVIEW_GROUP = "UPDATE_OVERVIEW_GROUP",
  DELETE_OVERVIEW_GROUP = "DELETE_OVERVIEW_GROUP",
}

export function fetchOverviewGroupsRequest(): Types.NullAction {
  return {
    type: OverviewGroupsActionTypes.FETCH_OVERVIEW_GROUPS,
    payload: null,
  };
}

type OverviewOverviewGroupsAction = Types.SagaAction<{ overviewId: number }>;
export function fetchOverviewOverviewGroupsRequest(
  overviewId: number
): OverviewOverviewGroupsAction {
  return {
    type: OverviewGroupsActionTypes.FETCH_OVERVIEW_OVERVIEW_GROUPS,
    payload: { overviewId },
  };
}

type OverviewGroupIdsAction = Types.SagaAction<{ overviewGroupIds: number[] }>;
export function bulkFetchOverviewGroupsRequest(
  overviewGroupIds: number[]
): OverviewGroupIdsAction {
  return {
    type: OverviewGroupsActionTypes.BULK_FETCH_OVERVIEW_GROUPS,
    payload: { overviewGroupIds },
  };
}

type OverviewGroupIdAction = Types.SagaAction<{ overviewGroupId: number }>;

export function fetchOverviewGroupRequest(
  overviewGroupId: number
): OverviewGroupIdAction {
  return {
    type: OverviewGroupsActionTypes.FETCH_OVERVIEW_GROUP,
    payload: { overviewGroupId },
  };
}

type OverviewGroupCreateAction = Types.SagaAction<{
  createData: Types.OverviewGroupCreateData;
}>;
export function createOverviewGroupRequest(
  createData: Types.OverviewGroupCreateData
): OverviewGroupCreateAction {
  return {
    type: OverviewGroupsActionTypes.CREATE_OVERVIEW_GROUP,
    payload: { createData },
  };
}

type OverviewGroupUpdateAction = Types.SagaAction<{
  overviewGroupId: number;
  updateData: Types.OverviewGroupUpdateData;
}>;
export function updateOverviewGroupRequest(
  overviewGroupId: number,
  updateData: Types.OverviewGroupUpdateData
): OverviewGroupUpdateAction {
  return {
    type: OverviewGroupsActionTypes.UPDATE_OVERVIEW_GROUP,
    payload: { overviewGroupId, updateData },
  };
}

export function deleteOverviewGroupRequest(
  overviewGroupId: number
): OverviewGroupIdAction {
  return {
    type: OverviewGroupsActionTypes.DELETE_OVERVIEW_GROUP,
    payload: { overviewGroupId },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchOverviewGroups() {
  try {
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(true));
    const { data } = yield Saga.call(axios.get, ApiRoutes.OVERVIEW_GROUPS);
    const { overviewGroups } = normalize(data.data, [
      overviewGroupsSchema,
    ]).entities;
    yield Saga.put(
      Redux.entitiesActions.setOverviewGroups(
        overviewGroups as Types.OverviewGroupsEntity
      )
    );
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
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

function* fetchOverviewOverviewGroups(action: OverviewOverviewGroupsAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(true));
    const endpoint = ApiRoutes.OVERVIEW_GROUPS + `/fetch-overview-groups`;
    const { data } = yield Saga.call(
      axios.get,
      endpoint,
      action.payload as any
    );
    const { overviewGroups } = normalize(data.data, [
      overviewGroupsSchema,
    ]).entities;
    yield Saga.put(
      Redux.entitiesActions.addOverviewGroup(
        overviewGroups as Types.OverviewGroupsEntity
      )
    );
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
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

function* bulkFetchOverviewGroups(action: OverviewGroupIdsAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(true));
    const endpoint = ApiRoutes.OVERVIEW_GROUPS + `/bulk-fetch`;
    const { data } = yield Saga.call(
      axios.get,
      endpoint,
      action.payload as any
    );
    const { overviewGroups } = normalize(data.data, [
      overviewGroupsSchema,
    ]).entities;
    yield Saga.put(
      Redux.entitiesActions.addOverviewGroup(
        overviewGroups as Types.OverviewGroupsEntity
      )
    );
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
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

function* fetchOverviewGroup(action: OverviewGroupIdAction) {
  try {
    const { overviewGroupId } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(true));
    const endpoint = ApiRoutes.OVERVIEW_GROUPS + `/${overviewGroupId}`;
    const { data } = yield Saga.call(axios.get, endpoint);
    const { overviewGroup } = normalize(
      data.data,
      overviewGroupSchema
    ).entities;
    yield Saga.put(
      Redux.entitiesActions.addOverviewGroup(
        overviewGroup as Types.OverviewGroupsEntity
      )
    );
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
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

function* createOverviewGroup(action: OverviewGroupCreateAction) {
  try {
    const { createData } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(true));
    const { data } = yield Saga.call(
      axios.post,
      ApiRoutes.OVERVIEW_GROUPS,
      createData
    );
    const normalizedData = normalize(data.data, overviewGroupSchema);
    const { overviewGroup } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.addOverviewGroup(
        overviewGroup as Types.OverviewGroupsEntity
      )
    );
    yield Saga.put(
      Redux.entitiesActions.addRelationalIdsToOverview({
        overviewId: action.payload.createData.overviewId,
        overviewGroupIds: [normalizedData.result],
      })
    );
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
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

function* updateOverviewGroup(action: OverviewGroupUpdateAction) {
  try {
    const { overviewGroupId, updateData } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(true));
    const endpoint = ApiRoutes.OVERVIEW_GROUPS + `/${overviewGroupId}`;
    const { data } = yield Saga.call(axios.patch, endpoint, updateData);
    const { overviewGroup } = normalize(
      data.data,
      overviewGroupSchema
    ).entities;
    yield Saga.put(
      Redux.entitiesActions.addOverviewGroup(
        overviewGroup as Types.OverviewGroupsEntity
      )
    );
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
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

function* deleteOverviewGroup(action: OverviewGroupIdAction) {
  try {
    const { overviewGroupId } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(true));
    const endpoint = ApiRoutes.OVERVIEW_GROUPS + `/${overviewGroupId}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.deleteOverviewGroup(overviewGroupId));
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingOverviewGroups(false));
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

export function* overviewGroupsSaga() {
  yield Saga.all([
    Saga.takeEvery(
      OverviewGroupsActionTypes.FETCH_OVERVIEW_GROUPS,
      fetchOverviewGroups
    ),
    Saga.takeEvery(
      OverviewGroupsActionTypes.FETCH_OVERVIEW_OVERVIEW_GROUPS,
      fetchOverviewOverviewGroups
    ),
    Saga.takeEvery(
      OverviewGroupsActionTypes.BULK_FETCH_OVERVIEW_GROUPS,
      bulkFetchOverviewGroups
    ),
    Saga.takeEvery(
      OverviewGroupsActionTypes.FETCH_OVERVIEW_GROUP,
      fetchOverviewGroup
    ),
    Saga.takeEvery(
      OverviewGroupsActionTypes.CREATE_OVERVIEW_GROUP,
      createOverviewGroup
    ),
    Saga.takeEvery(
      OverviewGroupsActionTypes.UPDATE_OVERVIEW_GROUP,
      updateOverviewGroup
    ),
    Saga.takeEvery(
      OverviewGroupsActionTypes.DELETE_OVERVIEW_GROUP,
      deleteOverviewGroup
    ),
  ]);
}
