import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
type ErrorsState = {
  user: string;
};

const initialState: ErrorsState = {
  user: "",
};

const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setUser: (state: ErrorsState, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

export const errorsActions = errorsSlice.actions;
export const errorsReducer = errorsSlice.reducer;
