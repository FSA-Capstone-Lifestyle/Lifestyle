import React from "react";
import ProfileScreen from "../ProfileScreen.js";
import EditProfileScreen from "../EditProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";

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
        options={{
          title: " ",
        }}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;