import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ========================================================================================= //
// [ TYPES ] =============================================================================== //
// ========================================================================================= //

export type UIState = {
  verificationCodeLoading: boolean;
  userLoading: boolean;
};

// ========================================================================================= //
// [ SLICE ] =============================================================================== //
// ========================================================================================= //

const initialState: UIState = {
  verificationCodeLoading: false,
  userLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setVerificationCodeLoading: (
      state: UIState,
      action: PayloadAction<boolean>
    ) => {
      state.verificationCodeLoading = action.payload;
    },
    setUserLoading: (state: UIState, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
