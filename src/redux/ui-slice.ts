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

  loadingCurrentUser: boolean;
  loadingUsers: boolean;
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

  loadingCurrentUser: false,
  loadingUsers: false,
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
    setLoadingCurrentUser: (state: UIState, action: PayloadAction<boolean>) => {
      state.loadingCurrentUser = action.payload;
    },
    setLoadingUsers: (state: UIState, action: PayloadAction<boolean>) => {
      state.loadingUsers = action.payload;
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
