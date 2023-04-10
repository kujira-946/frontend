import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes, ClientRoutes } from "@/utils/constants/routes";

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

enum OnboardingActionTypes {
  ONBOARD_NEW_USER = "ONBOARD_NEW_USER",
}

type OnboardNewUserActions = Types.SagaAction<{
  createData: Types.OnboardingCreateData;
}>;

export function onboardNewUserRequest(
  createData: Types.OnboardingCreateData
): OnboardNewUserActions {
  return {
    type: OnboardingActionTypes.ONBOARD_NEW_USER,
    payload: { createData },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* onboardNewUser(action: OnboardNewUserActions) {
  try {
    const { createData } = action.payload;
    const { data } = yield Saga.call(
      axios.post,
      ApiRoutes.ONBOARDING,
      createData
    );
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: data.title,
        body: data.body,
        type: "success",
        timeout: 5000,
        redirect: ClientRoutes.LOGBOOKS,
      })
    );
    yield Saga.put(Redux.uiActions.setLoadingOnboarding(false));
  } catch (error) {
    yield Functions.sagaError(error);
  }
}

export function* onboardingSaga() {
  yield Saga.all([
    Saga.takeEvery(OnboardingActionTypes.ONBOARD_NEW_USER, onboardNewUser),
  ]);
}
