import * as Saga from "redux-saga/effects";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ClientRoutes } from "@/utils/constants/routes";
import { updateUserRequest } from "./users.saga";
import { updateOverviewRequest } from "./overviews.saga";
import { createLogbookRequest } from "./logbooks.saga";

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

enum OnboardingActionTypes {
  ONBOARD_NEW_USER = "ONBOARD_NEW_USER",
}

type OnboardNewUserActions = Types.SagaAction<{
  overviewId: number;
  income: number;
  savings: number;
  currentUserId: number;
}>;

export function onboardNewUserRequest(
  overviewId: number,
  income: number,
  savings: number,
  currentUserId: number
): OnboardNewUserActions {
  return {
    type: OnboardingActionTypes.ONBOARD_NEW_USER,
    payload: { overviewId, income, savings, currentUserId },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* onboardNewUser(action: OnboardNewUserActions) {
  try {
    const { overviewId, income, savings, currentUserId } = action.payload;
    yield Saga.put(
      updateOverviewRequest(overviewId, {
        income,
        savings,
      })
    );
    yield Saga.put(
      createLogbookRequest({
        name: Functions.generateFormattedDate(new Date()),
        ownerId: currentUserId,
      })
    );
    yield Saga.put(updateUserRequest(currentUserId, { onboarded: true }));
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Onboarding Complete!",
        body: "Thank you and congrats! You're now ready to start using Kujira.",
        type: "success",
        timeout: 5000,
        redirect: ClientRoutes.LOGBOOKS,
      })
    );
    yield Saga.put(Redux.uiActions.setLoadingUsers(false));
  } catch (error) {
    yield Functions.sagaError(error);
  }
}

export function* onboardingSaga() {
  yield Saga.all([
    Saga.takeEvery(OnboardingActionTypes.ONBOARD_NEW_USER, onboardNewUser),
  ]);
}
