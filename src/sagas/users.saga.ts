import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/constants.routes";

enum UserActionTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USER = "FETCH_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export function fetchUsersRequest(): Types.NullAction {
  return {
    type: UserActionTypes.FETCH_USERS,
    payload: null,
  };
}

export function fetchUserRequest(id: number): Types.IdAction {
  return {
    type: UserActionTypes.FETCH_USER,
    payload: { id },
  };
}

export function updateUserRequest(id: number): Types.IdAction {
  return {
    type: UserActionTypes.UPDATE_USER,
    payload: { id },
  };
}

export function deleteUserRequest(id: number): Types.IdAction {
  return {
    type: UserActionTypes.DELETE_USER,
    payload: { id },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchUsers() {
  try {
    const { data } = yield Saga.call(axios.get, ApiRoutes.USERS);
    yield Saga.put(Redux.entitiesActions.setUser(data.data));

    // console.log("Fetch Users Response:", response.data);
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        // body: "Failed to fetch users.",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 5000,
      })
    );
  }
}

function* fetchUser(action: Types.IdAction) {
  try {
    yield Saga.put(Redux.uiActions.setUserLoading(true));
    const { id } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${id}`;
    const response = yield Saga.call(axios.get, endpoint);
    // yield Saga.put(Redux.entitiesActions.setUser(response.data));
    yield Saga.put(Redux.uiActions.setUserLoading(false));

    console.log("Fetch User Response:", response.data);
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        // body: "Failed to fetch users.",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 5000,
      })
    );
  }
}

function* updateUser(action: Types.IdAction) {
  try {
    yield Saga.put(Redux.uiActions.setUserLoading(true));
    const { id } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${id}`;
    const response = yield Saga.call(axios.patch, endpoint);
    // yield Saga.put(Redux.entitiesActions.setUser(response.data));
    yield Saga.put(Redux.uiActions.setUserLoading(false));

    console.log("Update User Response:", response.data);
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

function* deleteUser(action: Types.IdAction) {
  try {
    yield Saga.put(Redux.uiActions.setUserLoading(true));
    const { id } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${id}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.setUser(null));
    yield Saga.put(Redux.uiActions.setUserLoading(false));
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

export function* usersSaga() {
  yield Saga.all([
    Saga.takeEvery(UserActionTypes.FETCH_USERS, fetchUsers),
    Saga.takeEvery(UserActionTypes.FETCH_USER, fetchUser),
    Saga.takeEvery(UserActionTypes.UPDATE_USER, updateUser),
    Saga.takeEvery(UserActionTypes.DELETE_USER, deleteUser),
  ]);
}
