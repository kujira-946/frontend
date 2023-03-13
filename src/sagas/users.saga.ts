import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Redux from "@/redux";
import * as Types from "@/utils/types";
import { RouteBases } from "@/utils/constants.api";

enum UserActionTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USER = "FETCH_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export function fetchUsersRequest(): Types.SagaAction<any> {
  return {
    type: UserActionTypes.FETCH_USERS,
    payload: null,
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchUsers() {
  try {
    const endpoint = RouteBases.USERS;
    const response = yield Saga.call(axios.get, endpoint);

    console.log("Fetch Users Response:", response);
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.errorsActions.setUser("User error"));
  }
}

export function* usersSaga() {
  yield Saga.all([Saga.takeEvery(UserActionTypes.FETCH_USERS, fetchUsers)]);
}
