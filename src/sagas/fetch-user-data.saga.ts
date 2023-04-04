import * as Saga from "redux-saga/effects";
import axios from "axios";
import { normalize, schema } from "normalizr";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";
import { fetchUserOverviewsRequest } from "./overviews.saga";
import { fetchUserLogbooksRequest } from "./logbooks.saga";
import { GlobalState } from "@/store";
import { bulkFetchOverviewGroupsRequest } from "./overview-groups.saga";

// ========================================================================================= //
// [ SCHEMAS ] ============================================================================= //
// ========================================================================================= //

const overviewsSchema = new schema.Entity("overviews");
const overviewSchema = new schema.Entity("overview");

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

enum FetchUserDataTypes {
  FETCH_USER_DATA = "FETCH_USER_DATA",
}

type FetchUserDataAction = Types.SagaAction<{ userId: number }>;

export function fetchUserDataRequest(userId: number): FetchUserDataAction {
  return {
    type: FetchUserDataTypes.FETCH_USER_DATA,
    payload: { userId },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchUserData(action: FetchUserDataAction) {
  try {
    // yield Saga.put(Redux.uiActions.setLoadingUsers(true));
    const { userId } = action.payload;

    // console.log("Fetching User Overviews");
    // yield Saga.put(fetchUserOverviewsRequest(userId));

    // console.log("Fetching Overview Groups");
    // const { overviews } = yield Saga.select(
    //   (state: GlobalState) => state.entities
    // );

    // console.log("Fetch User Overviews:", overviews);
    // const overviewIds = Object.keys(overviews).map((id: string) => Number(id));

    // console.log("Fetch User Overview Ids:", overviewIds);
    // yield Saga.put(bulkFetchOverviewGroupsRequest(overviewIds));

    // console.log("Fetching User Logbooks");
    // yield Saga.put(fetchUserLogbooksRequest(userId));
    // yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    yield Functions.sagaError(error);
  }
}

export function* fetchUserDataSaga() {
  yield Saga.all([
    Saga.takeEvery(FetchUserDataTypes.FETCH_USER_DATA, fetchUserData),
  ]);
}
