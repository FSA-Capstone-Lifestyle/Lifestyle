import { View, Text } from "react-native";
import Calendar from "./Calendar";
import React from "react";

const MainScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
      <Text style={{fontSize: 27,
    height: 35,fontWeight:'bold',color:'#44bd60',marginTop:10}}>Welcome to LifeStyle</Text>
      <Text style={{fontSize: 15,
    color: "gray",
    height: 30,
    marginTop: 10,}}>Keep Track of Your Work !</Text>
      <View >
        <Calendar navigation={navigation} />
      </View>
    </View>
  );
};

export default MainScreen;
