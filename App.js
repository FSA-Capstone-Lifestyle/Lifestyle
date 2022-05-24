// import 'react-native-gesture-handler';
import "react-native-gesture-handler";
// Import React and Component
import React from "react";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider, Text, Box } from "native-base";
import AuthStack from "./frontend/components/Navigation/AuthStack";
import AppStack from "./frontend/components/Navigation/AppStack";
import SplashScreen from "./frontend/components/SplashScreen";
import store from "./frontend/store";
import { Provider } from "react-redux";
// Import Screens
const Stack = createStackNavigator();
const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="AuthStack">
            {/* SplashScreen which will come once for 5 Seconds */}
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              // Hiding header for Splash Screen
              options={{ headerShown: false }}
            />
            {/* Auth Navigator: Include Login and Signup */}
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{ headerShown: false }}
            />
            {/* Navigation Drawer as a landing page */}
            <Stack.Screen
              name="AppStack"
              component={AppStack}
              // Hiding header for Navigation Drawer
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
