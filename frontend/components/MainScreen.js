import { View, Text } from "react-native";
import Calendar from "./Calendar";
import React from "react";

const MainScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <View>
        <Calendar />
      </View>
    </View>
  );
};

export default MainScreen;
