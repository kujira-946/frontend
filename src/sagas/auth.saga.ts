import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Redux from "@/redux";
import { GlobalState } from "@/store";
import * as Constants from "@/utils/constants.globals";
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

type VerifyRegistrationAction = Types.SagaAction<Types.VerificationData>;
export function verifyRegistrationRequest(
  verificationCode: string
): VerifyRegistrationAction {
  return {
    type: AuthActionTypes.VERIFY_REGISTRATION,
    payload: { verificationCode },
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
  thirtyDays: boolean
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
        title: response.data.title,
        body: response.data.body,
        footnote: response.data.footnote,
        type: "success",
        timeout: 5000,
      })
    );
    yield Saga.put(Redux.uiActions.setRegister([true, response.data.data]));

    // console.log("Register Response:", response);
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.errorsActions.setAuth(Functions.sagaResponseError(error))
    );
  }
}

function* verifyRegistration(action: VerifyRegistrationAction) {
  try {
    const { verificationCode } = action.payload;
    const id = Saga.select((state: GlobalState) => state.ui.tempUserId);
    const endpoint = rootEndpoint + `/register/${id}/verify`;
    const response = yield Saga.call(axios.patch, endpoint, {
      verificationCode,
    });
    yield Saga.put(Redux.uiActions.setRegister([false, null]));

    console.log("Verify Registration Response:", response);
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.errorsActions.setAuth(Functions.sagaResponseError(error))
    );
  }
}

function* login(action: LoginAction) {
  try {
    const endpoint = rootEndpoint + "/login";
    const response = yield Saga.call(axios.patch, endpoint, action.payload);

    console.log("Login Response:", response);
  } catch (error) {
    console.log(error);
  }
}

function* verifyLogin(action: VerifyLoginAction) {
  try {
    const { id, verificationCode, thirtyDays } = action.payload;
    const endpoint = rootEndpoint + `/login/${id}/verify`;
    const response = yield Saga.call(axios.patch, endpoint, {
      verificationCode,
      thirtyDays,
    });

    console.log("Verify Login Response:", response);
  } catch (error) {
    console.log(error);
  }
}

function* logout(action: Types.IdAction) {
  try {
    const endpoint = rootEndpoint + `/logout/${action.payload.id}`;
    const response = yield Saga.call(axios.patch, endpoint);

    console.log("Logout Response:", response);
  } catch (error) {
    console.log(error);
  }
}

function* requestNewVerificationCode(action: Types.IdAction) {
  try {
    const endpoint =
      rootEndpoint + `/request-new-verification-code/${action.payload.id}`;
    const response = yield Saga.call(axios.patch, endpoint);

    console.log("Request New Verification Code Response:", response);
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
