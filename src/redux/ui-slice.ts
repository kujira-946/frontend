import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Constants from "@/utils/constants";
import { UINotification } from "@/utils/types";

// ========================================================================================= //
// [ TYPES ] =============================================================================== //
// ========================================================================================= //

export type UIState = {
  notification: UINotification;
  tempUserId: number | null;
  loginForThirtyDays: boolean;

  fetchingUser: boolean;
  fetchingOverviews: boolean;
  fetchingOverviewGroups: boolean;
  fetchingLogbooks: boolean;
  fetchingLogbookEntries: boolean;
  fetchingPurchases: boolean;
};

// ========================================================================================= //
// [ SLICE ] =============================================================================== //
// ========================================================================================= //

const initialState: UIState = {
  notification: Constants.initialUINotification,
  tempUserId: null,
  loginForThirtyDays: false,

  fetchingUser: false,
  fetchingOverviews: false,
  fetchingOverviewGroups: false,
  fetchingLogbooks: false,
  fetchingLogbookEntries: false,
  fetchingPurchases: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    resetState: (state: UIState) => {
      state = initialState;
    },
    setNotification: (
      state: UIState,
      action: PayloadAction<UINotification>
    ) => {
      state.notification = action.payload;
    },
    setTempUserId: (state: UIState, action: PayloadAction<number | null>) => {
      state.tempUserId = action.payload;
    },
    setLoginForThirtyDays: (state: UIState, action: PayloadAction<boolean>) => {
      state.loginForThirtyDays = action.payload;
    },
    setFetchingUser: (state: UIState, action: PayloadAction<boolean>) => {
      state.fetchingUser = action.payload;
    },
    setFetchingOverviews: (state: UIState, action: PayloadAction<boolean>) => {
      state.fetchingOverviews = action.payload;
    },
    setFetchingOverviewGroups: (
      state: UIState,
      action: PayloadAction<boolean>
    ) => {
      state.fetchingOverviewGroups = action.payload;
    },
    setFetchingLogbooks: (state: UIState, action: PayloadAction<boolean>) => {
      state.fetchingLogbooks = action.payload;
    },
    setFetchingLogbookEntries: (
      state: UIState,
      action: PayloadAction<boolean>
    ) => {
      state.fetchingLogbookEntries = action.payload;
    },
    setFetchingPurchases: (state: UIState, action: PayloadAction<boolean>) => {
      state.fetchingPurchases = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
