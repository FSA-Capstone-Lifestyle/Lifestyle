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
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Import Screens


const App = () => {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
      <NavigationContainer>
        <AppStack/>
        {/* <AuthStack/> */}
      </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

export default App;
