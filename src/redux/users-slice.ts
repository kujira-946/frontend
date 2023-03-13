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

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const usersActions = userSlice.actions;
export const usersReducer = userSlice.reducer;
