import { View, Text } from "native-base";
import Calendar from "./Calendar";
import React from "react";

const MainScreen = ({ navigation }) => {
  return (
    <View flex={1} justifyContent="flex-start" alignItems="center">
      <Text
        fontSize={27}
        height={35}
        fontWeight="bold"
        color="green.600"
        marginTop={10}
      >
        Welcome to LifeStyle
      </Text>
      <Text fontSize={15} color="gray.800" height={30} marginTop={10}>
        Let's workout and stay healthy. It's a Lifestyle!
      </Text>
      <View>
        <Calendar navigation={navigation} />
      </View>
    </View>
  );
};

export default MainScreen;
