import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  userLoading: boolean;
};

const initialState: UIState = {
  userLoading: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setUserLoading: (state: UIState, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
