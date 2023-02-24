import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

type UIState = {
  theme: Theme;
};

const initialState: UIState = {
  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state: UIState, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
