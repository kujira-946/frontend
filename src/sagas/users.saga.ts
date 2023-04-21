import * as Saga from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";
import { normalize, schema } from "normalizr";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";
import { logoutRequest } from "./auth.saga";

// ========================================================================================= //
// [ SCHEMAS ] ============================================================================= //
// ========================================================================================= //

const usersSchema = new schema.Entity("users");
const userSchema = new schema.Entity("user");

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

enum UsersActionTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USER = "FETCH_USER",
  UPDATE_USER = "UPDATE_USER",
  UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD",
  DELETE_USER = "DELETE_USER",
}

export function fetchUsersRequest(): Types.NullAction {
  return {
    type: UsersActionTypes.FETCH_USERS,
    payload: null,
  };
}

type UserIdAction = Types.SagaAction<{
  userId: number;
  forCurrentUser: boolean;
}>;

export function fetchUserRequest(
  userId: number,
  forCurrentUser: boolean = true
): UserIdAction {
  return {
    type: UsersActionTypes.FETCH_USER,
    payload: { userId, forCurrentUser },
  };
}

type UserUpdateAction = Types.SagaAction<{
  userId: number;
  updateData: Types.UserUpdateData;
  forCurrentUser: boolean;
}>;
export function updateUserRequest(
  userId: number,
  updateData: Types.UserUpdateData,
  forCurrentUser: boolean = true
): UserUpdateAction {
  return {
    type: UsersActionTypes.UPDATE_USER,
    payload: { userId, updateData, forCurrentUser },
  };
}

type PasswordUpdateData = {
  oldPassword: string;
  newPassword: string;
};
type UserUpdatePasswordAction = Types.SagaAction<{
  userId: number;
  updateData: PasswordUpdateData;
}>;
export function updateUserPasswordRequest(
  userId: number,
  updateData: PasswordUpdateData
): UserUpdatePasswordAction {
  return {
    type: UsersActionTypes.UPDATE_USER_PASSWORD,
    payload: { userId, updateData },
  };
}

export function deleteUserRequest(
  userId: number,
  forCurrentUser: boolean = true
): UserIdAction {
  return {
    type: UsersActionTypes.DELETE_USER,
    payload: { userId, forCurrentUser },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchUsers() {
  try {
    const { data } = yield Saga.call(axios.get, ApiRoutes.USERS);
    const normalizedData = normalize(data.data, [usersSchema]);
    const { users } = normalizedData.entities;
    yield Saga.put(Redux.entitiesActions.setUsers(users as Types.UsersEntity));
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
    yield Functions.sagaError(error);
  }
}

function* fetchUser(action: UserIdAction) {
  try {
    const { userId, forCurrentUser } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${userId}`;
    const { data } = yield Saga.call(axios.get, endpoint);
    // const normalizedData = normalize(data.data, userSchema);
    // const { user } = normalizedData.entities;
    // yield Saga.put(Redux.entitiesActions.addUser(user as Types.UsersEntity));
    if (forCurrentUser) {
      yield Saga.put(
        Redux.entitiesActions.setCurrentUser({
          ...data.data,
          logbookIds: [],
        })
      );
    }
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
    const { forCurrentUser } = action.payload;
    if (forCurrentUser) {
      Cookies.remove("id");
      Cookies.remove("token");
    }
    yield Functions.sagaError(error);
  }
}

function* updateUser(action: UserUpdateAction) {
  try {
    const { userId, updateData, forCurrentUser } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${userId}`;
    const { data } = yield Saga.call(axios.patch, endpoint, updateData);
    const normalizedData = normalize(data.data, userSchema);
    const { user } = normalizedData.entities;
    if (forCurrentUser) {
      yield Saga.put(Redux.entitiesActions.updateCurrentUser(data.data));
    }
    yield Saga.put(
      Redux.entitiesActions.updateUser({ userId, user: data.data })
    );
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
    yield Functions.sagaError(error);
  }
}

function* updateUserPassword(action: UserUpdatePasswordAction) {
  try {
    const { userId, updateData } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${userId}/update-password`;
    const { data } = yield Saga.call(axios.patch, endpoint, updateData);
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Success",
        body: data.body,
        type: "success",
        timeout: 5000,
      })
    );
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
    yield Functions.sagaError(error);
  }
}

function* deleteUser(action: UserIdAction) {
  try {
    const { userId, forCurrentUser } = action.payload;
    const endpoint = ApiRoutes.USERS + `/${userId}`;
    yield Saga.call(axios.delete, endpoint);

    if (forCurrentUser) {
      Cookies.remove("id");
      Cookies.remove("token");
      yield Saga.put(Redux.entitiesActions.setCurrentUser(null));
      yield Saga.put(
        Redux.uiActions.setNotification({
          title: "Account Deletion Successful",
          body: "I'm sad to see you go, but I hope you enjoyed your time here! Just know that you're always welcome back :)",
          type: "success",
          timeout: 10000,
        })
      );
    }
    yield Saga.put(Redux.entitiesActions.deleteUser(userId));
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
    yield Functions.sagaError(error);
  }
}

export function* usersSaga() {
  yield Saga.all([
    Saga.takeEvery(UsersActionTypes.FETCH_USERS, fetchUsers),
    Saga.takeEvery(UsersActionTypes.FETCH_USER, fetchUser),
    Saga.takeEvery(UsersActionTypes.UPDATE_USER, updateUser),
    Saga.takeEvery(UsersActionTypes.UPDATE_USER_PASSWORD, updateUserPassword),
    Saga.takeEvery(UsersActionTypes.DELETE_USER, deleteUser),
  ]);
}
