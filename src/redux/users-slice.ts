import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { Theme } from "./ui-slice";

// ========================================================================================= //
// [ TYPES ] =============================================================================== //
// ========================================================================================= //

type Dates = {
  createdAt: Date;
  updatedAt: Date;
};

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
  overview: Overview[];
  logbooks: Logbook[];
} & Dates;

type Category = "need" | "planned" | "impulse" | "regret";
type Purchase = {
  id: number;
  placement: number;
  category?: Category;
  description?: string;
  cost?: number;
  overviewGroup: OverviewGroup;
  logbookEntry: LogbookEntry;
} & Dates;

type Overview = {
  id: number;
  income: number;
  savings: number;
  groups: OverviewGroup[];
  ownerId: number;
} & Dates;

type OverviewGroup = {
  id: number;
  name: string;
  totalCost: number;
  purchases: Purchase[];
  overviewId: number;
} & Dates;

type Logbook = {
  id: number;
  name: string;
  entries: LogbookEntry[];
  ownerId: number;
} & Dates;

type LogbookEntry = {
  id: number;
  date: Date;
  spent: number;
  budget?: number;
  purchases: Purchase[];
  logbookId: number;
} & Dates;

// ========================================================================================= //
// [ SLICE ] =============================================================================== //
// ========================================================================================= //

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
