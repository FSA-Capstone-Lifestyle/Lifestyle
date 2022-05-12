import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkouts } from "../store/slices/workouts.slice";

const WorkoutsScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, []);

  const { workouts } = useSelector((state) => state.workouts);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {workouts.map((workout) => (
        <Text>Workout: {workout.name}</Text>
      ))}
    </View>
  );
};

export default WorkoutsScreen;
