import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Redux from "@/redux";
import { GlobalState } from "@/store";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { productionRoot, RouteBases } from "@/utils/constants.api";

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
  { id: number } & Types.VerificationData
>;
export function verifyRegistrationRequest(
  id: number,
  verificationCode: string
): VerifyRegistrationAction {
  return {
    type: AuthActionTypes.VERIFY_REGISTRATION,
    payload: { id, verificationCode },
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
  { id: number } & Types.VerificationData
>;
export function verifyLoginRequest(
  id: number,
  verificationCode: string,
  thirtyDays?: boolean
): VerifyLoginAction {
  return {
    type: AuthActionTypes.VERIFY_LOGIN,
    payload: { id, verificationCode, thirtyDays },
  };
}

export function logoutRequest(id: number): Types.IdAction {
  return {
    type: AuthActionTypes.LOGOUT,
    payload: { id },
  };
}

export function requestNewVerificationCodeRequest(id: number): Types.IdAction {
  return {
    type: AuthActionTypes.REQUEST_NEW_VERIFICATION_CODE,
    payload: { id },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

const rootEndpoint = productionRoot + RouteBases.AUTH;

function* register(action: RegisterAction) {
  try {
    const endpoint = rootEndpoint + "/register";
    const { data } = yield Saga.call(axios.post, endpoint, action.payload);
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: data.title,
        body: data.body,
        footnote: data.footnote,
        type: "success",
        timeout: 10000,
      })
    );
    yield Saga.put(
      Redux.uiActions.setVerificationCodeSentAndTempUserId([true, data.data])
    );
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.errorsActions.setAuth(Functions.sagaResponseError(error))
    );
  }
}

function* verifyRegistration(action: VerifyRegistrationAction) {
  try {
    const { id, verificationCode } = action.payload;
    const endpoint = rootEndpoint + `/register/${id}/verify`;
    const { data } = yield Saga.call(axios.patch, endpoint, {
      verificationCode,
    });
    yield Saga.put(Redux.entitiesActions.setUser(data.data));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Verified!",
        body: data.body,
        type: "success",
        timeout: 5000,
      })
    );
    yield Saga.put(
      Redux.uiActions.setVerificationCodeSentAndTempUserId([false, null])
    );
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.errorsActions.setAuth(Functions.sagaResponseError(error))
    );
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
    const endpoint = rootEndpoint + "/login";
    const { data } = yield Saga.call(axios.patch, endpoint, action.payload);
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Login Successful",
        body: data.body,
        footnote: data.footnote,
        type: "success",
        timeout: 10000,
      })
    );
    yield Saga.put(
      Redux.uiActions.setVerificationCodeSentAndTempUserId([true, data.data])
    );
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.errorsActions.setAuth(Functions.sagaResponseError(error))
    );
  }
}

function* verifyLogin(action: VerifyLoginAction) {
  try {
    const { id, verificationCode, thirtyDays } = action.payload;
    const endpoint = rootEndpoint + `/login/${id}/verify`;
    const { data } = yield Saga.call(axios.patch, endpoint, {
      verificationCode,
      thirtyDays,
    });
    yield Saga.put(Redux.entitiesActions.setUser(data.data));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Verified!",
        body: data.body,
        type: "success",
        timeout: 5000,
      })
    );
    yield Saga.put(
      Redux.uiActions.setVerificationCodeSentAndTempUserId([false, null])
    );
    localStorage.setItem("accessToken:", data.accessToken);
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.errorsActions.setAuth(Functions.sagaResponseError(error))
    );
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

function* logout(action: Types.IdAction) {
  try {
    const endpoint = rootEndpoint + `/logout/${action.payload.id}`;
    const { data } = yield Saga.call(axios.patch, endpoint);

    console.log("Logout Response:", data);
  } catch (error) {
    console.log(error);
  }
}

function* requestNewVerificationCode(action: Types.IdAction) {
  try {
    const endpoint =
      rootEndpoint + `/request-new-verification-code/${action.payload.id}`;
    const { data } = yield Saga.call(axios.patch, endpoint);
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "New Verification Code Request",
        body: data.body,
        type: "success",
        timeout: 10000,
      })
    );

    console.log("Request New Verification Code Response:", data);
  } catch (error) {
    console.log(error);
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
