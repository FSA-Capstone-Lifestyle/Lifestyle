import { View, Text } from "react-native";
import React from "react";
import { Calendar } from "./Calendar";

const MainScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <Calendar />
    </View>
  );
};

export default MainScreen;
