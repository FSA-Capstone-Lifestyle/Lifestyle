import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const DietPlanScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello diet plan</Text>
    </View>
  );
};

export default DietPlanScreen;
