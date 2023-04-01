import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Functions from "@/utils/functions";
import * as Types from "@/utils/types";

export type EntitiesState = {
  currentUser: Types.User | null;
  users: Types.UsersEntity | null;
  overviews: Types.OverviewsEntity | null;
  overviewGroups: Types.OverviewGroupsEntity | null;
  logbooks: Types.LogbooksEntity | null;
  logbookEntries: Types.LogbookEntriesEntity | null;
  purchases: Types.PurchasesEntity | null;
};

const initialState: EntitiesState = {
  currentUser: null,
  users: null,
  overviews: null,
  overviewGroups: null,
  logbooks: null,
  logbookEntries: null,
  purchases: null,
};

type UserRelations = {
  relationalField: "overviewIds" | "logbookIds";
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
        const { overviewIds, logbookIds } = state.currentUser;
        const updatedUser = action.payload;
        if (overviewIds) updatedUser["overviewIds"] = overviewIds;
        if (logbookIds) updatedUser["logbookIds"] = logbookIds;
        state.currentUser = updatedUser;
      }
    },
    updateCurrentUserRelations: (
      state: EntitiesState,
      action: PayloadAction<UserRelations>
    ) => {
      if (state.currentUser) {
        const { relationalField, ids } = action.payload;
        const currentUserCopy = Functions.Functions.deepCopy(state.currentUser);
        const relationalIds = currentUserCopy[relationalField];
        currentUserCopy[relationalField] =
          Functions.removeDuplicatesFromArray(ids);
        if (relationalIds) {
          const uniqueRelationalIds =
            Functions.removeDuplicatesFromArray(relationalIds);
          currentUserCopy[relationalField].concat(uniqueRelationalIds);
        }
        state.currentUser = currentUserCopy;
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
        const updatedUsers = Functions.deepCopy(state.users);
        updatedUsers[userId] = user;
        state.users = updatedUsers;
      }
    },
    updateUserRelations: (
      state: EntitiesState,
      action: PayloadAction<{ userId: number } & UserRelations>
    ) => {
      if (state.users) {
        const { userId, relationalField, ids } = action.payload;
        const usersCopy = Functions.deepCopy(state.users);
        const selectedUser = usersCopy[userId];
        const relationalIds = selectedUser[relationalField];
        selectedUser[relationalField] =
          Functions.removeDuplicatesFromArray(ids);
        if (relationalIds) {
          const uniqueRelationalIds =
            Functions.removeDuplicatesFromArray(relationalIds);
          selectedUser[relationalField].concat(uniqueRelationalIds);
        }
        state.users = usersCopy;
      }
    },
    deleteUser: (state: EntitiesState, action: PayloadAction<number>) => {
      if (state.users) {
        const usersCopy = Functions.deepCopy(state.users);
        delete usersCopy[action.payload];
        state.users = usersCopy;
      }
    },

    // ========================================================================================= //
    // [ OVERVIEWS ] =========================================================================== //
    // ========================================================================================= //

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
        const overviewsCopy = Functions.deepCopy(state.overviews);
        const currentOverview = overviewsCopy[overviewId];
        const relationalIds = currentOverview.overviewGroupIds;
        currentOverview.overviewGroupIds =
          Functions.removeDuplicatesFromArray(overviewGroupIds);
        if (relationalIds) {
          const uniqueRelationalIds =
            Functions.removeDuplicatesFromArray(relationalIds);
          currentOverview.overviewGroupIds.concat(uniqueRelationalIds);
        }
        state.overviews = overviewsCopy;
      }
    },
    deleteOverview: (state: EntitiesState, action: PayloadAction<number>) => {
      if (state.overviews) {
        const overviewsCopy = Functions.deepCopy(state.overviews);
        delete overviewsCopy[action.payload];
        state.overviews = overviewsCopy;
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
    addRelationalIdsToOverviewGroup: (
      state: EntitiesState,
      action: PayloadAction<{ overviewGroupId: number; purchaseIds: number[] }>
    ) => {
      if (state.overviewGroups) {
        const { overviewGroupId, purchaseIds } = action.payload;
        const overviewGroupsCopy = Functions.deepCopy(state.overviewGroups);
        const currentOverviewGroup = overviewGroupsCopy[overviewGroupId];
        const relationalIds = currentOverviewGroup.purchaseIds;
        currentOverviewGroup.purchaseIds =
          Functions.removeDuplicatesFromArray(purchaseIds);
        if (relationalIds) {
          const uniqueRelationalIds =
            Functions.removeDuplicatesFromArray(relationalIds);
          currentOverviewGroup.purchaseIds.concat(uniqueRelationalIds);
        }
        state.overviewGroups = overviewGroupsCopy;
      }
    },
    deleteOverviewGroup: (
      state: EntitiesState,
      action: PayloadAction<number>
    ) => {
      if (state.overviewGroups) {
        const overviewGroupsCopy = Functions.deepCopy(state.overviewGroups);
        delete overviewGroupsCopy[action.payload];
        state.overviewGroups = overviewGroupsCopy;
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
    addRelationalIdsToLogbook: (
      state: EntitiesState,
      action: PayloadAction<{ logbookId: number; logbookEntryIds: number[] }>
    ) => {
      if (state.logbooks) {
        const { logbookId, logbookEntryIds } = action.payload;
        const logbooksCopy = Functions.deepCopy(state.logbooks);
        const currentLogbook = logbooksCopy[logbookId];
        const relationalIds = currentLogbook.logbookEntryIds;
        currentLogbook.logbookEntryIds =
          Functions.removeDuplicatesFromArray(logbookEntryIds);
        if (relationalIds) {
          const uniqueRelationalIds =
            Functions.removeDuplicatesFromArray(relationalIds);
          currentLogbook.logbookEntryIds.concat(uniqueRelationalIds);
        }
        state.logbooks = logbooksCopy;
      }
    },
    deleteLogbook: (state: EntitiesState, action: PayloadAction<number>) => {
      if (state.logbooks) {
        const logbooksCopy = Functions.deepCopy(state.logbooks);
        delete logbooksCopy[action.payload];
        state.logbooks = logbooksCopy;
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
    addRelationalIdsToLogbookEntry: (
      state: EntitiesState,
      action: PayloadAction<{ logbookEntryId: number; purchaseIds: number[] }>
    ) => {
      if (state.logbookEntries) {
        const { logbookEntryId, purchaseIds } = action.payload;
        const logbookEntriesCopy = Functions.deepCopy(state.logbookEntries);
        const currentLogbookEntry = logbookEntriesCopy[logbookEntryId];
        const relationalIds = currentLogbookEntry.purchaseIds;
        currentLogbookEntry.purchaseIds =
          Functions.removeDuplicatesFromArray(purchaseIds);
        if (relationalIds) {
          const uniqueRelationalIds =
            Functions.removeDuplicatesFromArray(relationalIds);
          currentLogbookEntry.purchaseIds.concat(uniqueRelationalIds);
        }
        state.logbookEntries = logbookEntriesCopy;
      }
    },
    deleteLogbookEntry: (
      state: EntitiesState,
      action: PayloadAction<number>
    ) => {
      if (state.logbookEntries) {
        const logbookEntriesCopy = Functions.deepCopy(state.logbookEntries);
        delete logbookEntriesCopy[action.payload];
        state.logbookEntries = logbookEntriesCopy;
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
    deletePurchase: (state: EntitiesState, action: PayloadAction<number>) => {
      if (state.purchases) {
        const purchasesCopy = Functions.deepCopy(state.purchases);
        delete purchasesCopy[action.payload];
        state.purchases = purchasesCopy;
      }
    },
    batchDeletePurchases: (
      state: EntitiesState,
      action: PayloadAction<number[]>
    ) => {
      if (state.purchases) {
        const purchasesCopy = Functions.deepCopy(state.purchases);
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
