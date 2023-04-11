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
        const currentUserCopy = Functions.deepCopy(state.currentUser);
        const relationalIds = currentUserCopy[relationalField];
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
        if (state.users[userId].overviewIds) {
          updatedUsers[userId]["overviewIds"] = state.users[userId].overviewIds;
        }
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
    updateOverview: (
      state: EntitiesState,
      action: PayloadAction<{ overviewId: number; overview: Types.Overview }>
    ) => {
      if (state.overviews) {
        const { overviewId, overview } = action.payload;
        const updatedOverviews = Functions.deepCopy(state.overviews);
        updatedOverviews[overviewId] = overview;
        if (state.overviews[overviewId].overviewGroupIds) {
          updatedOverviews[overviewId]["overviewGroupIds"] =
            state.overviews[overviewId].overviewGroupIds;
        }
        state.overviews = updatedOverviews;
      }
    },
    updateOverviewRelations: (
      state: EntitiesState,
      action: PayloadAction<{ overviewId: number; overviewGroupIds: number[] }>
    ) => {
      if (state.overviews) {
        const { overviewId, overviewGroupIds } = action.payload;
        const overviewsCopy = Functions.deepCopy(state.overviews);
        const currentOverview = overviewsCopy[overviewId];
        const relationalIds = currentOverview.overviewGroupIds;

        if (relationalIds) {
          currentOverview.overviewGroupIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray([
              ...relationalIds,
              ...overviewGroupIds,
            ])
          );
        } else {
          currentOverview.overviewGroupIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray(overviewGroupIds)
          );
        }
        state.overviews = overviewsCopy;
      }
    },
    deleteOverview: (state: EntitiesState, action: PayloadAction<number>) => {
      if (state.overviews) {
        const {} = action.payload;
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
          currentLogbook.logbookEntryIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray([
              ...relationalIds,
              ...logbookEntryIds,
            ])
          );
        } else {
          currentLogbook.logbookEntryIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray(logbookEntryIds)
          );
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
      action: PayloadAction<{ logbookEntryId: number; purchaseIds: number[] }>
    ) => {
      if (state.logbookEntries) {
        const { logbookEntryId, purchaseIds } = action.payload;
        const logbookEntriesCopy = Functions.deepCopy(state.logbookEntries);
        const currentLogbookEntry = logbookEntriesCopy[logbookEntryId];
        const relationalIds = currentLogbookEntry.purchaseIds;
        if (relationalIds) {
          currentLogbookEntry.purchaseIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray([
              ...relationalIds,
              ...purchaseIds,
            ])
          );
        } else {
          currentLogbookEntry.purchaseIds = Functions.sortArray(
            Functions.removeDuplicatesFromArray(purchaseIds)
          );
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
        if (purchase.overviewGroupId && state.overviewGroups) {
          const updatedOverviewGroups = Functions.deepCopy(
            state.overviewGroups
          );
          if (updatedOverviewGroups[purchase.overviewGroupId].purchaseIds) {
            const purchaseIndex = updatedOverviewGroups[
              purchase.overviewGroupId
            ].purchaseIds.indexOf(action.payload);
            updatedOverviewGroups[purchase.overviewGroupId].purchaseIds.splice(
              purchaseIndex,
              1
            );
            state.overviewGroups = updatedOverviewGroups;
          }
        } else if (purchase.logbookEntryId && state.logbookEntries) {
          const updatedLogbookEntries = Functions.deepCopy(
            state.logbookEntries
          );
          if (updatedLogbookEntries[purchase.logbookEntryId].purchaseIds) {
            const purchaseIndex = updatedLogbookEntries[
              purchase.logbookEntryId
            ].purchaseIds.indexOf(action.payload);
            updatedLogbookEntries[purchase.logbookEntryId].purchaseIds.splice(
              purchaseIndex,
              1
            );
            state.logbookEntries = updatedLogbookEntries;
          }
        }
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
    deleteAssociatedPurchases: (
      state: EntitiesState,
      action: PayloadAction<{
        overviewGroupId?: number;
        logbookEntryId?: number;
      }>
    ) => {
      if (state.purchases) {
        const updatedPurchases = Functions.deepCopy(state.purchases);

        if (state.overviewGroups) {
          const { overviewGroupId } = action.payload;
          if (overviewGroupId) {
            const updatedOverviewGroups = Functions.deepCopy(
              state.overviewGroups
            );
            if (updatedOverviewGroups[overviewGroupId].purchaseIds) {
              updatedOverviewGroups[overviewGroupId].purchaseIds.forEach(
                (purchaseId: number) => {
                  delete updatedPurchases[purchaseId];
                }
              );
              updatedOverviewGroups[overviewGroupId].purchaseIds = [];
              state.overviewGroups = updatedOverviewGroups;
            }
          }
        } else if (state.logbookEntries) {
          const { logbookEntryId } = action.payload;
          if (logbookEntryId) {
            const updatedLogbookEntries = Functions.deepCopy(
              state.logbookEntries
            );
            if (updatedLogbookEntries[logbookEntryId].purchaseIds) {
              updatedLogbookEntries[logbookEntryId].purchaseIds.forEach(
                (purchaseId: number) => {
                  delete updatedPurchases[purchaseId];
                }
              );
              state.logbookEntries = updatedLogbookEntries;
            }
          }
        }
      }
    },
  },
});

export const entitiesActions = entitiesSlice.actions;
export const entitiesReducer = entitiesSlice.reducer;
