import * as Saga from "redux-saga/effects";
import axios from "axios";
import { normalize, schema } from "normalizr";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";
import { createOverviewRequest } from "./overviews.saga";
import { createOverviewGroupRequest } from "./overview-groups.saga";
import { bulkCreatePurchasesRequest } from "./purchases.saga";
import { GlobalState } from "@/store";
import { Signal } from "@preact/signals-react";
import { updateUserRequest } from "./users.saga";

// ========================================================================================= //
// [ SCHEMAS ] ============================================================================= //
// ========================================================================================= //

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

enum OnboardingActionTypes {
  ONBOARD_NEW_USER = "ONBOARD_NEW_USER",
}

type OverviewCreateData = { income: number; savings: number };
type OverviewGroupCreateData = {
  name: "Recurring" | "Incoming";
  totalCost: number;
};

type OnboardingAction = Types.SagaAction<{
  overviewCreateData: OverviewCreateData;
  recurringOverviewGroupCreateData: OverviewGroupCreateData;
  recurringPurchasesCreateData: Signal<Types.OnboardingPurchase[]>;
  incomingOverviewGroupCreateData: OverviewGroupCreateData;
  incomingPurchasesCreateData: Signal<Types.OnboardingPurchase[]>;
}>;

export function onboardNewUserRequest(
  overviewCreateData: OverviewCreateData,
  recurringOverviewGroupCreateData: OverviewGroupCreateData,
  recurringPurchasesCreateData: Signal<Types.OnboardingPurchase[]>,
  incomingOverviewGroupCreateData: OverviewGroupCreateData,
  incomingPurchasesCreateData: Signal<Types.OnboardingPurchase[]>
): OnboardingAction {
  return {
    type: OnboardingActionTypes.ONBOARD_NEW_USER,
    payload: {
      overviewCreateData,
      recurringOverviewGroupCreateData,
      recurringPurchasesCreateData,
      incomingOverviewGroupCreateData,
      incomingPurchasesCreateData,
    },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* onboardNewUser(action: OnboardingAction) {
  try {
    const {
      overviewCreateData,
      recurringOverviewGroupCreateData,
      recurringPurchasesCreateData,
      incomingOverviewGroupCreateData,
      incomingPurchasesCreateData,
    } = action.payload;

    const entities: Redux.EntitiesState = yield Saga.select(
      (state: GlobalState) => state.entities
    );
    const { currentUser, overviews, overviewGroups, purchases } = entities;

    if (currentUser) {
      yield Saga.put(
        createOverviewRequest({
          ...overviewCreateData,
          ownerId: currentUser.id,
        })
      );

      if (overviews) {
        const overview = Object.values(overviews)[0];
        yield Saga.put(
          createOverviewGroupRequest({
            ...recurringOverviewGroupCreateData,
            overviewId: overview.id,
          })
        );
      }

      if (overviewGroups) {
        const recurringOverviewGroup = Object.values(overviewGroups)[0];
        const recurringPurchasesData: Types.PurchaseCreateData[] = [];
        recurringPurchasesCreateData.value.forEach(
          (purchase: Types.OnboardingPurchase, index: number) => {
            if (purchase.description) {
              const recurringPurchaseData: Types.PurchaseCreateData = {
                placement: index + 1,
                description: purchase.description,
                cost: Number(purchase.cost),
                overviewGroupId: recurringOverviewGroup.id,
              };
              recurringPurchasesData.push(recurringPurchaseData);
            }
          }
        );
        if (recurringPurchasesData.length > 0) {
          yield Saga.put(
            bulkCreatePurchasesRequest(recurringPurchasesData, {
              type: "overview group",
              relationalId: recurringOverviewGroup.id,
            })
          );
        }
      }

      if (overviews) {
        const overview = Object.values(overviews)[0];
        yield Saga.put(
          createOverviewGroupRequest({
            ...incomingOverviewGroupCreateData,
            overviewId: overview.id,
          })
        );
      }

      if (overviewGroups) {
        const incomingOverviewGroup = Object.values(overviewGroups)[1];
        const incomingPurchasesData: Types.PurchaseCreateData[] = [];
        incomingPurchasesCreateData.value.forEach(
          (purchase: Types.OnboardingPurchase, index: number) => {
            if (purchase.description) {
              const incomingPurchaseData: Types.PurchaseCreateData = {
                placement: index + 1,
                description: purchase.description,
                cost: Number(purchase.cost),
                overviewGroupId: incomingOverviewGroup.id,
              };
              incomingPurchasesData.push(incomingPurchaseData);
            }
          }
        );
        if (incomingPurchasesData.length > 0) {
          yield Saga.put(
            bulkCreatePurchasesRequest(incomingPurchasesData, {
              type: "overview group",
              relationalId: incomingOverviewGroup.id,
            })
          );
        }
      }

      yield Saga.put(updateUserRequest(currentUser.id, { onboarded: true }));
    }
  } catch (error) {
    yield Functions.sagaError(error);
  }
}

export function* onboardingSaga() {
  yield Saga.all([
    Saga.takeEvery(OnboardingActionTypes.ONBOARD_NEW_USER, onboardNewUser),
  ]);
}
