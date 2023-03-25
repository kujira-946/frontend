import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/utils/types";
import { deepCopy } from "@/utils/functions";

// ========================================================================================= //
// [ TYPES ] =============================================================================== //
// ========================================================================================= //

export type EntitiesState = {
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
    deleteOverviewGroup: (
      state: EntitiesState,
      action: PayloadAction<number>
    ) => {
      if (state.overviewGroups) {
        const overviewsCopy = deepCopy(state.overviewGroups);
        delete overviewsCopy[action.payload];
        state.overviewGroups = overviewsCopy;
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
