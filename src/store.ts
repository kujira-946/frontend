import { configureStore } from "@reduxjs/toolkit";

import * as Redux from "@/redux";

export const store = configureStore({
  reducer: { ui: Redux.uiReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Example inferred type: { posts: PostsState, comments: CommentsState, users: UsersState }
export type AppDispatch = typeof store.dispatch;
