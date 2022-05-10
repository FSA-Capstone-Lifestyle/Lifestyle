import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/singleUser.slice";

const reducer = {
  user: userReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
