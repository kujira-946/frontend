import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { Theme } from "./ui-slice";

type User = {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  currency: string;
  mobileNumber?: string;
  theme: Theme;
  emailVerified: boolean;
  loggedIn: boolean;
  signedVerificationCode?: string;
  createdAt: Date;
  updatedAt: Date;
};

type EntitiesState = {
  user: User | null;
};

const initialState: EntitiesState = {
  user: null,
};

const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    setUser: (state: EntitiesState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const entitiesActions = entitiesSlice.actions;
export const entitiesReducer = entitiesSlice.reducer;
