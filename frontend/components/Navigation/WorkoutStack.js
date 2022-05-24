import React from "react";
import WorkoutsScreen from "../Workout/WorkoutsScreen";
import SingleWorkoutScreen from "../Workout/SingleWorkoutScreen";
import CreateWorkoutScreen from "../Workout/CreateWorkoutScreen";
import { createStackNavigator } from "@react-navigation/stack";

const WorkoutStack = createStackNavigator();

function WorkoutStackScreen() {
  return (
    <WorkoutStack.Navigator initialRouteName="WorkoutsScreen">
      <WorkoutStack.Screen
        name="All Workouts"
        component={WorkoutsScreen}
        options={{ headerShown: false }}
      />
      <WorkoutStack.Screen
        name="Create Workout"
        component={CreateWorkoutScreen}
        options={{
          title: " ",
        }}
      />
      <WorkoutStack.Screen
        name="Single Workout"
        component={SingleWorkoutScreen}
      />
    </WorkoutStack.Navigator>
  );
}

export default WorkoutStackScreen;
