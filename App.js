// import 'react-native-gesture-handler';
import 'react-native-gesture-handler'
// Import React and Component
import React from "react";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider, Text, Box } from "native-base";
import AuthStack from "./frontend/components/Navigation/AuthStack";
import AppStack from './frontend/components/Navigation/AppStack'
// Import Screens







const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppStack/>
        {/* <AuthStack/> */}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
