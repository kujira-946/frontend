import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";

enum PurchasesActionTypes {
  FETCH_PURCHASES = "FETCH_PURCHASES",
  FETCH_OVERVIEW_GROUP_PURCHASES = "FETCH_OVERVIEW_GROUP_PURCHASES",
  FETCH_LOGBOOK_ENTRY_PURCHASES = "FETCH_LOGBOOK_ENTRY_PURCHASES",
  BULK_FETCH_PURCHASES = "BULK_FETCH_PURCHASES",
  FETCH_PURCHASE = "FETCH_PURCHASE",
  CREATE_PURCHASE = "CREATE_PURCHASE",
  BULK_CREATE_PURCHASES = "BULK_CREATE_PURCHASES",
  UPDATE_PURCHASE = "UPDATE_PURCHASE",
  DELETE_PURCHASE = "DELETE_PURCHASE",
  BATCH_DELETE_PURCHASES = "BATCH_DELETE_PURCHASES",
  DELETE_ALL_PURCHASES = "DELETE_ALL_PURCHASES",
}

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

export function fetchPurchasesRequest(): Types.NullAction {
  return {
    type: PurchasesActionTypes.FETCH_PURCHASES,
    payload: null,
  };
}

type OverviewGroupPurchasesAction = Types.SagaAction<{
  overviewGroupId: number;
}>;
export function fetchOverviewGroupPurchasesRequest(
  overviewGroupId: number
): OverviewGroupPurchasesAction {
  return {
    type: PurchasesActionTypes.FETCH_OVERVIEW_GROUP_PURCHASES,
    payload: { overviewGroupId },
  };
}

type LogbookEntryPurchasesAction = Types.SagaAction<{ logbookEntryId: number }>;
export function fetchLogbookEntryPurchasesRequest(
  logbookEntryId: number
): LogbookEntryPurchasesAction {
  return {
    type: PurchasesActionTypes.FETCH_LOGBOOK_ENTRY_PURCHASES,
    payload: { logbookEntryId },
  };
}

type PurchaseIdsAction = Types.SagaAction<{ purchaseIds: number[] }>;
export function bulkFetchPurchasesRequest(
  purchaseIds: number[]
): PurchaseIdsAction {
  return {
    type: PurchasesActionTypes.BULK_FETCH_PURCHASES,
    payload: { purchaseIds },
  };
}

type PurchaseIdAction = Types.SagaAction<{ purchaseId: number }>;

export function fetchPurchaseRequest(purchaseId: number): PurchaseIdAction {
  return {
    type: PurchasesActionTypes.FETCH_PURCHASE,
    payload: { purchaseId },
  };
}

type PurchaseCreateAction = Types.SagaAction<{
  data: Types.PurchaseCreateData;
}>;
export function createPurchaseRequest(
  data: Types.PurchaseCreateData
): PurchaseCreateAction {
  return {
    type: PurchasesActionTypes.CREATE_PURCHASE,
    payload: { data },
  };
}

type PurchaseBulkCreateAction = Types.SagaAction<{
  purchasesData: Types.PurchaseCreateData[];
}>;
export function bulkCreatePurchasesRequest(
  purchasesData: Types.PurchaseCreateData[]
): PurchaseBulkCreateAction {
  return {
    type: PurchasesActionTypes.BULK_CREATE_PURCHASES,
    payload: { purchasesData },
  };
}

type PurchaseUpdateAction = Types.SagaAction<{
  purchaseId: number;
  data: Types.PurchaseUpdateData;
}>;
export function updatePurchasesRequest(
  purchaseId: number,
  data: Types.PurchaseUpdateData
): PurchaseUpdateAction {
  return {
    type: PurchasesActionTypes.UPDATE_PURCHASE,
    payload: { purchaseId, data },
  };
}

export function deletePurchaseRequest(purchaseId: number): PurchaseIdAction {
  return {
    type: PurchasesActionTypes.DELETE_PURCHASE,
    payload: { purchaseId },
  };
}

type PurchaseBatchDeleteAction = Types.SagaAction<{ purchaseIds: number[] }>;
export function batchDeletePurchasesRequest(
  purchaseIds: number[]
): PurchaseBatchDeleteAction {
  return {
    type: PurchasesActionTypes.BATCH_DELETE_PURCHASES,
    payload: { purchaseIds },
  };
}

export function deleteAllPurchasesRequest(): Types.NullAction {
  return {
    type: PurchasesActionTypes.DELETE_ALL_PURCHASES,
    payload: null,
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchPurchases() {
  try {
    yield Saga.put(Redux.uiActions.setFetchingPurchases(true));
    const response = yield Saga.call(axios.get, ApiRoutes.PURCHASES);
    yield Saga.put(Redux.entitiesActions.setPurchases(response.data.data));
    yield Saga.put(Redux.uiActions.setFetchingPurchases(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 5000,
      })
    );
  }
}

function* fetchOverviewGroupPurchases() {
  try {
    yield Saga.put(Redux.uiActions.setFetchingPurchases(true));
		const endpoint = ApiRoutes.PURCHASES + ``;
    const response = yield Saga.call(axios.get, endpoint);
    yield Saga.put(Redux.entitiesActions.setPurchases(response.data.data));
    yield Saga.put(Redux.uiActions.setFetchingPurchases(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(
      Redux.uiActions.setNotification({
        title: "Failure",
        body: Functions.sagaResponseError(error),
        type: "failure",
        timeout: 5000,
      })
    );
  }
}
