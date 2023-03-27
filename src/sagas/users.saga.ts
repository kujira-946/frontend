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

const usersSchema = new schema.Entity("users");
const usersListSchema = new schema.Array(usersSchema);
const userSchema = new schema.Entity("user");

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

enum UsersActionTypes {
  FETCH_CURRENT_USER = "FETCH_CURRENT_USER",
  FETCH_USERS = "FETCH_USERS",
  FETCH_USER = "FETCH_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",
}

export function fetchUsersRequest(): Types.NullAction {
  return {
    type: UsersActionTypes.FETCH_USERS,
    payload: null,
  };
}

type UserIdAction = Types.SagaAction<{ userId: number }>;

export function fetchCurrentUserRequest(userId: number): UserIdAction {
  return {
    type: UsersActionTypes.FETCH_CURRENT_USER,
    payload: { userId },
  };
}

export function fetchUserRequest(userId: number): UserIdAction {
  return {
    type: UsersActionTypes.FETCH_USER,
    payload: { userId },
  };
}

type UserUpdateAction = Types.SagaAction<{
  userId: number;
  data: Types.UserUpdateData;
}>;
export function updateUserRequest(
  userId: number,
  data: Types.UserUpdateData
): UserUpdateAction {
  return {
    type: UsersActionTypes.UPDATE_USER,
    payload: { userId, data },
  };
}

export function deleteUserRequest(userId: number): UserIdAction {
  return {
    type: UsersActionTypes.DELETE_USER,
    payload: { userId },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchUsers() {
  try {
    const response = yield Saga.call(axios.get, ApiRoutes.USERS);
    const { users } = normalize(response.data.data, usersListSchema).entities;
    yield Saga.put(Redux.entitiesActions.setUsers(users as Types.UsersEntity));

    // console.log("Fetch Users Response:", response.data);
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

function* fetchCurrentUser(action: UserIdAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingCurrentUser(true));
    const { userId } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${userId}`;
    const response = yield Saga.call(axios.get, endpoint);
    yield Saga.put(Redux.entitiesActions.setCurrentUser(response.data.data));
    yield Saga.put(Redux.uiActions.setLoadingCurrentUser(false));
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

function* fetchUser(action: UserIdAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingUsers(true));
    const { userId } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${userId}`;
    const response = yield Saga.call(axios.get, endpoint);
    const { user } = normalize(response.data.data, userSchema).entities;
    yield Saga.put(Redux.entitiesActions.addUser(user as Types.UsersEntity));
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
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

function* updateUser(action: UserUpdateAction) {
  try {
    const { userId, data } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingUsers(true));
    const endpoint = ApiRoutes.USERS + `/${userId}`;
    const response = yield Saga.call(axios.patch, endpoint, data);
    const { user } = normalize(response.data.data, userSchema).entities;
    yield Saga.put(Redux.entitiesActions.addUser(user as Types.UsersEntity));

    yield Saga.put(Redux.uiActions.setLoadingUsers(false));

    console.log("Update User Response:", response.data);
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
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

function* deleteUser(action: UserIdAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingUsers(true));
    const { userId } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${userId}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.deleteUser(userId));
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
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
    Saga.takeEvery(UsersActionTypes.FETCH_USERS, fetchUsers),
    Saga.takeEvery(UsersActionTypes.FETCH_CURRENT_USER, fetchCurrentUser),
    Saga.takeEvery(UsersActionTypes.FETCH_USER, fetchUser),
    Saga.takeEvery(UsersActionTypes.UPDATE_USER, updateUser),
    Saga.takeEvery(UsersActionTypes.DELETE_USER, deleteUser),
  ]);
}
