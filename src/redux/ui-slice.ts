import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Constants from "@/utils/constants";
import * as Types from "@/utils/types";

export type UIState = {
  notification: Types.UINotification;
  verificationCodeSent: boolean;
  loginForThirtyDays: boolean;

  reviewsNeedPurchases: Types.Purchase[];
  reviewsPlannedPurchases: Types.Purchase[];
  reviewsImpulsePurchases: Types.Purchase[];

  loadingUsers: boolean;
  loadingOverviews: boolean;
  loadingOverviewGroups: boolean;
  loadingLogbooks: boolean;
  loadingLogbookEntries: boolean;
  loadingPurchases: boolean;
};

const initialState: UIState = {
  notification: Constants.initialUINotification,
  verificationCodeSent: false,
  loginForThirtyDays: false,

  reviewsNeedPurchases: [],
  reviewsPlannedPurchases: [],
  reviewsImpulsePurchases: [],

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
    setNotification: (
      state: UIState,
      action: PayloadAction<Types.UINotification>
    ) => {
      state.notification = action.payload;
    },
    setVerificationCodeSent: (
      state: UIState,
      action: PayloadAction<boolean>
    ) => {
      state.verificationCodeSent = action.payload;
    },
    setLoginForThirtyDays: (state: UIState, action: PayloadAction<boolean>) => {
      state.loginForThirtyDays = action.payload;
    },

    // ========================================================================================= //
    // [ REVIEW PAGE ] ========================================================================= //
    // ========================================================================================= //

    setReviewsNeedPurchases: (
      state: UIState,
      action: PayloadAction<Types.Purchase[]>
    ) => {
      state.reviewsNeedPurchases = action.payload;
    },
    setReviewsPlannedPurchases: (
      state: UIState,
      action: PayloadAction<Types.Purchase[]>
    ) => {
      state.reviewsPlannedPurchases = action.payload;
    },
    setReviewsImpulsePurchases: (
      state: UIState,
      action: PayloadAction<Types.Purchase[]>
    ) => {
      state.reviewsImpulsePurchases = action.payload;
    },

    // ========================================================================================= //
    // [ LOADING STATES ] ====================================================================== //
    // ========================================================================================= //

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
