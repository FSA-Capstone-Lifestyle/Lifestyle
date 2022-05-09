import { View, Text } from 'react-native'
import React from 'react'
import {Icon} from 'native-base'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MainScreen from '../MainScreen.js';
import ProfileScreen from '../ProfileScreen.js';
import WorkoutsScreen from '../WorkoutsScreen.js';
import SettingsScreen from '../SettingsScreen.js';
import CustomDrawer from '../CustomDrawer.js';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



const Drawer = createDrawerNavigator();
const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer{...props}/>} initialRouteName="MainScreen" screenOptions={

      { drawerActiveBackgroundColor : '#6D8B74',
        drawerActiveTintColor : '#fff',
        drawerInactiveTintColor : '#444',
        drawerLabelStyle: {marginLeft:-25,fontSize : 15}}}>
      <Drawer.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false,
        drawerIcon: ({color}) => {
          return (
            <Icon
            color={color}
          size="6"
          as={<MaterialCommunityIcons name={"home"} />}
        />
          )
        } }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false,
          drawerIcon: ({color}) => {
            return (
              <Icon
              color={color}
            size="6"
            as={<MaterialCommunityIcons name={"account"} />}
          />
            )
          } }}
      />
      <Drawer.Screen
        name="My Workouts"
        component={WorkoutsScreen}
        options={{ headerShown: false,
          drawerIcon: ({color}) => {
            return (
              <Icon
              color={color}
            size="6"
            as={<FontAwesome5 name="running" size={6}  />}
          />
            )
          } }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false,
          drawerIcon: ({color}) => {
            return (
              <Icon
              color={color}
            size="5"
            as={<Ionicons name="settings" size={5} />}
          />
            )
          } }}
      />

    </Drawer.Navigator>
  );
}

export default AppStack
