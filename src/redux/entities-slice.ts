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
};

const initialState: EntitiesState = {
  currentUser: null,
  overview: null,

  users: null,
  overviewGroups: null,
  logbooks: null,
  logbookEntries: null,
  purchases: null,
};

type UserRelation = {
  relationalField: "overviewId";
  id: number;
};

type UserRelations = {
  relationalField: "logbookIds";
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
        const { logbookIds } = state.currentUser;
        const updatedUser = action.payload;
        if (logbookIds) updatedUser.logbookIds = logbookIds;
        state.currentUser = updatedUser;
      }
    },
    updateCurrentUserRelation: (
      state: EntitiesState,
      action: PayloadAction<UserRelation>
    ) => {
      if (state.currentUser) {
        const { relationalField, id } = action.payload;
        const currentUserCopy = Functions.deepCopy(state.currentUser);
        currentUserCopy[relationalField] = id;
        state.currentUser = currentUserCopy;
      }
    },
    updateCurrentUserRelations: (
      state: EntitiesState,
      action: PayloadAction<UserRelations>
    ) => {
      if (state.currentUser) {
        const { relationalField, ids } = action.payload;
        const currentUserCopy = Functions.deepCopy(state.currentUser);
        const relationalIds = state.currentUser[relationalField];
        if (relationalIds) {
          currentUserCopy[relationalField] = Functions.sortArray(
            Functions.removeDuplicatesFromArray([...relationalIds, ...ids])
          );
        } else {
          currentUserCopy[relationalField] = Functions.sortArray(
            Functions.removeDuplicatesFromArray(ids)
          );
        }
        state.currentUser = currentUserCopy;
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
        const updatedOverview = action.payload;
        if (overviewGroupIds) {
          updatedOverview.overviewGroupIds = overviewGroupIds;
        }
        state.overview = updatedOverview;
      }
    },
    updateOverviewRelations: (
      state: EntitiesState,
      action: PayloadAction<{ overviewGroupIds: number[] }>
    ) => {
      if (state.overview) {
        const { overviewGroupIds } = action.payload;
        const overviewCopy = Functions.deepCopy(state.overview);
        const relationalIds = state.overview.overviewGroupIds;

        if (relationalIds) {
          overviewCopy.overviewGroupIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray([
              ...relationalIds,
              ...overviewGroupIds,
            ])
          );
        } else {
          overviewCopy.overviewGroupIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray(overviewGroupIds)
          );
        }
        state.overview = overviewCopy;
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
        if (state.users[userId].logbookIds) {
          updatedUsers[userId]["logbookIds"] = state.users[userId].logbookIds;
        }
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
        if (relationalIds) {
          selectedUser[relationalField] = Functions.sortArray(
            Functions.removeDuplicatesFromArray([...relationalIds, ...ids])
          );
        } else {
          selectedUser[relationalField] = Functions.sortArray(
            Functions.removeDuplicatesFromArray(ids)
          );
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
        const updatedOverviewGroups = Functions.deepCopy(state.overviewGroups);
        updatedOverviewGroups[overviewGroupId] = overviewGroup;
        if (state.overviewGroups[overviewGroupId].purchaseIds) {
          updatedOverviewGroups[overviewGroupId]["purchaseIds"] =
            state.overviewGroups[overviewGroupId].purchaseIds;
        }
        state.overviewGroups = updatedOverviewGroups;
      }
    },
    updateOverviewGroupRelations: (
      state: EntitiesState,
      action: PayloadAction<{ overviewGroupId: number; purchaseIds: number[] }>
    ) => {
      if (state.overviewGroups) {
        const { overviewGroupId, purchaseIds } = action.payload;
        const overviewGroupsCopy = Functions.deepCopy(state.overviewGroups);
        const currentOverviewGroup = overviewGroupsCopy[overviewGroupId];
        const relationalIds = currentOverviewGroup.purchaseIds;
        if (relationalIds) {
          currentOverviewGroup.purchaseIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray([
              ...relationalIds,
              ...purchaseIds,
            ])
          );
        } else {
          currentOverviewGroup.purchaseIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray(purchaseIds)
          );
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
    updateLogbook: (
      state: EntitiesState,
      action: PayloadAction<{ logbookId: number; logbook: Types.Logbook }>
    ) => {
      if (state.logbooks) {
        const { logbookId, logbook } = action.payload;
        const updatedLogbooks = Functions.deepCopy(state.logbooks);
        updatedLogbooks[logbookId] = logbook;
        if (state.logbooks[logbookId].logbookEntryIds) {
          updatedLogbooks[logbookId]["logbookEntryIds"] =
            state.logbooks[logbookId].logbookEntryIds;
        }
        state.logbooks = updatedLogbooks;
      }
    },
    updateLogbookRelations: (
      state: EntitiesState,
      action: PayloadAction<{ logbookId: number; logbookEntryIds: number[] }>
    ) => {
      if (state.logbooks) {
        const { logbookId, logbookEntryIds } = action.payload;
        const logbooksCopy = Functions.deepCopy(state.logbooks);
        const currentLogbook = logbooksCopy[logbookId];
        const relationalIds = currentLogbook.logbookEntryIds;
        if (relationalIds) {
          currentLogbook.logbookEntryIds = Functions.removeDuplicatesFromArray([
            ...logbookEntryIds,
            ...relationalIds,
          ]);
        } else {
          currentLogbook.logbookEntryIds =
            Functions.removeDuplicatesFromArray(logbookEntryIds);
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
    updateLogbookEntry: (
      state: EntitiesState,
      action: PayloadAction<{
        logbookEntryId: number;
        logbookEntry: Types.LogbookEntry;
      }>
    ) => {
      if (state.logbookEntries) {
        const { logbookEntryId, logbookEntry } = action.payload;
        const updatedLogbookEntry = Functions.deepCopy(state.logbookEntries);
        updatedLogbookEntry[logbookEntryId] = logbookEntry;
        if (state.logbookEntries[logbookEntryId].purchaseIds) {
          updatedLogbookEntry[logbookEntryId]["purchaseIds"] =
            state.logbookEntries[logbookEntryId].purchaseIds;
        }
        state.logbookEntries = updatedLogbookEntry;
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
        const logbookEntriesCopy = Functions.deepCopy(state.logbookEntries);
        const logbookEntry = logbookEntriesCopy[logbookEntryId];
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
        state.logbookEntries = logbookEntriesCopy;
      }
    },
    deleteLogbookEntry: (
      state: EntitiesState,
      action: PayloadAction<number>
    ) => {
      if (state.logbookEntries) {
        const logbookEntriesCopy = Functions.deepCopy(state.logbookEntries);
        if (state.logbooks) {
          const logbookEntry = state.logbookEntries[action.payload];
          const updatedLogbooks = Functions.deepCopy(state.logbooks);
          const { logbookEntryIds } = updatedLogbooks[logbookEntry.logbookId];
          if (logbookEntryIds) {
            const logbookEntryIndex = logbookEntryIds.indexOf(action.payload);
            logbookEntryIds.splice(logbookEntryIndex, 1);
            state.logbooks = updatedLogbooks;
          }
          delete logbookEntriesCopy[action.payload];
          state.logbookEntries = logbookEntriesCopy;
        }
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
        const updatedPurchases = Functions.deepCopy(state.purchases);
        updatedPurchases[purchaseId] = purchase;
        state.purchases = updatedPurchases;
      }
    },
    deletePurchase: (state: EntitiesState, action: PayloadAction<number>) => {
      if (state.purchases) {
        const purchasesCopy = Functions.deepCopy(state.purchases);
        const purchase = purchasesCopy[action.payload];
        // ↓↓↓ Overview Group ↓↓↓ //
        if (purchase.overviewGroupId && state.overviewGroups) {
          const updatedOverviewGroups = Functions.deepCopy(
            state.overviewGroups
          );
          const { purchaseIds } =
            updatedOverviewGroups[purchase.overviewGroupId];
          if (purchaseIds) {
            const purchaseIndex = purchaseIds.indexOf(action.payload);
            purchaseIds.splice(purchaseIndex, 1);
            state.overviewGroups = updatedOverviewGroups;
          }
        }
        // ↓↓↓ Logbook Entry ↓↓↓ //
        else if (purchase.logbookEntryId && state.logbookEntries) {
          const updatedLogbookEntries = Functions.deepCopy(
            state.logbookEntries
          );
          const { purchaseIds } =
            updatedLogbookEntries[purchase.logbookEntryId];
          if (purchaseIds) {
            const purchaseIndex = purchaseIds.indexOf(action.payload);
            purchaseIds.splice(purchaseIndex, 1);
            state.logbookEntries = updatedLogbookEntries;
          }
        }
        delete purchasesCopy[action.payload];
        if (Object.keys(purchasesCopy).length === 0) {
          state.purchases = null;
        } else {
          state.purchases = purchasesCopy;
        }
      }
    },
    bulkDeletePurchases: (
      state: EntitiesState,
      action: PayloadAction<number[]>
    ) => {
      if (state.purchases) {
        const purchasesCopy = Functions.deepCopy(state.purchases);
        if (state.logbookEntries) {
          const updatedLogbookEntries = Functions.deepCopy(
            state.logbookEntries
          );
          for (const purchaseId of action.payload) {
            const { logbookEntryId } = purchasesCopy[purchaseId];
            if (logbookEntryId) {
              const { purchaseIds } = updatedLogbookEntries[logbookEntryId];
              if (purchaseIds) {
                const purchaseIndex = purchaseIds.indexOf(purchaseId);
                purchaseIds.splice(purchaseIndex, 1);
              }
            }
            delete purchasesCopy[purchaseId];
          }
          state.logbookEntries = updatedLogbookEntries;
        }

        for (const purchaseId of action.payload) {
          delete purchasesCopy[purchaseId];
        }
        if (Object.keys(purchasesCopy).length === 0) {
          state.purchases = null;
        } else {
          state.purchases = purchasesCopy;
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
        const updatedPurchases = Functions.deepCopy(state.purchases);
        const { overviewGroupId, logbookEntryId } = action.payload;
        for (const purchaseId of action.payload.purchaseIds) {
          delete updatedPurchases[purchaseId];
        }

        // ↓↓↓ Overview Groups ↓↓↓ //
        if (overviewGroupId && state.overviewGroups) {
          if (overviewGroupId) {
            const updatedOverviewGroups = Functions.deepCopy(
              state.overviewGroups
            );
            const { purchaseIds } = updatedOverviewGroups[overviewGroupId];
            if (purchaseIds) {
              purchaseIds.forEach((purchaseId: number) => {
                delete updatedPurchases[purchaseId];
              });
              updatedOverviewGroups[overviewGroupId].purchaseIds = [];
              state.overviewGroups = updatedOverviewGroups;
            }
          }
        }
        // ↓↓↓ Logbook Entries ↓↓↓ //
        else if (logbookEntryId && state.logbookEntries) {
          if (logbookEntryId) {
            const updatedLogbookEntries = Functions.deepCopy(
              state.logbookEntries
            );
            const { purchaseIds } = updatedLogbookEntries[logbookEntryId];
            if (purchaseIds) {
              purchaseIds.forEach((purchaseId: number) => {
                delete updatedPurchases[purchaseId];
              });
              updatedLogbookEntries[logbookEntryId].purchaseIds = [];
              state.logbookEntries = updatedLogbookEntries;
            }
          }
        }
        if (Object.keys(updatedPurchases).length === 0) {
          state.purchases = null;
        } else {
          state.purchases = updatedPurchases;
        }
      }
    },
  },
});

export const entitiesActions = entitiesSlice.actions;
export const entitiesReducer = entitiesSlice.reducer;
