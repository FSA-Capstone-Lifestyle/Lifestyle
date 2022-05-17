import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/singleUser.slice";
import { workoutReducer } from "./slices/singleWorkout.slice";
import { workoutsReducer } from "./slices/workouts.slice";
import { calendarReducer } from "./slices/calendarStore.slice";
import { dietsReducer } from "./slices/diets.slice";
import { dietReducer } from "./slices/singleDiet.slice";

const reducer = {
  calendar: calendarReducer,
  user: userReducer,
  workouts: workoutsReducer,
  workout: workoutReducer,
  diets: dietsReducer,
  diet: dietReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
