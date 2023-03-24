import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/utils/types";

// ========================================================================================= //
// [ TYPES ] =============================================================================== //
// ========================================================================================= //

export type EntitiesState = {
  user: Types.User | null;
  overviews: Types.Overview | null;
  overviewGroups: Types.OverviewGroup | null;
  logbooks: Types.Logbook | null;
  logbookEntries: Types.LogbookEntry | null;
  purchases: Types.Purchase | null;
};

// ========================================================================================= //
// [ SLICE ] =============================================================================== //
// ========================================================================================= //

const initialState: EntitiesState = {
  user: null,
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
    setUser: (
      state: EntitiesState,
      action: PayloadAction<Types.User | null>
    ) => {
      state.user = action.payload;
    },
    updateUser: (state: EntitiesState, action: PayloadAction<Types.User>) => {
      state.user = { ...state.user, ...action.payload };
    },
    // deleteUser: (state: EntitiesState, action: PayloadAction<number> => {
    //   delete state.user[action.payload];
    // })

    setOverviews: (
      state: EntitiesState,
      action: PayloadAction<Types.Overview | null>
    ) => {
      state.overviews = action.payload;
    },
    updateOverviews: (
      state: EntitiesState,
      action: PayloadAction<Types.Overview>
    ) => {
      state.overviews = { ...state.overviews, ...action.payload };
    },

    setOverviewGroups: (
      state: EntitiesState,
      action: PayloadAction<Types.OverviewGroup | null>
    ) => {
      state.overviewGroups = action.payload;
    },
    updateOverviewGroups: (
      state: EntitiesState,
      action: PayloadAction<Types.OverviewGroup>
    ) => {
      state.overviewGroups = { ...state.overviewGroups, ...action.payload };
    },

    setLogbooks: (
      state: EntitiesState,
      action: PayloadAction<Types.Logbook | null>
    ) => {
      state.logbooks = action.payload;
    },
    updateLogbooks: (
      state: EntitiesState,
      action: PayloadAction<Types.Logbook>
    ) => {
      state.logbooks = { ...state.logbooks, ...action.payload };
    },

    setLogbookEntries: (
      state: EntitiesState,
      action: PayloadAction<Types.LogbookEntry | null>
    ) => {
      state.logbookEntries = action.payload;
    },
    updateLogbookEntries: (
      state: EntitiesState,
      action: PayloadAction<Types.LogbookEntry>
    ) => {
      state.logbookEntries = { ...state.logbookEntries, ...action.payload };
    },

    setPurchases: (
      state: EntitiesState,
      action: PayloadAction<Types.Purchase | null>
    ) => {
      state.purchases = action.payload;
    },
    updatePurchases: (
      state: EntitiesState,
      action: PayloadAction<Types.Purchase>
    ) => {
      state.purchases = { ...state.purchases, ...action.payload };
    },
  },
});

export const entitiesActions = entitiesSlice.actions;
export const entitiesReducer = entitiesSlice.reducer;
