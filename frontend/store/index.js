import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { authReducer } from "./slices/auth.slice";
import { userReducer } from "./slices/singleUser.slice";
import { workoutReducer } from "./slices/singleWorkout.slice";
import { workoutsReducer } from "./slices/workouts.slice";
import { calendarReducer } from "./slices/calendarStore.slice";

const reducer = {
  calendar: calendarReducer,
  user: userReducer,
  workouts: workoutsReducer,
  workout: workoutReducer,
  auth: authReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(logger),
});

export default store;
