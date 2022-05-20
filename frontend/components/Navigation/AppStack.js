import React from "react";
import { Icon } from "native-base";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MainScreen from "../MainScreen.js";
import ProfileScreen from "../ProfileScreen.js";
import WorkoutsScreen from "../../components/Workout/WorkoutsScreen";
import SingleWorkoutScreen from "../Workout/SingleWorkoutScreen.js";
import SettingsScreen from "../SettingsScreen.js";
import EditProfileScreen from "../EditProfileScreen";
import AllMealScreen from "../Meal/AllMealScreen.js";
import SingleMealScreen from "../Meal/SingleMealScreen";
import EditMealScreen from "../Meal/EditMealScreen.js";
import CreateMealScreen from "../Meal/CreateMealScreen.js";
import CustomDrawer from "../CustomDrawer.js";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import SingleDietPlanScreen from "../SingleDietPlanScreen.js";

const ProfileStack = createStackNavigator();
const WorkoutStack = createStackNavigator();
const MealStack = createStackNavigator();

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

function WorkoutStackScreen() {
  return (
    <WorkoutStack.Navigator initialRouteName="WorkoutsScreen">
      <WorkoutStack.Screen
        name="WorkoutsScreen"
        component={WorkoutsScreen}
        options={{ headerShown: false }}
      />
      <WorkoutStack.Screen
        name="SingleWorkoutScreen"
        component={SingleWorkoutScreen}
      />
    </WorkoutStack.Navigator>
  );
}
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

const Drawer = createDrawerNavigator();
const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="MainScreen"
      screenOptions={{
        drawerActiveBackgroundColor: "#6D8B74",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#444",
        drawerLabelStyle: { marginLeft: -25, fontSize: 15 },
      }}
    >
      <Drawer.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => {
            return (
              <Icon
                color={color}
                size="6"
                as={<MaterialCommunityIcons name={"home"} />}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => {
            return (
              <Icon
                color={color}
                size="6"
                as={<MaterialCommunityIcons name={"account"} />}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="My Workouts"
        component={WorkoutStackScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => {
            return (
              <Icon
                color={color}
                size="6"
                as={<FontAwesome5 name="running" size={6} />}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Meals"
        component={MealStackScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => {
            return (
              <Icon
                color={color}
                size="5"
                as={<FontAwesome5 name="carrot" size={5} />}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => {
            return (
              <Icon
                color={color}
                size="5"
                as={<Ionicons name="settings" size={5} />}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
