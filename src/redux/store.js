import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import rootReducer from "./reducers";
import syncMiddleware from "../middlaware/syncMiddleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware().concat(syncMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
