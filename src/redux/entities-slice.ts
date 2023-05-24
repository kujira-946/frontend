import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";

export type EntitiesState = {
  currentUser: Types.User | null;
  overview: Types.Overview | null;
  users: Types.UsersEntity | null;
  overviewGroups: Types.OverviewGroupsEntity | null;
  logbooks: Types.LogbooksEntity | null;
  logbookEntries: Types.LogbookEntriesEntity | null;
  purchases: Types.PurchasesEntity | null;
  bugReports: Types.BugReport | null;
};

const initialState: EntitiesState = {
  currentUser: null,
  overview: null,
  users: null,
  overviewGroups: null,
  logbooks: null,
  logbookEntries: null,
  purchases: null,
  bugReports: null,
};

type UserRelation = {
  relationalField: "overviewId";
  id: number;
};

type UserRelations = {
  relationalField: "logbookIds" | "bugReportIds";
  ids: number[];
};

const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    // ========================================================================================= //
    // [ CURRENT USER ] ======================================================================== //
    // ========================================================================================= //

    setCurrentUser: (
      state: EntitiesState,
      action: PayloadAction<Types.User | null>
    ) => {
      state.currentUser = action.payload;
    },
    updateCurrentUser: (
      state: EntitiesState,
      action: PayloadAction<Types.User>
    ) => {
      if (state.currentUser) {
        const { overviewId, logbookIds } = state.currentUser;
        if (overviewId) action.payload.overviewId = overviewId;
        if (logbookIds) action.payload.logbookIds = logbookIds;
        state.currentUser = action.payload;
      }
    },
    updateCurrentUserRelation: (
      state: EntitiesState,
      action: PayloadAction<UserRelation>
    ) => {
      if (state.currentUser) {
        const { relationalField, id } = action.payload;
        state.currentUser[relationalField] = id;
      }
    },
    updateCurrentUserRelations: (
      state: EntitiesState,
      action: PayloadAction<UserRelations>
    ) => {
      if (state.currentUser) {
        const { relationalField, ids } = action.payload;
        const relationalIds = state.currentUser[relationalField];
        if (relationalIds) {
          state.currentUser[relationalField] = Functions.sortArray(
            Functions.removeDuplicatesFromArray([...relationalIds, ...ids])
          );
        } else {
          state.currentUser[relationalField] = Functions.sortArray(
            Functions.removeDuplicatesFromArray(ids)
          );
        }
      }
    },

    // ========================================================================================= //
    // [ OVERVIEW ] ============================================================================ //
    // ========================================================================================= //

    setOverview: (
      state: EntitiesState,
      action: PayloadAction<Types.Overview | null>
    ) => {
      state.overview = action.payload;
    },
    updateOverview: (
      state: EntitiesState,
      action: PayloadAction<Types.Overview>
    ) => {
      if (state.overview) {
        const { overviewGroupIds } = state.overview;
        if (overviewGroupIds) {
          action.payload.overviewGroupIds = overviewGroupIds;
        }
        state.overview = action.payload;
      }
    },
    updateOverviewRelations: (
      state: EntitiesState,
      action: PayloadAction<{ overviewGroupIds: number[] }>
    ) => {
      if (state.overview) {
        const { overviewGroupIds } = action.payload;
        const relationalIds = state.overview.overviewGroupIds;
        if (relationalIds) {
          state.overview.overviewGroupIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray([
              ...relationalIds,
              ...overviewGroupIds,
            ])
          );
        } else {
          state.overview.overviewGroupIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray(overviewGroupIds)
          );
        }
      }
    },

    // ========================================================================================= //
    // [ USERS ] =============================================================================== //
    // ========================================================================================= //

    setUsers: (
      state: EntitiesState,
      action: PayloadAction<Types.UsersEntity | null>
    ) => {
      state.users = action.payload;
    },
    addUser: (
      state: EntitiesState,
      action: PayloadAction<Types.UsersEntity>
    ) => {
      state.users = { ...state.users, ...action.payload };
    },
    updateUser: (
      state: EntitiesState,
      action: PayloadAction<{ userId: number; user: Types.User }>
    ) => {
      if (state.users) {
        const { userId, user } = action.payload;
        const overviewId = state.users[userId].overviewId;
        const logbookIds = state.users[userId].logbookIds;
        state.users[userId] = user;
        state.users[userId]["overviewId"] = overviewId;
        state.users[userId]["logbookIds"] = logbookIds;
      }
    },
    updateUserRelations: (
      state: EntitiesState,
      action: PayloadAction<{ userId: number } & UserRelations>
    ) => {
      if (state.users) {
        const { userId, relationalField, ids } = action.payload;
        const user = state.users[userId];
        const relationalIds = user[relationalField];
        if (relationalIds) {
          user[relationalField] = Functions.sortArray(
            Functions.removeDuplicatesFromArray([...relationalIds, ...ids])
          );
        } else {
          user[relationalField] = Functions.sortArray(
            Functions.removeDuplicatesFromArray(ids)
          );
        }
      }
    },
    deleteUser: (state: EntitiesState, action: PayloadAction<number>) => {
      if (state.users && state.users[action.payload]) {
        delete state.users[action.payload];
      }
    },

    // ========================================================================================= //
    // [ OVERVIEW GROUPS ] ===================================================================== //
    // ========================================================================================= //

    setOverviewGroups: (
      state: EntitiesState,
      action: PayloadAction<Types.OverviewGroupsEntity | null>
    ) => {
      state.overviewGroups = action.payload;
    },
    addOverviewGroup: (
      state: EntitiesState,
      action: PayloadAction<Types.OverviewGroupsEntity>
    ) => {
      state.overviewGroups = { ...state.overviewGroups, ...action.payload };
    },
    updateOverviewGroup: (
      state: EntitiesState,
      action: PayloadAction<{
        overviewGroupId: number;
        overviewGroup: Types.OverviewGroup;
      }>
    ) => {
      if (state.overviewGroups) {
        const { overviewGroupId, overviewGroup } = action.payload;
        const purchaseIds = state.overviewGroups[overviewGroupId].purchaseIds;
        state.overviewGroups[overviewGroupId] = overviewGroup;
        state.overviewGroups[overviewGroupId]["purchaseIds"] =
          purchaseIds || [];
      }
    },
    updateOverviewGroupRelations: (
      state: EntitiesState,
      action: PayloadAction<{ overviewGroupId: number; purchaseIds: number[] }>
    ) => {
      if (state.overviewGroups) {
        const { overviewGroupId, purchaseIds } = action.payload;
        const overviewGroup = state.overviewGroups[overviewGroupId];
        const relationalIds = overviewGroup.purchaseIds;
        if (relationalIds) {
          overviewGroup.purchaseIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray([
              ...relationalIds,
              ...purchaseIds,
            ])
          );
        } else {
          overviewGroup.purchaseIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray(purchaseIds)
          );
        }
      }
    },
    deleteOverviewGroup: (
      state: EntitiesState,
      action: PayloadAction<number>
    ) => {
      if (state.overviewGroups && state.overviewGroups[action.payload]) {
        delete state.overviewGroups[action.payload];
      }
    },

    // ========================================================================================= //
    // [ LOGBOOKS ] ============================================================================ //
    // ========================================================================================= //

    setLogbooks: (
      state: EntitiesState,
      action: PayloadAction<Types.LogbooksEntity | null>
    ) => {
      state.logbooks = action.payload;
    },
    addLogbook: (
      state: EntitiesState,
      action: PayloadAction<Types.LogbooksEntity>
    ) => {
      state.logbooks = { ...state.logbooks, ...action.payload };
    },
    updateLogbook: (
      state: EntitiesState,
      action: PayloadAction<{ logbookId: number; logbook: Types.Logbook }>
    ) => {
      if (state.logbooks) {
        const { logbookId, logbook } = action.payload;
        const logbookEntryIds = state.logbooks[logbookId].logbookEntryIds;
        state.logbooks[logbookId] = logbook;
        state.logbooks[logbookId]["logbookEntryIds"] = logbookEntryIds || [];
      }
    },
    updateLogbookRelations: (
      state: EntitiesState,
      action: PayloadAction<{ logbookId: number; logbookEntryIds: number[] }>
    ) => {
      if (state.logbooks) {
        const { logbookId, logbookEntryIds } = action.payload;
        const logbook = state.logbooks[logbookId];
        const relationalIds = logbook.logbookEntryIds;
        if (relationalIds) {
          logbook.logbookEntryIds = Functions.removeDuplicatesFromArray([
            ...logbookEntryIds,
            ...relationalIds,
          ]);
        } else {
          logbook.logbookEntryIds =
            Functions.removeDuplicatesFromArray(logbookEntryIds);
        }
      }
    },
    deleteLogbook: (state: EntitiesState, action: PayloadAction<number>) => {
      if (state.logbooks && state.logbooks[action.payload]) {
        delete state.logbooks[action.payload];
      }
    },

    // ========================================================================================= //
    // [ LOGBOOK ENTRIES ] ===================================================================== //
    // ========================================================================================= //

    setLogbookEntries: (
      state: EntitiesState,
      action: PayloadAction<Types.LogbookEntriesEntity | null>
    ) => {
      state.logbookEntries = action.payload;
    },
    addLogbookEntries: (
      state: EntitiesState,
      action: PayloadAction<Types.LogbookEntriesEntity>
    ) => {
      state.logbookEntries = { ...state.logbookEntries, ...action.payload };
    },
    updateLogbookEntry: (
      state: EntitiesState,
      action: PayloadAction<{
        logbookEntryId: number;
        logbookEntry: Types.LogbookEntry;
      }>
    ) => {
      if (state.logbookEntries) {
        const { logbookEntryId, logbookEntry } = action.payload;
        const purchaseIds = state.logbookEntries[logbookEntryId].purchaseIds;
        state.logbookEntries[logbookEntryId] = logbookEntry;
        state.logbookEntries[logbookEntryId]["purchaseIds"] = purchaseIds || [];
      }
    },
    updateLogbookEntryRelations: (
      state: EntitiesState,
      action: PayloadAction<{
        logbookEntryId: number;
        purchaseIds: number[];
        resetRelations?: boolean;
      }>
    ) => {
      if (state.logbookEntries) {
        const { logbookEntryId, purchaseIds, resetRelations } = action.payload;
        const logbookEntry = state.logbookEntries[logbookEntryId];
        const relationalIds = logbookEntry.purchaseIds;
        if (resetRelations || !relationalIds) {
          logbookEntry.purchaseIds =
            Functions.removeDuplicatesFromArray(purchaseIds);
        } else {
          logbookEntry.purchaseIds = Functions.removeDuplicatesFromArray([
            ...relationalIds,
            ...purchaseIds,
          ]);
        }
      }
    },
    deleteLogbookEntry: (
      state: EntitiesState,
      action: PayloadAction<number>
    ) => {
      if (
        state.logbookEntries &&
        state.logbooks &&
        state.logbookEntries[action.payload]
      ) {
        const logbookEntry = state.logbookEntries[action.payload];
        const { logbookEntryIds } = state.logbooks[logbookEntry.logbookId];
        if (logbookEntryIds) {
          const logbookEntryIndex = logbookEntryIds.indexOf(action.payload);
          logbookEntryIds.splice(logbookEntryIndex, 1);
        }
        delete state.logbookEntries[action.payload];
      }
    },

    // ========================================================================================= //
    // [ PURCHASES ] =========================================================================== //
    // ========================================================================================= //

    setPurchases: (
      state: EntitiesState,
      action: PayloadAction<Types.PurchasesEntity | null>
    ) => {
      state.purchases = action.payload;
    },
    addPurchase: (
      state: EntitiesState,
      action: PayloadAction<Types.PurchasesEntity>
    ) => {
      state.purchases = { ...state.purchases, ...action.payload };
    },
    updatePurchase: (
      state: EntitiesState,
      action: PayloadAction<{ purchaseId: number; purchase: Types.Purchase }>
    ) => {
      if (state.purchases) {
        const { purchaseId, purchase } = action.payload;
        state.purchases[purchaseId] = purchase;
      }
    },
    deletePurchase: (state: EntitiesState, action: PayloadAction<number>) => {
      if (state.purchases && state.purchases[action.payload]) {
        const purchase = state.purchases[action.payload];

        // ↓↓↓ Overview Group ↓↓↓ //
        if (state.overviewGroups && purchase.overviewGroupId) {
          const { purchaseIds } =
            state.overviewGroups[purchase.overviewGroupId];
          if (purchaseIds) {
            const purchaseIndex = purchaseIds.indexOf(action.payload);
            purchaseIds.splice(purchaseIndex, 1);
          }
        }
        // ↓↓↓ Logbook Entry ↓↓↓ //
        else if (state.logbookEntries && purchase.logbookEntryId) {
          const { purchaseIds } = state.logbookEntries[purchase.logbookEntryId];
          if (purchaseIds) {
            const purchaseIndex = purchaseIds.indexOf(action.payload);
            purchaseIds.splice(purchaseIndex, 1);
          }
        }

        delete state.purchases[action.payload];

        if (Object.keys(state.purchases).length === 0) {
          state.purchases = null;
        }
      }
    },
    bulkDeletePurchases: (
      state: EntitiesState,
      action: PayloadAction<number[]>
    ) => {
      if (state.purchases) {
        if (state.logbookEntries) {
          for (const purchaseId of action.payload) {
            const { logbookEntryId } = state.purchases[purchaseId];
            if (logbookEntryId) {
              const { purchaseIds } = state.logbookEntries[logbookEntryId];
              if (purchaseIds) {
                const purchaseIndex = purchaseIds.indexOf(purchaseId);
                purchaseIds.splice(purchaseIndex, 1);
              }
            }
            if (state.purchases[purchaseId]) delete state.purchases[purchaseId];
          }
        }

        for (const purchaseId of action.payload) {
          if (state.purchases[purchaseId]) delete state.purchases[purchaseId];
        }

        if (Object.keys(state.purchases).length === 0) {
          state.purchases = null;
        }
      }
    },
    deleteAssociatedPurchases: (
      state: EntitiesState,
      action: PayloadAction<{
        purchaseIds: number[];
        overviewGroupId?: number;
        logbookEntryId?: number;
      }>
    ) => {
      if (state.purchases) {
        const { purchaseIds, overviewGroupId, logbookEntryId } = action.payload;
        for (const purchaseId of purchaseIds) {
          if (state.purchases[purchaseId]) delete state.purchases[purchaseId];
        }

        // ↓↓↓ Overview Groups ↓↓↓ //
        if (state.overviewGroups && overviewGroupId) {
          if (overviewGroupId) {
            const { purchaseIds } = state.overviewGroups[overviewGroupId];
            if (purchaseIds) {
              state.overviewGroups[overviewGroupId].purchaseIds = [];
            }
          }
        }
        // ↓↓↓ Logbook Entries ↓↓↓ //
        else if (state.logbookEntries && logbookEntryId) {
          if (logbookEntryId) {
            const { purchaseIds } = state.logbookEntries[logbookEntryId];
            if (purchaseIds) {
              state.logbookEntries[logbookEntryId].purchaseIds = [];
            }
          }
        }

        if (Object.keys(state.purchases).length === 0) {
          state.purchases = null;
        }
      }
    },

    // ========================================================================================= //
    // [ BUG REPORTS ] ========================================================================= //
    // ========================================================================================= //

    setBugReports: (
      state: EntitiesState,
      action: PayloadAction<Types.BugReport | null>
    ) => {
      state.bugReports = action.payload;
    },
  },
});

export const entitiesActions = entitiesSlice.actions;
export const entitiesReducer = entitiesSlice.reducer;
