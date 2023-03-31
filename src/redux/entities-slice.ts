import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/utils/types";
import { deepCopy } from "@/utils/functions";

// ========================================================================================= //
// [ TYPES ] =============================================================================== //
// ========================================================================================= //

export type EntitiesState = {
  currentUser: Types.User | null;
  users: Types.UsersEntity | null;
  overviews: Types.OverviewsEntity | null;
  overviewGroups: Types.OverviewGroupsEntity | null;
  logbooks: Types.LogbooksEntity | null;
  logbookEntries: Types.LogbookEntriesEntity | null;
  purchases: Types.PurchasesEntity | null;
};

// ========================================================================================= //
// [ SLICE ] =============================================================================== //
// ========================================================================================= //

const initialState: EntitiesState = {
  currentUser: null,
  users: null,
  overviews: null,
  overviewGroups: null,
  logbooks: null,
  logbookEntries: null,
  purchases: null,
};

const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    // ↓↓↓ Current User ↓↓↓ //
    setCurrentUser: (
      state: EntitiesState,
      action: PayloadAction<Types.User | null>
    ) => {
      state.currentUser = action.payload;
    },
    addRelationalIdsToCurrentUser: (
      state: EntitiesState,
      action: PayloadAction<{
        relationalField: "overviewIds" | "logbookIds";
        ids: number[];
      }>
    ) => {
      if (state.currentUser) {
        const { relationalField, ids } = action.payload;
        console.log("Ids:", ids);
        const currentUserCopy = deepCopy(state.currentUser);
        const relationalIds = currentUserCopy[relationalField];
        if (relationalIds) {
          currentUserCopy[relationalField] = [...relationalIds, ...ids];
          state.currentUser = currentUserCopy;
        } else {
          currentUserCopy.overviewIds = [...ids];
          state.currentUser = currentUserCopy;
        }
      }
    },

    // ↓↓↓ Users ↓↓↓ //
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
    deleteUser: (state: EntitiesState, action: PayloadAction<number>) => {
      if (state.users) {
        const usersCopy = deepCopy(state.users);
        delete usersCopy[action.payload];
        state.users = usersCopy;
      }
    },

    // ↓↓↓ Overviews ↓↓↓ //
    setOverviews: (
      state: EntitiesState,
      action: PayloadAction<Types.OverviewsEntity | null>
    ) => {
      state.overviews = action.payload;
    },
    addOverview: (
      state: EntitiesState,
      action: PayloadAction<Types.OverviewsEntity>
    ) => {
      state.overviews = { ...state.overviews, ...action.payload };
    },
    addRelationalIdsToOverview: (
      state: EntitiesState,
      action: PayloadAction<{ overviewId: number; overviewGroupIds: number[] }>
    ) => {
      if (state.overviews) {
        const { overviewId, overviewGroupIds } = action.payload;
        const overviewsCopy = deepCopy(state.overviews);
        const currentOverview = overviewsCopy[overviewId];
        const relationalIds = currentOverview.overviewGroupIds;
        if (relationalIds) {
          currentOverview.overviewGroupIds = [
            ...relationalIds,
            ...overviewGroupIds,
          ];
          state.overviews = overviewsCopy;
        } else {
          currentOverview.overviewGroupIds = [...overviewGroupIds];
          state.overviews = overviewsCopy;
        }
      }
    },
    deleteOverview: (state: EntitiesState, action: PayloadAction<number>) => {
      if (state.overviews) {
        const overviewsCopy = deepCopy(state.overviews);
        delete overviewsCopy[action.payload];
        state.overviews = overviewsCopy;
      }
    },

    // ↓↓↓ Overview Groups ↓↓↓ //
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
    addRelationalIdsToOverviewGroup: (
      state: EntitiesState,
      action: PayloadAction<{ overviewGroupId: number; purchaseIds: number[] }>
    ) => {
      if (state.overviewGroups) {
        const { overviewGroupId, purchaseIds } = action.payload;
        const overviewGroupsCopy = deepCopy(state.overviewGroups);
        const currentOverviewGroup = overviewGroupsCopy[overviewGroupId];
        const relationalIds = currentOverviewGroup.purchaseIds;
        currentOverviewGroup.purchaseIds = [...relationalIds, ...purchaseIds];
        state.overviewGroups = overviewGroupsCopy;
      }
    },
    deleteOverviewGroup: (
      state: EntitiesState,
      action: PayloadAction<number>
    ) => {
      if (state.overviewGroups) {
        const overviewGroupsCopy = deepCopy(state.overviewGroups);
        delete overviewGroupsCopy[action.payload];
        state.overviewGroups = overviewGroupsCopy;
      }
    },

    // ↓↓↓ Logbooks ↓↓↓ //
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
    addRelationalIdsToLogbook: (
      state: EntitiesState,
      action: PayloadAction<{ logbookId: number; logbookEntryIds: number[] }>
    ) => {
      if (state.logbooks) {
        const { logbookId, logbookEntryIds } = action.payload;
        const logbooksCopy = deepCopy(state.logbooks);
        const currentLogbook = logbooksCopy[logbookId];
        const relationalIds = currentLogbook.logbookEntryIds;
        currentLogbook.logbookEntryIds = [...relationalIds, ...logbookEntryIds];
        state.logbooks = logbooksCopy;
      }
    },
    deleteLogbook: (state: EntitiesState, action: PayloadAction<number>) => {
      if (state.logbooks) {
        const logbooksCopy = deepCopy(state.logbooks);
        delete logbooksCopy[action.payload];
        state.logbooks = logbooksCopy;
      }
    },

    // ↓↓↓ Logbook Entries ↓↓↓ //
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
    addRelationalIdsToLogbookEntry: (
      state: EntitiesState,
      action: PayloadAction<{ logbookEntryId: number; purchaseIds: number[] }>
    ) => {
      if (state.logbookEntries) {
        const { logbookEntryId, purchaseIds } = action.payload;
        const logbookEntriesCopy = deepCopy(state.logbookEntries);
        const currentLogbookEntry = logbookEntriesCopy[logbookEntryId];
        const relationalIds = currentLogbookEntry.purchaseIds;
        currentLogbookEntry.purchaseIds = [...relationalIds, ...purchaseIds];
        state.logbookEntries = logbookEntriesCopy;
      }
    },
    deleteLogbookEntry: (
      state: EntitiesState,
      action: PayloadAction<number>
    ) => {
      if (state.logbookEntries) {
        const logbookEntriesCopy = deepCopy(state.logbookEntries);
        delete logbookEntriesCopy[action.payload];
        state.logbookEntries = logbookEntriesCopy;
      }
    },

    // ↓↓↓ Purchase Entries ↓↓↓ //
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
    deletePurchase: (state: EntitiesState, action: PayloadAction<number>) => {
      if (state.purchases) {
        const purchasesCopy = deepCopy(state.purchases);
        delete purchasesCopy[action.payload];
        state.purchases = purchasesCopy;
      }
    },
    batchDeletePurchases: (
      state: EntitiesState,
      action: PayloadAction<number[]>
    ) => {
      if (state.purchases) {
        const purchasesCopy = deepCopy(state.purchases);
        for (const purchaseId of action.payload) {
          delete purchasesCopy[purchaseId];
        }
        state.purchases = purchasesCopy;
      }
    },
  },
});

export const entitiesActions = entitiesSlice.actions;
export const entitiesReducer = entitiesSlice.reducer;
