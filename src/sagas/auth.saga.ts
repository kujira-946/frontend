import * as Saga from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
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

type VerifyRegistrationAction = Types.SagaAction<Types.VerificationData>;
export function verifyRegistrationRequest(
  email: string,
  verificationCode: string
): VerifyRegistrationAction {
  return {
    type: AuthActionTypes.VERIFY_REGISTRATION,
    payload: { email, verificationCode },
  };
}

type LoginAction = Types.SagaAction<Types.LoginData>;
export function loginRequest(data: Types.LoginData): LoginAction {
  return {
    type: AuthActionTypes.LOGIN,
    payload: data,
  };
}

type VerifyLoginAction = Types.SagaAction<Types.VerificationData>;
export function verifyLoginRequest(
  email: string,
  verificationCode: string,
  thirtyDays?: boolean
): VerifyLoginAction {
  return {
    type: AuthActionTypes.VERIFY_LOGIN,
    payload: { email, verificationCode, thirtyDays },
  };
}

type UserIdAction = Types.SagaAction<{ userId: number }>;
export function logoutRequest(userId: number): UserIdAction {
  return {
    type: AuthActionTypes.LOGOUT,
    payload: { userId },
  };
}

type NewVerificationAction = Types.SagaAction<{ email: string }>;
export function requestNewVerificationCodeRequest(
  email: string
): NewVerificationAction {
  return {
    type: AuthActionTypes.REQUEST_NEW_VERIFICATION_CODE,
    payload: { email },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* register(action: RegisterAction) {
  try {
    const endpoint = ApiRoutes.AUTH + `/register`;
    const { data } = yield Saga.call(axios.post, endpoint, action.payload);
    yield Saga.put(Redux.uiActions.setVerificationCodeSent(true));
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
    yield Functions.sagaError(error);
  }
}

function* verifyRegistration(action: VerifyRegistrationAction) {
  try {
    const { email, verificationCode } = action.payload;
    const endpoint = ApiRoutes.AUTH + `/register/verify`;
    const { data } = yield Saga.call(axios.patch, endpoint, {
      email,
      verificationCode,
    });
    Cookies.set("id", data.data.id, { secure: true });
    Cookies.set("token", data.accessToken, {
      secure: true,
      expires: 30,
    });
    axios.defaults.headers.common["Authorization"] = data.accessToken;
    yield Saga.put(Redux.entitiesActions.setCurrentUser(data.data));
    // yield Saga.put(Redux.entitiesActions.addUser(data.data));
    yield Saga.put(Redux.uiActions.setVerificationCodeSent(false));
    yield Saga.put(Redux.uiActions.setLoginForThirtyDays(false));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Verified!",
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

function* login(action: LoginAction) {
  try {
    const endpoint = ApiRoutes.AUTH + `/login`;
    const { data } = yield Saga.call(axios.patch, endpoint, action.payload);
    yield Saga.put(Redux.uiActions.setVerificationCodeSent(true));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Login Successful",
        body: data.body,
        footnote: data.footnote,
        type: "success",
        timeout: 10000,
      })
    );
  } catch (error: any) {
    yield Functions.sagaError(error);
  }
}

function* verifyLogin(action: VerifyLoginAction) {
  try {
    const { email, verificationCode, thirtyDays } = action.payload;
    const endpoint = ApiRoutes.AUTH + `/login/verify`;
    const { data } = yield Saga.call(axios.patch, endpoint, {
      email,
      verificationCode,
      thirtyDays,
    });
    Cookies.set("id", data.data.id, { secure: true });
    Cookies.set("token", data.accessToken, {
      secure: true,
      expires: thirtyDays ? 30 : 7,
    });
    axios.defaults.headers.common["Authorization"] = data.accessToken;
    yield Saga.put(Redux.entitiesActions.setCurrentUser(data.data));
    // yield Saga.put(Redux.entitiesActions.addUser(data.data));
    yield Saga.put(Redux.uiActions.setVerificationCodeSent(false));
    yield Saga.put(Redux.uiActions.setLoginForThirtyDays(false));
    // yield Saga.put(
    //   Redux.uiActions.setNotification({
    //     title: "Verified!",
    //     body: data.body,
    //     type: "success",
    //     timeout: 5000,
    //   })
    // );
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
    yield Functions.sagaError(error);
  }
}

function* logout(action: UserIdAction) {
  try {
    const { userId } = action.payload;
    const endpoint = ApiRoutes.AUTH + `/logout/${userId}`;
    const { data } = yield Saga.call(axios.patch, endpoint);
    Cookies.remove("id");
    Cookies.remove("token");
    yield Saga.put(Redux.entitiesActions.setCurrentUser(null));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Logout Successful",
        body: data.body,
        type: "success",
        timeout: 5000,
      })
    );
  } catch (error) {
    yield Functions.sagaError(error);
  }
}

function* requestNewVerificationCode(action: NewVerificationAction) {
  try {
    const { email } = action.payload;
    const endpoint = ApiRoutes.AUTH + `/request-new-verification-code`;
    const { data } = yield Saga.call(axios.patch, endpoint, { email });
    Cookies.remove("id");
    Cookies.remove("token");
    yield Saga.put(Redux.uiActions.setVerificationCodeSent(true));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "New Verification Code Request",
        body: data.body,
        type: "success",
        timeout: 10000,
      })
    );
  } catch (error) {
    yield Functions.sagaError(error);
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
