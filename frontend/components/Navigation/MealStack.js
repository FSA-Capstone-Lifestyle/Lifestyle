import React from "react";
import AllMealScreen from "../Meal/AllMealScreen.js";
import SingleMealScreen from "../Meal/SingleMealScreen";
import EditMealScreen from "../Meal/EditMealScreen.js";
import CreateMealScreen from "../Meal/CreateMealScreen.js";
import { createStackNavigator } from "@react-navigation/stack";

const MealStack = createStackNavigator();

function MealStackScreen() {
  return (
    <MealStack.Navigator initialRouteName="AllMealScreen">
      <MealStack.Screen
        name="AllMealScreen"
        component={AllMealScreen}
        options={{ headerShown: false }}
      />
      <MealStack.Screen
        name="CreateMealScreen"
        component={CreateMealScreen}
        options={{
          title: " ",
        }}
      />
      <MealStack.Screen
        name="SingleMealScreen"
        component={SingleMealScreen}
        options={{
          title: " ",
        }}
      />
      <MealStack.Screen
        name="EditMealScreen"
        component={EditMealScreen}
        options={{
          title: " ",
        }}
      />
    </MealStack.Navigator>
  );
}

export default MealStackScreen;
