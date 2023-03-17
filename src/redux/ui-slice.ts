import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Constants from "@/utils/constants.globals";
import { UINotification } from "@/utils/types";

// ========================================================================================= //
// [ TYPES ] =============================================================================== //
// ========================================================================================= //

export type UIState = {
  notification: UINotification;
  verificationCodeSent: boolean;
  tempUserId: number | null;
  userLoading: boolean;
};

// ========================================================================================= //
// [ SLICE ] =============================================================================== //
// ========================================================================================= //

const initialState: UIState = {
  notification: Constants.initialUINotification,
  verificationCodeSent: false,
  tempUserId: null,
  userLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNotification: (
      state: UIState,
      action: PayloadAction<UINotification>
    ) => {
      state.notification = action.payload;
    },
    setVerificationCodeSent: (
      state: UIState,
      action: PayloadAction<boolean>
    ) => {
      state.verificationCodeSent = action.payload;
    },
    setRegister: (
      state: UIState,
      action: PayloadAction<[boolean, number | null]>
    ) => {
      state.verificationCodeSent = action.payload[0];
      state.tempUserId = action.payload[1];
    },
    setUserLoading: (state: UIState, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
