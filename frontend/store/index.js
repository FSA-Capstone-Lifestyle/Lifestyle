import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { authReducer } from "./slices/auth.slice";
import { userReducer } from "./slices/singleUser.slice";
import { workoutReducer } from "./slices/singleWorkout.slice";
import { workoutsReducer } from "./slices/workouts.slice";
import { dietsReducer } from "./slices/diets.slice";
import { dietReducer } from "./slices/singleDiet.slice";
import { mealsReducer } from "./slices/meals.slice";
import { mealReducer } from "./slices/singleMeal.slice";
import { exercisesReducer } from "./slices/exercises.slice";

const reducer = {
  user: userReducer,
  workouts: workoutsReducer,
  workout: workoutReducer,
  diets: dietsReducer,
  diet: dietReducer,
  meals: mealsReducer,
  meal: mealReducer,
  exercises: exercisesReducer,
  auth: authReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ logger, serializableCheck: false }),
});

export default store;
