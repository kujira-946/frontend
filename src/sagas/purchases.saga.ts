import * as Saga from "redux-saga/effects";
import axios from "axios";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";

// ========================================================================================= //
// [ SCHEMAS ] ============================================================================= //
// ========================================================================================= //

// ========================================================================================= //
// [ ACTIONS ] ============================================================================= //
// ========================================================================================= //

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
export function updatePurchaseRequest(
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
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const response = yield Saga.call(axios.get, ApiRoutes.PURCHASES);
    yield Saga.put(Redux.entitiesActions.setPurchases(response.data.data));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
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

function* fetchOverviewGroupPurchases(action: OverviewGroupPurchasesAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/fetch-overview-group-purchases`;
    const response = yield Saga.call(axios.get, endpoint, action.payload);
    yield Saga.put(Redux.entitiesActions.updatePurchases(response.data.data));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
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

function* fetchLogbookEntryPurchases(action: LogbookEntryPurchasesAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/fetch-logbook-entry-purchases`;
    const response = yield Saga.call(axios.get, endpoint, action.payload);
    yield Saga.put(Redux.entitiesActions.updatePurchases(response.data.data));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
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

function* bulkFetchPurchases(action: PurchaseIdsAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/bulk-fetch`;
    const response = yield Saga.call(axios.get, endpoint, action.payload);
    yield Saga.put(Redux.entitiesActions.updatePurchases(response.data.data));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
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

function* fetchPurchase(action: PurchaseIdAction) {
  try {
    const { purchaseId } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/${purchaseId}`;
    const response = yield Saga.call(axios.get, endpoint);
    yield Saga.put(Redux.entitiesActions.updatePurchases(response.data.data));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
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

function* createPurchase(action: PurchaseCreateAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const response = yield Saga.call(
      axios.post,
      ApiRoutes.PURCHASES,
      action.payload
    );
    yield Saga.put(Redux.entitiesActions.updatePurchases(response.data.data));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
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

function* bulkCreatePurchases(action: PurchaseBulkCreateAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/bulk-create-purchases`;
    const response = yield Saga.call(axios.post, endpoint, action.payload);
    yield Saga.put(Redux.entitiesActions.updatePurchases(response.data.data));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
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

function* updatePurchase(action: PurchaseUpdateAction) {
  try {
    const { purchaseId, data } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/${purchaseId}`;
    const response = yield Saga.call(axios.patch, endpoint, data);
    yield Saga.put(Redux.entitiesActions.updatePurchases(response.data.data));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
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

function* deletePurchase(action: PurchaseIdAction) {
  try {
    const { purchaseId } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/${purchaseId}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
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

function* batchDeletePurchases(action: PurchaseBatchDeleteAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/batch-delete`;
    const response = yield Saga.call(axios.post, endpoint, action.payload);
    yield Saga.put(Redux.entitiesActions.setPurchases(response.data.data));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
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

function* deleteAllPurchases() {
  try {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/delete-all`;
    const response = yield Saga.call(axios.post, endpoint);
    yield Saga.put(Redux.entitiesActions.setPurchases(response.data.data));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    console.log(error);
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
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

export function* purchasesSaga() {
  yield Saga.all([
    Saga.takeEvery(PurchasesActionTypes.FETCH_PURCHASES, fetchPurchases),
    Saga.takeEvery(
      PurchasesActionTypes.FETCH_OVERVIEW_GROUP_PURCHASES,
      fetchOverviewGroupPurchases
    ),
    Saga.takeEvery(
      PurchasesActionTypes.FETCH_LOGBOOK_ENTRY_PURCHASES,
      fetchLogbookEntryPurchases
    ),
    Saga.takeEvery(
      PurchasesActionTypes.BULK_FETCH_PURCHASES,
      bulkFetchPurchases
    ),
    Saga.takeEvery(PurchasesActionTypes.FETCH_PURCHASE, fetchPurchase),
    Saga.takeEvery(PurchasesActionTypes.CREATE_PURCHASE, createPurchase),
    Saga.takeEvery(
      PurchasesActionTypes.BULK_CREATE_PURCHASES,
      bulkCreatePurchases
    ),
    Saga.takeEvery(PurchasesActionTypes.UPDATE_PURCHASE, updatePurchase),
    Saga.takeEvery(PurchasesActionTypes.DELETE_PURCHASE, deletePurchase),
    Saga.takeEvery(
      PurchasesActionTypes.BATCH_DELETE_PURCHASES,
      batchDeletePurchases
    ),
    Saga.takeEvery(
      PurchasesActionTypes.DELETE_ALL_PURCHASES,
      deleteAllPurchases
    ),
  ]);
}
