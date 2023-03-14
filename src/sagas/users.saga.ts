import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Redux from "@/redux";
import * as Types from "@/utils/types";
import { productionRoot, RouteBases } from "@/utils/constants.api";

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

const rootEndpoint = productionRoot + RouteBases.USERS;

function* fetchUsers() {
  try {
    const endpoint = rootEndpoint;
    const response = yield Saga.call(axios.get, endpoint);
    yield Saga.put(Redux.entitiesActions.setUser(response.data));
    yield Saga.put(Redux.errorsActions.setUsers(""));

    // console.log("Fetch Users Response:", response.data);
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.errorsActions.setUsers("Failed to fetch users."));
  }
}

function* fetchUser(action: Types.IdAction) {
  try {
    yield Saga.put(Redux.uiActions.setUserLoading(true));
    const { id } = action.payload;
    const endpoint = rootEndpoint + `/${id}`;
    const response = yield Saga.call(axios.get, endpoint);
    // yield Saga.put(Redux.entitiesActions.setUser(response.data));
    yield Saga.put(Redux.uiActions.setUserLoading(false));
    yield Saga.put(Redux.errorsActions.setUsers(""));

    console.log("Fetch User Response:", response.data);
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.errorsActions.setUsers("Failed to fetch user."));
  }
}

function* updateUser(action: Types.IdAction) {
  try {
    yield Saga.put(Redux.uiActions.setUserLoading(true));
    const { id } = action.payload;
    const endpoint = rootEndpoint + `/${id}`;
    const response = yield Saga.call(axios.patch, endpoint);
    // yield Saga.put(Redux.entitiesActions.setUser(response.data));
    yield Saga.put(Redux.uiActions.setUserLoading(false));
    yield Saga.put(Redux.errorsActions.setUsers(""));

    console.log("Update User Response:", response.data);
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.errorsActions.setUsers("Failed to update user."));
  }
}

function* deleteUser(action: Types.IdAction) {
  try {
    yield Saga.put(Redux.uiActions.setUserLoading(true));
    const { id } = action.payload;
    const endpoint = rootEndpoint + `/${id}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.setUser(null));
    yield Saga.put(Redux.uiActions.setUserLoading(false));
    yield Saga.put(Redux.errorsActions.setUsers(""));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.errorsActions.setUsers("Failed to delete user."));
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
