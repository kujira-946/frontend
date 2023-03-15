import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ========================================================================================= //
// [ TYPES ] =============================================================================== //
// ========================================================================================= //

export type UIState = {
  notification: string;
  verificationCodeExists: boolean;
  userLoading: boolean;
};

// ========================================================================================= //
// [ SLICE ] =============================================================================== //
// ========================================================================================= //

const initialState: UIState = {
  notification: "",
  verificationCodeExists: false,
  userLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNotification: (state: UIState, action: PayloadAction<string>) => {
      state.notification = action.payload;
    },
    setVerificationCodeExists: (
      state: UIState,
      action: PayloadAction<boolean>
    ) => {
      state.verificationCodeExists = action.payload;
    },
    setUserLoading: (state: UIState, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
