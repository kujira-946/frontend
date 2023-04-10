import * as Saga from "redux-saga/effects";
import axios from "axios";
import { normalize, schema } from "normalizr";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";
import { updateOverviewGroupRequest } from "./overview-groups.saga";
import { GlobalState } from "@/store";

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
  DELETE_ASSOCIATED_PURCHASES = "DELETE_ASSOCIATED_PURCHASES",
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

type PurchaseBulkCreationActionRelation = {
  type: "overview group" | "logbook entry";
  relationalId: number;
};
type PurchaseBulkCreateAction = Types.SagaAction<{
  purchasesData: Types.PurchaseCreateData[];
  relation?: PurchaseBulkCreationActionRelation;
}>;
export function bulkCreatePurchasesRequest(
  purchasesData: Types.PurchaseCreateData[],
  relation?: PurchaseBulkCreationActionRelation
): PurchaseBulkCreateAction {
  return {
    type: PurchasesActionTypes.BULK_CREATE_PURCHASES,
    payload: { purchasesData, relation },
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

type AssociationIds = {
  overviewGroupId?: number;
  logbookEntryId?: number;
};

type DeleteAction = Types.SagaAction<{
  deleteData: {
    purchaseId: number;
  } & AssociationIds;
}>;
export function deletePurchaseRequest(deleteData: {
  purchaseId: number;
  overviewGroupId?: number;
  logbookEntryId?: number;
}): DeleteAction {
  return {
    type: PurchasesActionTypes.DELETE_PURCHASE,
    payload: { deleteData },
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

type DeleteAllAction = Types.SagaAction<{ deleteData: AssociationIds }>;
export function deleteAssociatedPurchasesRequest(deleteData: {
  overviewGroupId?: number;
  logbookEntryId?: number;
}): DeleteAllAction {
  return {
    type: PurchasesActionTypes.DELETE_ASSOCIATED_PURCHASES,
    payload: { deleteData },
  };
}

// ========================================================================================= //
// [ SAGAS ] =============================================================================== //
// ========================================================================================= //

function* fetchPurchases() {
  try {
    const { data } = yield Saga.call(axios.get, ApiRoutes.PURCHASES);
    const normalizedData = normalize(data.data, [purchasesSchema]);
    const { purchases } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.setPurchases(purchases as Types.PurchasesEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
  }
}

function* fetchOverviewGroupPurchases(action: OverviewGroupPurchasesAction) {
  try {
    const { overviewGroupId } = action.payload;
    const endpoint = ApiRoutes.PURCHASES + `/fetch-overview-group-purchases`;
    const { data } = yield Saga.call(axios.post, endpoint, { overviewGroupId });
    const normalizedData = normalize(data.data, [purchasesSchema]);
    const purchaseIds = normalizedData.result;
    const { purchases } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.addPurchase(purchases as Types.PurchasesEntity)
    );
    yield Saga.put(
      Redux.entitiesActions.updateOverviewGroupRelations({
        overviewGroupId,
        purchaseIds:
          purchaseIds.length > 0
            ? purchaseIds
            : purchaseIds.length === 1
            ? [purchaseIds]
            : [],
      })
    );
  } catch (error) {
    yield Functions.sagaError(error);
  }
}

function* fetchLogbookEntryPurchases(action: LogbookEntryPurchasesAction) {
  try {
    const { logbookEntryId } = action.payload;
    const endpoint = ApiRoutes.PURCHASES + `/fetch-logbook-entry-purchases`;
    const { data } = yield Saga.call(axios.post, endpoint, { logbookEntryId });
    const normalizedData = normalize(data.data, [purchasesSchema]);
    const { purchases } = normalizedData.entities;
    const purchaseIds = normalizedData.result;
    yield Saga.put(
      Redux.entitiesActions.addPurchase(purchases as Types.PurchasesEntity)
    );
    yield Saga.put(
      Redux.entitiesActions.updateLogbookEntryRelations({
        logbookEntryId,
        purchaseIds:
          purchaseIds.length > 0
            ? purchaseIds
            : purchaseIds.length === 1
            ? [purchaseIds]
            : [],
      })
    );
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
  }
}

function* bulkFetchPurchases(action: PurchaseIdsAction) {
  try {
    const { purchaseIds } = action.payload;
    const endpoint = ApiRoutes.PURCHASES + `/bulk-fetch`;
    const { data } = yield Saga.call(axios.post, endpoint, { purchaseIds });
    const normalizedData = normalize(data.data, [purchasesSchema]);
    const { purchases } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.addPurchase(purchases as Types.PurchasesEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
  }
}

function* fetchPurchase(action: PurchaseIdAction) {
  try {
    const { purchaseId } = action.payload;
    const endpoint = ApiRoutes.PURCHASES + `/${purchaseId}`;
    const { data } = yield Saga.call(axios.get, endpoint);
    const normalizedData = normalize(data.data, purchaseSchema);
    const { purchase } = normalizedData.entities;
    yield Saga.put(
      Redux.entitiesActions.addPurchase(purchase as Types.PurchasesEntity)
    );
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
  }
}

function* createPurchase(action: PurchaseCreateAction) {
  try {
    const { createData } = action.payload;
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
        Redux.entitiesActions.updateOverviewGroupRelations({
          overviewGroupId: createData.overviewGroupId,
          purchaseIds: [normalizedData.result],
        })
      );
    } else if (createData.logbookEntryId) {
      yield Saga.put(
        Redux.entitiesActions.updateLogbookEntryRelations({
          logbookEntryId: createData.logbookEntryId,
          purchaseIds: [normalizedData.result],
        })
      );
    }
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
  }
}

function* bulkCreatePurchases(action: PurchaseBulkCreateAction) {
  try {
    const { purchasesData, relation } = action.payload;
    const endpoint = ApiRoutes.PURCHASES + `/bulk-create-purchases`;
    const { data } = yield Saga.call(axios.post, endpoint, { purchasesData });
    const normalizedData = normalize(data.data, [purchasesSchema]);
    const { purchases } = normalizedData.entities;
    const purchaseIds = normalizedData.result;
    yield Saga.put(
      Redux.entitiesActions.addPurchase(purchases as Types.PurchasesEntity)
    );
    if (relation) {
      if (relation.type === "overview group") {
        yield Saga.put(
          Redux.entitiesActions.updateOverviewGroupRelations({
            overviewGroupId: relation.relationalId,
            purchaseIds:
              purchaseIds.length > 0
                ? purchaseIds
                : purchaseIds.length === 1
                ? [purchaseIds]
                : [],
          })
        );
      } else {
        yield Saga.put(
          Redux.entitiesActions.updateLogbookEntryRelations({
            logbookEntryId: relation.relationalId,
            purchaseIds:
              purchaseIds.length > 0
                ? purchaseIds
                : purchaseIds.length === 1
                ? [purchaseIds]
                : [],
          })
        );
      }
    }
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
  }
}

function* updatePurchase(action: PurchaseUpdateAction) {
  try {
    const { purchaseId, updateData } = action.payload;
    const endpoint = ApiRoutes.PURCHASES + `/${purchaseId}`;
    const { data } = yield Saga.call(axios.patch, endpoint, updateData);
    yield Saga.put(
      Redux.entitiesActions.updatePurchase({ purchaseId, purchase: data.data })
    );
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
  }
}

function* deletePurchase(action: DeleteAction) {
  try {
    const { deleteData } = action.payload;
    const endpoint = ApiRoutes.PURCHASES + `/${deleteData.purchaseId}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.deletePurchase(deleteData.purchaseId));
    if (deleteData.overviewGroupId) {
      yield Saga.put();
    } else if (deleteData.logbookEntryId) {
    }
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
  }
}

function* batchDeletePurchases(action: PurchaseBatchDeleteAction) {
  try {
    const { purchaseIds } = action.payload;
    const endpoint = ApiRoutes.PURCHASES + `/batch-delete`;
    yield Saga.call(axios.post, endpoint, { purchaseIds });
    yield Saga.put(Redux.entitiesActions.batchDeletePurchases(purchaseIds));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
  }
}

function* deleteAssociatedPurchases(action: DeleteAllAction) {
  try {
    const { deleteData } = action.payload;
    const endpoint = ApiRoutes.PURCHASES + `/delete-associated-purchases`;
    yield Saga.call(axios.post, endpoint, deleteData);
    // yield Saga.put(Redux.entitiesActions.setPurchases(null));
    yield Saga.put(Redux.entitiesActions.deleteAssociatedPurchases(deleteData));
    if (deleteData.overviewGroupId) {
      yield Saga.put(
        updateOverviewGroupRequest(deleteData.overviewGroupId, { totalCost: 0 })
      );
    } else if (deleteData.logbookEntryId) {
    }
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
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
      PurchasesActionTypes.DELETE_ASSOCIATED_PURCHASES,
      deleteAssociatedPurchases
    ),
  ]);
}
