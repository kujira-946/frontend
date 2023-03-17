import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as Types from "@/utils/types";

// ========================================================================================= //
// [ TYPES ] =============================================================================== //
// ========================================================================================= //

export type EntitiesState = {
  user: Types.User | null;
};

// ========================================================================================= //
// [ SLICE ] =============================================================================== //
// ========================================================================================= //

const initialState: EntitiesState = {
  user: null,
};

const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    setUser: (
      state: EntitiesState,
      action: PayloadAction<Types.User | null>
    ) => {
      state.user = action.payload;
    },
  },
});

export const entitiesActions = entitiesSlice.actions;
export const entitiesReducer = entitiesSlice.reducer;
