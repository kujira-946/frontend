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

  loadingUser: boolean;
  loadingOverviews: boolean;
  loadingOverviewGroups: boolean;
  loadingLogbooks: boolean;
  loadingLogbookEntries: boolean;
  loadingPurchases: boolean;
};

// ========================================================================================= //
// [ SLICE ] =============================================================================== //
// ========================================================================================= //

const initialState: UIState = {
  notification: Constants.initialUINotification,
  tempUserId: null,
  loginForThirtyDays: false,

  loadingUser: false,
  loadingOverviews: false,
  loadingOverviewGroups: false,
  loadingLogbooks: false,
  loadingLogbookEntries: false,
  loadingPurchases: false,
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
    setLoadingUser: (state: UIState, action: PayloadAction<boolean>) => {
      state.loadingUser = action.payload;
    },
    setLoadingOverviews: (state: UIState, action: PayloadAction<boolean>) => {
      state.loadingOverviews = action.payload;
    },
    setLoadingOverviewGroups: (
      state: UIState,
      action: PayloadAction<boolean>
    ) => {
      state.loadingOverviewGroups = action.payload;
    },
    setLoadingLogbooks: (state: UIState, action: PayloadAction<boolean>) => {
      state.loadingLogbooks = action.payload;
    },
    setLoadingLogbookEntries: (
      state: UIState,
      action: PayloadAction<boolean>
    ) => {
      state.loadingLogbookEntries = action.payload;
    },
    setLoadingPurchases: (state: UIState, action: PayloadAction<boolean>) => {
      state.loadingPurchases = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
