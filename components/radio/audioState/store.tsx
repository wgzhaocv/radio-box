"use client";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import radioReducer from "./audioSlice";
export const store = configureStore({
  reducer: {
    radioReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RadioStoreState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const AudiosProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
