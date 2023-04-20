import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

enum OverviewsActionTypes {
  FETCH_USER_OVERVIEW = "FETCH_USER_OVERVIEW",
  CREATE_OVERVIEW = "CREATE_OVERVIEW",
  UPDATE_OVERVIEW = "UPDATE_OVERVIEW",
}

type UserOverviewAction = Types.SagaAction<{
  ownerId: number;
}>;
export function fetchUserOverviewRequest(ownerId: number): UserOverviewAction {
  return {
    type: OverviewsActionTypes.FETCH_USER_OVERVIEW,
    payload: { ownerId },
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

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchUserOverview(action: UserOverviewAction) {
  try {
    const { ownerId } = action.payload;
    const endpoint = ApiRoutes.OVERVIEWS + `/fetch-user-overview`;
    const { data } = yield Saga.call(axios.post, endpoint, { ownerId });
    yield Saga.put(
      Redux.entitiesActions.setOverview({
        ...data.data,
        overviewGroupIds: [],
      })
    );
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
    yield Functions.sagaError(error);
  }
}

function* createOverview(action: OverviewCreateAction) {
  const { createData } = action.payload;
  const { data } = yield Saga.call(axios.post, ApiRoutes.OVERVIEWS, createData);
  yield Saga.put(
    Redux.entitiesActions.setOverview({
      ...data.data,
      overviewGroupIds: [],
    })
  );
  yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
  try {
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
    yield Functions.sagaError(error);
  }
}

function* updateOverview(action: OverviewUpdateAction) {
  try {
    const { overviewId, updateData } = action.payload;
    const endpoint = ApiRoutes.OVERVIEWS + `/${overviewId}`;
    const { data } = yield Saga.call(axios.patch, endpoint, updateData);
    yield Saga.put(Redux.entitiesActions.updateOverview(data.data));
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingOverviews(false));
    yield Functions.sagaError(error);
  }
}

export function* overviewsSaga() {
  yield Saga.all([
    Saga.takeEvery(OverviewsActionTypes.FETCH_USER_OVERVIEW, fetchUserOverview),
    Saga.takeEvery(OverviewsActionTypes.CREATE_OVERVIEW, createOverview),
    Saga.takeEvery(OverviewsActionTypes.UPDATE_OVERVIEW, updateOverview),
  ]);
}
