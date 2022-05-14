import { View, Text } from "react-native";
import Calendar from "./Calendar";
import { fetchWorkouts } from "../store/slices/workouts.slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MainScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, []);

  const { workouts } = useSelector((state) => state.workouts);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <View>
        <Calendar />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {workouts.map((workout,index) => (
          <Text key={index}>Workout: {workout.name}</Text>
        ))}
      </View>
    </View>
  );
};

export default MainScreen;
