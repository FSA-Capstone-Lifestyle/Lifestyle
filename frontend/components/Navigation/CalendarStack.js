import React from "react";
import Calendar from "../Calendar.js";
import SingleWorkoutScreen from "../Workout/SingleWorkoutScreen";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../MainScreen.js";

const CalendarStack = createStackNavigator();

function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator initialRouteName="Calendar">
      <CalendarStack.Screen
        name="Calendar"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <CalendarStack.Screen
        name="Single Workout"
        component={SingleWorkoutScreen}
        options={{ title: "" }}
      />
    </CalendarStack.Navigator>
  );
}

export default CalendarStackScreen;
