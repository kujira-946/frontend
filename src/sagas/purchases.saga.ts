import * as Saga from "redux-saga/effects";
import axios from "axios";
import { normalize, schema } from "normalizr";

import * as Redux from "@/redux";
import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";
import { ApiRoutes } from "@/utils/constants/routes";
import { updateOverviewGroupRequest } from "./overview-groups.saga";
import { updateLogbookEntryRequest } from "./logbook-entries.saga";
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
  FETCH_LOGBOOK_ENTRY_PURCHASES_BY_CATEGORY = "FETCH_LOGBOOK_ENTRY_PURCHASES_BY_CATEGORY",
  BULK_FETCH_PURCHASES = "BULK_FETCH_PURCHASES",
  FETCH_PURCHASE = "FETCH_PURCHASE",
  CREATE_PURCHASE = "CREATE_PURCHASE",
  BULK_CREATE_PURCHASES = "BULK_CREATE_PURCHASES",
  UPDATE_PURCHASE = "UPDATE_PURCHASE",
  UPDATE_PURCHASE_PLACEMENT = "UPDATE_PURCHASE_PLACEMENT",
  DELETE_PURCHASE = "DELETE_PURCHASE",
  BULK_DELETE_PURCHASES = "BULK_DELETE_PURCHASES",
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

type LogbookEntryPurchasesByCategoryAction = Types.SagaAction<{
  logbookEntryIds: number[];
}>;
export function fetchLogbookEntryPurchasesByCategoryRequest(
  logbookEntryIds: number[]
): LogbookEntryPurchasesByCategoryAction {
  return {
    type: PurchasesActionTypes.FETCH_LOGBOOK_ENTRY_PURCHASES_BY_CATEGORY,
    payload: { logbookEntryIds },
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

type AssociationPayload = {
  overviewGroup?: { id: number; totalSpent: number };
  logbookEntry?: { id: number; totalSpent: number };
};

type PurchaseUpdateAction = Types.SagaAction<{
  purchaseId: number;
  updateData: Types.PurchaseUpdateData;
  association?: AssociationPayload;
}>;
export function updatePurchaseRequest(
  purchaseId: number,
  updateData: Types.PurchaseUpdateData,
  association?: AssociationPayload
): PurchaseUpdateAction {
  return {
    type: PurchasesActionTypes.UPDATE_PURCHASE,
    payload: { purchaseId, updateData, association },
  };
}

export type Association = "Overview Group" | "Logbook Entry";
type PurchasePlacementUpdateAction = Types.SagaAction<{
  purchaseId: number;
  association: Association;
  previousPlacement: number;
  updatedPlacement: number;
}>;
export function updatePurchasePlacementRequest(
  purchaseId: number,
  association: Association,
  previousPlacement: number,
  updatedPlacement: number
): PurchasePlacementUpdateAction {
  return {
    type: PurchasesActionTypes.UPDATE_PURCHASE_PLACEMENT,
    payload: { purchaseId, association, previousPlacement, updatedPlacement },
  };
}

type PurchaseDeleteAction = Types.SagaAction<{
  purchaseId: number;
  association?: AssociationPayload;
}>;
export function deletePurchaseRequest(
  purchaseId: number,
  association?: AssociationPayload
): PurchaseDeleteAction {
  return {
    type: PurchasesActionTypes.DELETE_PURCHASE,
    payload: { purchaseId, association },
  };
}

type PurchaseBulkDeleteAction = Types.SagaAction<{
  purchaseIds: number[];
  association?: Association;
  associationId?: number;
}>;
export function bulkDeletePurchasesRequest(
  purchaseIds: number[],
  association?: Association,
  associationId?: number
): PurchaseBulkDeleteAction {
  return {
    type: PurchasesActionTypes.BULK_DELETE_PURCHASES,
    payload: { purchaseIds, association, associationId },
  };
}

type PurchaseAssociationDeleteAction = Types.SagaAction<{
  purchaseIds: number[];
  association: { overviewGroupId?: number; logbookEntryId?: number };
}>;
export function deleteAssociatedPurchasesRequest(
  purchaseIds: number[],
  association: {
    overviewGroupId?: number;
    logbookEntryId?: number;
  }
): PurchaseAssociationDeleteAction {
  return {
    type: PurchasesActionTypes.DELETE_ASSOCIATED_PURCHASES,
    payload: { purchaseIds, association },
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

function* fetchLogbookEntryPurchasesByCategory(
  action: LogbookEntryPurchasesByCategoryAction
) {
  try {
    const { logbookEntryIds } = action.payload;
    const endpoint =
      ApiRoutes.PURCHASES + `/fetch-logbook-entry-purchases-by-category`;
    const { data } = yield Saga.call(axios.post, endpoint, { logbookEntryIds });
    const { needPurchases, plannedPurchases, impulsePurchases } = data.data;

    yield Saga.put(Redux.uiActions.setReviewsNeedPurchases(needPurchases));
    yield Saga.put(
      Redux.uiActions.setReviewsPlannedPurchases(plannedPurchases)
    );
    yield Saga.put(
      Redux.uiActions.setReviewsImpulsePurchases(impulsePurchases)
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
    const { purchaseId, updateData, association } = action.payload;
    const endpoint = ApiRoutes.PURCHASES + `/${purchaseId}`;
    const { data } = yield Saga.call(axios.patch, endpoint, updateData);
    yield Saga.put(
      Redux.entitiesActions.updatePurchase({ purchaseId, purchase: data.data })
    );
    if (association?.overviewGroup) {
      const { id, totalSpent } = association.overviewGroup;
      yield Saga.put(updateOverviewGroupRequest(id, { totalSpent }));
    } else if (association?.logbookEntry) {
      const { id, totalSpent } = association.logbookEntry;
      yield Saga.put(updateLogbookEntryRequest(id, { totalSpent }));
    }
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
  }
}

function* updatePurchasePlacement(action: PurchasePlacementUpdateAction) {
  try {
    const { purchaseId, association, previousPlacement, updatedPlacement } =
      action.payload;
    const endpoint =
      ApiRoutes.PURCHASES + `/${purchaseId}/update-purchase-placement`;
    const { data } = yield Saga.call(axios.patch, endpoint, {
      association,
      previousPlacement,
      updatedPlacement,
    });

    const logbookEntry: Types.LogbookEntry | null = yield Saga.select(
      (state: GlobalState) => {
        if (data.data.overviewGroupId) {
          return Functions.getOverviewGroup(state, data.data.overviewGroupId);
        } else if (data.data.logbookEntryId) {
          return Functions.getLogbookEntry(state, data.data.logbookEntryId);
        } else {
          return null;
        }
      }
    );

    if (logbookEntry && logbookEntry.purchaseIds) {
      const previousIndex = previousPlacement - 1;
      const updatedIndex = updatedPlacement - 1;

      const updatedPurchaseIds = Functions.deepCopy(logbookEntry.purchaseIds);
      const draggedPurchaseId = updatedPurchaseIds.splice(previousIndex, 1);
      updatedPurchaseIds.splice(updatedIndex, 0, draggedPurchaseId[0]);

      yield Saga.put(
        Redux.entitiesActions.updateLogbookEntryRelations({
          logbookEntryId: logbookEntry.id,
          purchaseIds: updatedPurchaseIds,
          resetRelations: true,
        })
      );
    }

    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
  }
}

function* deletePurchase(action: PurchaseDeleteAction) {
  try {
    const { purchaseId, association } = action.payload;
    const endpoint = ApiRoutes.PURCHASES + `/${purchaseId}`;
    yield Saga.call(axios.delete, endpoint);
    yield Saga.put(Redux.entitiesActions.deletePurchase(purchaseId));
    if (association?.overviewGroup) {
      const { id, totalSpent } = association.overviewGroup;
      yield Saga.put(updateOverviewGroupRequest(id, { totalSpent }));
    } else if (association?.logbookEntry) {
      const { id, totalSpent } = association.logbookEntry;
      yield Saga.put(updateLogbookEntryRequest(id, { totalSpent }));
    }
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
  }
}

function* bulkDeletePurchases(action: PurchaseBulkDeleteAction) {
  try {
    const { purchaseIds, association, associationId } = action.payload;
    const endpoint = ApiRoutes.PURCHASES + `/bulk-delete`;

    // ↓↓↓ If the purchases either belongs to an overview group           ↓↓↓ //
    // ↓↓↓ or logbook entry, fix the purchase placements on bulk delete.  ↓↓↓ //
    if (association && associationId) {
      if (association === "Overview Group") {
        yield Saga.call(axios.post, endpoint, {
          purchaseIds,
          overviewGroupId: associationId,
        });
      } else {
        yield Saga.call(axios.post, endpoint, {
          purchaseIds,
          logbookEntryId: associationId,
        });
      }
    }
    // ↓↓↓ Otherwise, just delete the purchases without caring for placements. ↓↓↓ //
    else {
      yield Saga.call(axios.post, endpoint, { purchaseIds });
    }

    yield Saga.put(Redux.entitiesActions.bulkDeletePurchases(purchaseIds));
    // yield Saga.put(updateLogbookEntryRequest(logbookEntryId, { totalSpent }));
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
  } catch (error) {
    yield Saga.put(Redux.uiActions.setLoadingPurchases(false));
    yield Functions.sagaError(error);
  }
}

function* deleteAssociatedPurchases(action: PurchaseAssociationDeleteAction) {
  try {
    const { purchaseIds, association } = action.payload;
    const endpoint = ApiRoutes.PURCHASES + `/delete-associated-purchases`;
    yield Saga.call(axios.post, endpoint, association);
    // yield Saga.put(Redux.entitiesActions.setPurchases(null));
    yield Saga.put(
      Redux.entitiesActions.deleteAssociatedPurchases({
        purchaseIds,
        ...association,
      })
    );
    if (association.overviewGroupId) {
      yield Saga.put(
        updateOverviewGroupRequest(association.overviewGroupId, {
          totalSpent: 0,
        })
      );
    } else if (association.logbookEntryId) {
      yield Saga.put(
        updateLogbookEntryRequest(association.logbookEntryId, { totalSpent: 0 })
      );
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
      PurchasesActionTypes.FETCH_LOGBOOK_ENTRY_PURCHASES_BY_CATEGORY,
      fetchLogbookEntryPurchasesByCategory
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
    Saga.takeEvery(
      PurchasesActionTypes.UPDATE_PURCHASE_PLACEMENT,
      updatePurchasePlacement
    ),
    Saga.takeEvery(PurchasesActionTypes.DELETE_PURCHASE, deletePurchase),
    Saga.takeEvery(
      PurchasesActionTypes.BULK_DELETE_PURCHASES,
      bulkDeletePurchases
    ),
    Saga.takeEvery(
      PurchasesActionTypes.DELETE_ASSOCIATED_PURCHASES,
      deleteAssociatedPurchases
    ),
  ]);
}
