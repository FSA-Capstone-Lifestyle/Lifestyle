import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkouts } from "../store/slices/workouts.slice";

const WorkoutsScreen = () => {
  const dispatch = useDispatch();
  const { workouts } = useSelector((state) => state.workouts);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [workouts]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>List of:</Text>
      {workouts.map((workout) => (
        <div id={workout.id}>
          <Text>Workout: {workout.name}</Text>
        </div>
      ))}
    </View>
  );
};

export default WorkoutsScreen;
