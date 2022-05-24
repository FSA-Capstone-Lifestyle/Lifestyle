import { View, Text } from "native-base";
import Calendar from "./Calendar";
import React from "react";

const MainScreen = ({ navigation }) => {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text>Home</Text>
      <View>
        <Calendar navigation={navigation} />
      </View>
    </View>
  );
};

export default MainScreen;
