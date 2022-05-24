import React from "react";
import { Icon } from "native-base";
import { Image} from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MainScreen from "../MainScreen.js";
import SettingsScreen from "../SettingsScreen.js";
import CustomDrawer from "../CustomDrawer.js";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ProfileStackScreen from "./ProfileStack.js";
import WorkoutStackScreen from "./WorkoutStack";
import MealStackScreen from "./MealStack.js";

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
        name="Home"
        component={MainScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Image style={{ width: 100, height: 50 }} source={require("../../../assets/logo.png")} />
          ),
          headerTitleAlign:'center',
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
        name="Workouts"
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
      {/* <Drawer.Screen
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
      /> */}
    </Drawer.Navigator>
  );
};

export default AppStack;
