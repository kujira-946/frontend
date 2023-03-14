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

export function fetchUsersRequest(): Types.SagaAction<null> {
  return {
    type: UserActionTypes.FETCH_USERS,
    payload: null,
  };
}

type IdAction = Types.SagaAction<{ userId: number }>;

export function fetchUserRequest(userId: number): IdAction {
  return {
    type: UserActionTypes.FETCH_USER,
    payload: { userId },
  };
}

export function updateUserRequest(userId: number): IdAction {
  return {
    type: UserActionTypes.UPDATE_USER,
    payload: { userId },
  };
}

export function deleteUserRequest(userId: number): IdAction {
  return {
    type: UserActionTypes.DELETE_USER,
    payload: { userId },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchUsers() {
  try {
    const endpoint = productionRoot + RouteBases.USERS;
    const response = yield Saga.call(axios.get, endpoint);
    yield Saga.put(Redux.entitiesActions.setUser(response.data));

    // console.log("Fetch Users Response:", response.data);
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.errorsActions.setUsers("Failed to fetch users."));
  }
}

function* fetchUser(action: IdAction) {
  try {
    yield Saga.put(Redux.uiActions.setUserLoading(true));
    const { userId } = action.payload;
    const endpoint = productionRoot + RouteBases.USERS + `/${userId}`;
    const response = yield Saga.call(axios.get, endpoint);
    // yield Saga.put(Redux.entitiesActions.setUser(response.data));
    yield Saga.put(Redux.uiActions.setUserLoading(false));

    console.log("Fetch User Response:", response.data);
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.errorsActions.setUsers("Failed to fetch user."));
  }
}

function* updateUser(action: IdAction) {
  try {
    yield Saga.put(Redux.uiActions.setUserLoading(true));
    const { userId } = action.payload;
    const endpoint = productionRoot + RouteBases.USERS + `/${userId}`;
    const response = yield Saga.call(axios.patch, endpoint);
    // yield Saga.put(Redux.entitiesActions.setUser(response.data));
    yield Saga.put(Redux.uiActions.setUserLoading(false));

    console.log("Update User Response:", response.data);
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.errorsActions.setUsers("Failed to update user."));
  }
}

function* deleteUser(action: IdAction) {
  try {
    yield Saga.put(Redux.uiActions.setUserLoading(true));
    const { userId } = action.payload;
    const endpoint = productionRoot + RouteBases.USERS + `/${userId}`;
    Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.setUser(null));
    yield Saga.put(Redux.uiActions.setUserLoading(false));
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
