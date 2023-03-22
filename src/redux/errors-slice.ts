import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ========================================================================================= //
// [ TYPES ] =============================================================================== //
// ========================================================================================= //

export type ErrorsState = {
  auth: string;
  purchases: string;
  overviews: string;
  overviewGroups: string;
  logbooks: string;
  logbookEntries: string;
};

// ========================================================================================= //
// [ SLICE ] =============================================================================== //
// ========================================================================================= //

const initialState: ErrorsState = {
  auth: "",
  purchases: "",
  overviews: "",
  overviewGroups: "",
  logbooks: "",
  logbookEntries: "",
};

const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setAuth: (state: ErrorsState, action: PayloadAction<string>) => {
      state.auth = action.payload;
    },
    setPurchases: (state: ErrorsState, action: PayloadAction<string>) => {
      state.purchases = action.payload;
    },
    setOverviews: (state: ErrorsState, action: PayloadAction<string>) => {
      state.overviews = action.payload;
    },
    setOverviewGroups: (state: ErrorsState, action: PayloadAction<string>) => {
      state.overviewGroups = action.payload;
    },
    setLogbooks: (state: ErrorsState, action: PayloadAction<string>) => {
      state.logbooks = action.payload;
    },
    setLogbookEntries: (state: ErrorsState, action: PayloadAction<string>) => {
      state.logbookEntries = action.payload;
    },
  },
});

export const errorsActions = errorsSlice.actions;
export const errorsReducer = errorsSlice.reducer;
