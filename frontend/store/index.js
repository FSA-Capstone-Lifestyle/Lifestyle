import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/singleUser.slice";
import { workoutReducer } from "./slices/singleWorkout.slice";
import { workoutsReducer } from "./slices/workouts.slice";

const reducer = {
  user: userReducer,
  workouts: workoutsReducer,
  workout: workoutReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
