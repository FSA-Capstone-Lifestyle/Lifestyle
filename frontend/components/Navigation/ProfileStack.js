import React from "react";
import ProfileScreen from "../ProfileScreen.js";
import EditProfileScreen from "../EditProfileScreen";
import UserDietPlanScreen from "../UserDietPlanScreen";
import SingleMealScreen from "../Meal/SingleMealScreen.js";
import { createStackNavigator } from "@react-navigation/stack";
import UserWorkoutPlanScreen from "../Workout/UserWorkoutPlan.js";
import SingleWorkoutScreen from "../Workout/SingleWorkoutScreen.js";

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator initialRouteName="ProfileScreen">
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "" }}
      />
      <ProfileStack.Screen
        name="User Workout"
        component={UserWorkoutPlanScreen}
        options={{ title: "" }}
      />
      <ProfileStack.Screen
        name="SingleWorkoutScreen"
        component={SingleWorkoutScreen}
        options={{ title: "" }}
      />
      <ProfileStack.Screen
        name="UserDietPlanScreen"
        component={UserDietPlanScreen}
        options={{ title: "" }}
      />
      <ProfileStack.Screen
        name="SingleMealScreen"
        component={SingleMealScreen}
        options={{ title: "" }}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;
