import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { GlobalState } from "@/store";
import { productionRoot, RouteBases } from "@/utils/constants.api";
import { initialAuthErrorsState } from "@/utils/constants.auth";

enum AuthActionTypes {
  CHECK_EMAIL_AVAILABILITY = "CHECK_EMAIL_AVAILABILITY",
  CHECK_USERNAME_AVAILABILITY = "CHECK_USERNAME_AVAILABILITY",
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

type CheckEmailAction = Types.SagaAction<{ email: string }>;
export function checkEmailAvailabilityRequest(email: string): CheckEmailAction {
  return {
    type: AuthActionTypes.CHECK_EMAIL_AVAILABILITY,
    payload: { email },
  };
}

type CheckUsernameAction = Types.SagaAction<{ username: string }>;
export function checkUsernameAvailabilityRequest(
  username: string
): CheckUsernameAction {
  return {
    type: AuthActionTypes.CHECK_USERNAME_AVAILABILITY,
    payload: { username },
  };
}

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
export function loginRequest(email: string, password: string): LoginAction {
  return {
    type: AuthActionTypes.LOGIN,
    payload: { email, password },
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

function* checkEmailAvailability(action: CheckEmailAction) {
  try {
    const endpoint = rootEndpoint + "/register/check-email-availability";
    const response = yield Saga.call(axios.get, endpoint, action.payload);
    yield Saga.put(Redux.errorsActions.setAuth(initialAuthErrorsState));

    console.log("Check Email Availability Response:", response);
  } catch (error: any) {
    console.log(error);
    const authErrors = yield Saga.select(
      (state: GlobalState) => state.errors.auth
    );
    yield Saga.put(
      Redux.errorsActions.setAuth({
        ...authErrors,
        emailCheck: Functions.sagaResponseError(error),
      })
    );
  }
}

function* checkUsernameAvailability(action: CheckUsernameAction) {
  try {
    const endpoint = rootEndpoint + "/register/check-username-availability";
    const response = yield Saga.call(axios.get, endpoint, action.payload);
    yield Saga.put(Redux.errorsActions.setAuth(initialAuthErrorsState));

    console.log("Check Username Availability Response:", response);
  } catch (error: any) {
    console.log(error);
    const authErrors = yield Saga.select(
      (state: GlobalState) => state.errors.auth
    );
    yield Saga.put(
      Redux.errorsActions.setAuth({
        ...authErrors,
        usernameCheck: Functions.sagaResponseError(error),
      })
    );
  }
}

function* register(action: RegisterAction) {
  try {
    yield Saga.put(Redux.uiActions.setVerificationCodeLoading(true));
    const endpoint = rootEndpoint + "/register";
    const response = yield Saga.call(axios.post, endpoint, action.payload);
    yield Saga.put(Redux.uiActions.setVerificationCodeLoading(false));
    yield Saga.put(Redux.errorsActions.setAuth(initialAuthErrorsState));

    console.log("Register Response:", response);
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.errorsActions.setAuth("Failed to register new user."));
  }
}

function* verifyRegistration(action: VerifyRegistrationAction) {
  try {
    const { id, verificationCode } = action.payload;
    const endpoint = rootEndpoint + `/register/${id}/verify`;
    const response = yield Saga.call(axios.patch, endpoint, {
      verificationCode,
    });
    yield Saga.put(Redux.errorsActions.setAuth(initialAuthErrorsState));

    console.log("Verify Registration Response:", response);
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.errorsActions.setAuth({ general: "Failed to verify registration." })
    );
  }
}

function* login(action: LoginAction) {
  try {
    yield Saga.put(Redux.uiActions.setVerificationCodeLoading(true));
    const endpoint = rootEndpoint + "/login";
    const response = yield Saga.call(axios.patch, endpoint, action.payload);
    yield Saga.put(Redux.uiActions.setVerificationCodeLoading(false));
    yield Saga.put(Redux.errorsActions.setAuth(initialAuthErrorsState));

    console.log("Login Response:", response);
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.errorsActions.setAuth({ general: "Failed to login." })
    );
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
    yield Saga.put(Redux.errorsActions.setAuth(initialAuthErrorsState));

    console.log("Verify Login Response:", response);
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.errorsActions.setAuth({ general: "Failed to verify login." })
    );
  }
}

function* logout(action: Types.IdAction) {
  try {
    const endpoint = rootEndpoint + `/logout/${action.payload.id}`;
    const response = yield Saga.call(axios.patch, endpoint);
    yield Saga.put(Redux.errorsActions.setAuth(initialAuthErrorsState));

    console.log("Logout Response:", response);
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.errorsActions.setAuth({ general: "Failed to log out." })
    );
  }
}

function* requestNewVerificationCode(action: Types.IdAction) {
  try {
    yield Saga.put(Redux.uiActions.setVerificationCodeLoading(true));
    const endpoint =
      rootEndpoint + `/request-new-verification-code/${action.payload.id}`;
    const response = yield Saga.call(axios.patch, endpoint);
    yield Saga.put(Redux.uiActions.setVerificationCodeLoading(false));
    yield Saga.put(Redux.errorsActions.setAuth(initialAuthErrorsState));

    console.log("Request New Verification Code Response:", response);
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.errorsActions.setAuth({
        general: "Failed to request new verification code.",
      })
    );
  }
}

export function* authSaga() {
  yield Saga.all([
    Saga.takeEvery(
      AuthActionTypes.CHECK_EMAIL_AVAILABILITY,
      checkEmailAvailability
    ),
    Saga.takeEvery(
      AuthActionTypes.CHECK_USERNAME_AVAILABILITY,
      checkUsernameAvailability
    ),
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
