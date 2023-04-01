import * as Saga from "redux-saga/effects";
import axios from "axios";
import { normalize, schema } from "normalizr";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";

// ========================================================================================= //
// [ SCHEMAS ] ============================================================================= //
// ========================================================================================= //

const purchasesSchema = new schema.Entity("purchases");
const purchaseSchema = new schema.Entity("purchase");

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
  createData: Types.PurchaseCreateData;
}>;
export function createPurchaseRequest(
  createData: Types.PurchaseCreateData
): PurchaseCreateAction {
  return {
    type: PurchasesActionTypes.CREATE_PURCHASE,
    payload: { createData },
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
  updateData: Types.PurchaseUpdateData;
}>;
export function updatePurchaseRequest(
  purchaseId: number,
  updateData: Types.PurchaseUpdateData
): PurchaseUpdateAction {
  return {
    type: PurchasesActionTypes.UPDATE_PURCHASE,
    payload: { purchaseId, updateData },
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
    const { data } = yield Saga.call(axios.get, ApiRoutes.PURCHASES);
    const { purchases } = normalize(data.data, [purchasesSchema]).entities;
    yield Saga.put(
      Redux.entitiesActions.setPurchases(purchases as Types.PurchasesEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    Functions.sagaError(error);
  }
}

function* fetchOverviewGroupPurchases(action: OverviewGroupPurchasesAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/fetch-overview-group-purchases`;
    const { data } = yield Saga.call(
      axios.get,
      endpoint,
      action.payload as any
    );
    const { purchases } = normalize(data.data, [purchasesSchema]).entities;
    yield Saga.put(
      Redux.entitiesActions.addPurchase(purchases as Types.PurchasesEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    Functions.sagaError(error);
  }
}

function* fetchLogbookEntryPurchases(action: LogbookEntryPurchasesAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/fetch-logbook-entry-purchases`;
    const { data } = yield Saga.call(
      axios.get,
      endpoint,
      action.payload as any
    );
    const { purchases } = normalize(data.data, [purchasesSchema]).entities;
    yield Saga.put(
      Redux.entitiesActions.addPurchase(purchases as Types.PurchasesEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    Functions.sagaError(error);
  }
}

function* bulkFetchPurchases(action: PurchaseIdsAction) {
  try {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/bulk-fetch`;
    const { data } = yield Saga.call(
      axios.get,
      endpoint,
      action.payload as any
    );
    const { purchases } = normalize(data.data, [purchasesSchema]).entities;
    yield Saga.put(
      Redux.entitiesActions.addPurchase(purchases as Types.PurchasesEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    Functions.sagaError(error);
  }
}

function* fetchPurchase(action: PurchaseIdAction) {
  try {
    const { purchaseId } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/${purchaseId}`;
    const { data } = yield Saga.call(axios.get, endpoint);
    const { purchase } = normalize(data.data, purchaseSchema).entities;
    yield Saga.put(
      Redux.entitiesActions.addPurchase(purchase as Types.PurchasesEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    Functions.sagaError(error);
  }
}

function* createPurchase(action: PurchaseCreateAction) {
  try {
    const { createData } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const { data } = yield Saga.call(
      axios.post,
      ApiRoutes.PURCHASES,
      createData
    );
    const normalizedData = normalize(data.data, purchaseSchema);
    const { purchase } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.addPurchase(purchase as Types.PurchasesEntity)
    );
    if (createData.overviewGroupId) {
      yield Saga.put(
        Redux.entitiesActions.addRelationalIdsToOverviewGroup({
          overviewGroupId: createData.overviewGroupId,
          purchaseIds: [normalizedData.result],
        })
      );
    } else if (createData.logbookEntryId) {
      yield Saga.put(
        Redux.entitiesActions.addRelationalIdsToLogbookEntry({
          logbookEntryId: createData.logbookEntryId,
          purchaseIds: [normalizedData.result],
        })
      );
    }
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    Functions.sagaError(error);
  }
}

function* bulkCreatePurchases(action: PurchaseBulkCreateAction) {
  try {
    const { purchasesData } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/bulk-create-purchases`;
    const { data } = yield Saga.call(axios.post, endpoint, { purchasesData });
    const normalizedData = normalize(data.data, [purchasesSchema]);
    const { purchases } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.addPurchase(purchases as Types.PurchasesEntity)
    );
    if (purchasesData[0].overviewGroupId) {
      yield Saga.put(
        Redux.entitiesActions.addRelationalIdsToOverviewGroup({
          overviewGroupId: purchasesData[0].overviewGroupId,
          purchaseIds: normalizedData.result,
        })
      );
    } else if (purchasesData[0].logbookEntryId) {
      yield Saga.put(
        Redux.entitiesActions.addRelationalIdsToLogbookEntry({
          logbookEntryId: purchasesData[0].logbookEntryId,
          purchaseIds: normalizedData.result,
        })
      );
    }
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    Functions.sagaError(error);
  }
}

function* updatePurchase(action: PurchaseUpdateAction) {
  try {
    const { purchaseId, updateData } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/${purchaseId}`;
    const { data } = yield Saga.call(axios.patch, endpoint, updateData);
    const { purchase } = normalize(data.data, purchaseSchema).entities;
    yield Saga.put(
      Redux.entitiesActions.addPurchase(purchase as Types.PurchasesEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    Functions.sagaError(error);
  }
}

function* deletePurchase(action: PurchaseIdAction) {
  try {
    const { purchaseId } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/${purchaseId}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.deletePurchase(purchaseId));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    Functions.sagaError(error);
  }
}

function* batchDeletePurchases(action: PurchaseBatchDeleteAction) {
  try {
    const { purchaseIds } = action.payload;
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/batch-delete`;
    yield Saga.call(axios.post, endpoint, { purchaseIds });
    yield Saga.put(Redux.entitiesActions.batchDeletePurchases(purchaseIds));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    Functions.sagaError(error);
  }
}

function* deleteAllPurchases() {
  try {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(true));
    const endpoint = ApiRoutes.PURCHASES + `/delete-all`;
    yield Saga.call(axios.post, endpoint);
    yield Saga.put(Redux.entitiesActions.setPurchases(null));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    Functions.sagaError(error);
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
