import * as Saga from "redux-saga/effects";
import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";

import * as Redux from "@/redux";
import { authSaga } from "./sagas/auth.saga";
import { usersSaga } from "./sagas/users.saga";
import { overviewsSaga } from "./sagas/overviews.saga";

export type GlobalState = {
  ui: Redux.UIState;
  entities: Redux.EntitiesState;
  errors: Redux.ErrorsState;
};

const rootReducer = {
  ui: Redux.uiReducer,
  entities: Redux.entitiesReducer,
  errors: Redux.errorsReducer,
};

function* rootSaga() {
  yield Saga.all([authSaga(), usersSaga(), overviewsSaga()]);
}
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Example inferred type: { posts: PostsState, comments: CommentsState, users: UsersState }
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
