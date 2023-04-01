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
const userSchema = new schema.Entity("user");

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

enum UsersActionTypes {
  FETCH_CURRENT_USER = "FETCH_CURRENT_USER",
  UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER",
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
  FETCH_USERS = "FETCH_USERS",
  FETCH_USER = "FETCH_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",
}

type UserIdAction = Types.SagaAction<{ userId: number }>;

export function fetchCurrentUserRequest(userId: number): UserIdAction {
  return {
    type: UsersActionTypes.FETCH_CURRENT_USER,
    payload: { userId },
  };
}

export function updateCurrentUserRequest(
  userId: number,
  updateData: Types.UserUpdateData
): UserUpdateAction {
  return {
    type: UsersActionTypes.UPDATE_CURRENT_USER,
    payload: { userId, updateData },
  };
}

export function deleteAccountRequest(userId: number): UserIdAction {
  return {
    type: UsersActionTypes.DELETE_ACCOUNT,
    payload: { userId },
  };
}

export function fetchUsersRequest(): Types.NullAction {
  return {
    type: UsersActionTypes.FETCH_USERS,
    payload: null,
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
  updateData: Types.UserUpdateData;
  
}>;
export function updateUserRequest(
  userId: number,
  updateData: Types.UserUpdateData
): UserUpdateAction {
  return {
    type: UsersActionTypes.UPDATE_USER,
    payload: { userId, updateData },
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

function* fetchCurrentUser(action: UserIdAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingCurrentUser(true));
    const { userId } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${userId}`;
    const { data } = yield Saga.call(axios.get, endpoint);
    yield Saga.put(Redux.entitiesActions.setCurrentUser(data.data));
    yield Saga.put(Redux.uiActions.setLoadingCurrentUser(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingCurrentUser(false));
    Functions.sagaError(error);
  }
}

function* updateCurrentUser(action: UserUpdateAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingCurrentUser(true));
    const { userId, updateData } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${userId}`;
    const { data } = yield Saga.call(axios.patch, endpoint, updateData);
    yield Saga.put(Redux.entitiesActions.updateCurrentUser(data.data));
    yield Saga.put(Redux.uiActions.setLoadingCurrentUser(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingCurrentUser(false));
    Functions.sagaError(error);
  }
}

function* deleteAccount(action: UserIdAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingCurrentUser(true));
    const { userId } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${userId}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.setCurrentUser(null));
    yield Saga.put(Redux.uiActions.setLoadingCurrentUser(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingCurrentUser(false));
    Functions.sagaError(error);
  }
}

function* fetchUsers() {
  try {
    yield Saga.put(Redux.uiActions.setLoadingUsers(true));
    const { data } = yield Saga.call(axios.get, ApiRoutes.USERS);
    const normalizedData = normalize(data.data, [usersSchema]);
    const { users } = normalizedData.entities;
    yield Saga.put(Redux.entitiesActions.setUsers(users as Types.UsersEntity));
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
    Functions.sagaError(error);
  }
}

function* fetchUser(action: UserIdAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingUsers(true));
    const { userId } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${userId}`;
    const { data } = yield Saga.call(axios.get, endpoint);
    const normalizedData = normalize(data.data, userSchema);
    const { user } = normalizedData.entities;
    yield Saga.put(Redux.entitiesActions.addUser(user as Types.UsersEntity));
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
    Functions.sagaError(error);
  }
}

function* updateUser(action: UserUpdateAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingUsers(true));
    const { userId, updateData } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${userId}`;
    const { data } = yield Saga.call(axios.patch, endpoint, updateData);
    const normalizedData = normalize(data.data, userSchema);
    const { user } = normalizedData.entities;
    yield Saga.put(Redux.entitiesActions.addUser(user as Types.UsersEntity));
    yield Saga.put(
      Redux.entitiesActions.updateUser({ userId, user: data.data })
    );
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
    Functions.sagaError(error);
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
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
    Functions.sagaError(error);
  }
}

export function* usersSaga() {
  yield Saga.all([
    Saga.takeEvery(UsersActionTypes.FETCH_USERS, fetchUsers),
    Saga.takeEvery(UsersActionTypes.FETCH_CURRENT_USER, fetchCurrentUser),
    Saga.takeEvery(UsersActionTypes.UPDATE_CURRENT_USER, updateCurrentUser),
    Saga.takeEvery(UsersActionTypes.DELETE_ACCOUNT, deleteAccount),
    Saga.takeEvery(UsersActionTypes.FETCH_USER, fetchUser),
    Saga.takeEvery(UsersActionTypes.UPDATE_USER, updateUser),
    Saga.takeEvery(UsersActionTypes.DELETE_USER, deleteUser),
  ]);
}
