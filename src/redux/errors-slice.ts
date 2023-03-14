import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialAuthErrorsState } from "@/utils/constants.auth";

// ========================================================================================= //
// [ TYPES ] =============================================================================== //
// ========================================================================================= //

export type AuthErrors = {
  emailCheck?: string;
  usernameCheck?: string;
  general?: string;
};

export type ErrorsState = {
  auth: AuthErrors;
  users: string;
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
  auth: initialAuthErrorsState,
  users: "",
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
    setAuth: (state: ErrorsState, action: PayloadAction<AuthErrors>) => {
      state.auth = action.payload;
    },
    setUsers: (state: ErrorsState, action: PayloadAction<string>) => {
      state.users = action.payload;
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
