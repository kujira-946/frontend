import * as Saga from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";

enum AuthActionTypes {
  REGISTER = "REGISTER",
  VERIFY_REGISTRATION = "VERIFY_REGISTRATION",
  LOGIN = "LOGIN",
  VERIFY_LOGIN = "VERIFY_LOGIN",
  LOGOUT = "LOGOUT",
  REQUEST_NEW_VERIFICATION_CODE = "REQUEST_NEW_VERIFICATION_CODE",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

type RegisterAction = Types.SagaAction<Types.RegistrationData>;
export function registerRequest(data: Types.RegistrationData): RegisterAction {
  return {
    type: AuthActionTypes.REGISTER,
    payload: data,
  };
}

type VerifyRegistrationAction = Types.SagaAction<
  { userId: number } & Types.VerificationData
>;
export function verifyRegistrationRequest(
  userId: number,
  verificationCode: string
): VerifyRegistrationAction {
  return {
    type: AuthActionTypes.VERIFY_REGISTRATION,
    payload: { userId, verificationCode },
  };
}

type LoginAction = Types.SagaAction<Types.LoginData>;
export function loginRequest(data: Types.LoginData): LoginAction {
  return {
    type: AuthActionTypes.LOGIN,
    payload: data,
  };
}

type VerifyLoginAction = Types.SagaAction<
  { userId: number } & Types.VerificationData
>;
export function verifyLoginRequest(
  userId: number,
  verificationCode: string,
  thirtyDays?: boolean
): VerifyLoginAction {
  return {
    type: AuthActionTypes.VERIFY_LOGIN,
    payload: { userId, verificationCode, thirtyDays },
  };
}

type UserIdAction = Types.SagaAction<{ userId: number }>;

export function logoutRequest(userId: number): UserIdAction {
  return {
    type: AuthActionTypes.LOGOUT,
    payload: { userId },
  };
}

export function requestNewVerificationCodeRequest(
  userId: number
): UserIdAction {
  return {
    type: AuthActionTypes.REQUEST_NEW_VERIFICATION_CODE,
    payload: { userId },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* register(action: RegisterAction) {
  try {
    const endpoint = ApiRoutes.AUTH + `/register`;
    const { data } = yield Saga.call(axios.post, endpoint, action.payload);
    yield Saga.put(Redux.uiActions.setTempUserId(data.data));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: data.title,
        body: data.body,
        footnote: data.footnote,
        type: "success",
        timeout: 10000,
      })
    );
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 10000,
      })
    );
  }
}

function* verifyRegistration(action: VerifyRegistrationAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingUsers(true));
    const { userId, verificationCode } = action.payload;
    const endpoint = ApiRoutes.AUTH + `/register/${userId}/verify`;
    const { data } = yield Saga.call(axios.patch, endpoint, {
      verificationCode,
    });
    yield Saga.put(Redux.entitiesActions.addUser(data.data));
    yield Saga.put(Redux.uiActions.resetState());
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Verified!",
        body: data.body,
        type: "success",
        timeout: 5000,
      })
    );
    Cookies.set("id", data.data.id, { secure: true });
    Cookies.set("token", data.accessToken, {
      secure: true,
      expires: 30,
    });
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 10000,
      })
    );
  }
}

function* login(action: LoginAction) {
  try {
    const endpoint = ApiRoutes.AUTH + `/login`;
    const { data } = yield Saga.call(axios.patch, endpoint, action.payload);
    yield Saga.put(Redux.uiActions.setTempUserId(data.data));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Login Successful",
        body: data.body,
        footnote: data.footnote,
        type: "success",
        timeout: 10000,
      })
    );
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 10000,
      })
    );
  }
}

function* verifyLogin(action: VerifyLoginAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingUsers(true));
    const { userId, verificationCode, thirtyDays } = action.payload;
    const endpoint = ApiRoutes.AUTH + `/login/${userId}/verify`;
    const { data } = yield Saga.call(axios.patch, endpoint, {
      verificationCode,
      thirtyDays,
    });
    yield Saga.put(Redux.entitiesActions.addUser(data.data));
    yield Saga.put(Redux.uiActions.resetState());
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Verified!",
        body: data.body,
        type: "success",
        timeout: 5000,
      })
    );
    Cookies.set("id", data.data.id, { secure: true });
    Cookies.set("token", data.accessToken, {
      secure: true,
      expires: thirtyDays ? 30 : 7,
    });
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 10000,
      })
    );
  }
}

function* logout(action: UserIdAction) {
  try {
    const endpoint = ApiRoutes.AUTH + `/logout/${action.payload.userId}`;
    const { data } = yield Saga.call(axios.patch, endpoint);
    Cookies.remove("id");
    Cookies.remove("token");
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Logout Successful",
        body: data.body,
        type: "success",
        timeout: 5000,
      })
    );
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 10000,
      })
    );
  }
}

function* requestNewVerificationCode(action: UserIdAction) {
  try {
    const endpoint =
      ApiRoutes.AUTH +
      `/request-new-verification-code/${action.payload.userId}`;
    const { data } = yield Saga.call(axios.patch, endpoint);
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "New Verification Code Request",
        body: data.body,
        type: "success",
        timeout: 10000,
      })
    );
    Cookies.remove("id");
    Cookies.remove("token");
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 10000,
      })
    );
  }
}

export function* authSaga() {
  yield Saga.all([
    Saga.takeEvery(AuthActionTypes.REGISTER, register),
    Saga.takeEvery(AuthActionTypes.VERIFY_REGISTRATION, verifyRegistration),
    Saga.takeEvery(AuthActionTypes.LOGIN, login),
    Saga.takeEvery(AuthActionTypes.VERIFY_LOGIN, verifyLogin),
    Saga.takeEvery(AuthActionTypes.LOGOUT, logout),
    Saga.takeEvery(
      AuthActionTypes.REQUEST_NEW_VERIFICATION_CODE,
      requestNewVerificationCode
    ),
  ]);
}
