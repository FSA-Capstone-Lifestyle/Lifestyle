import { View, Text } from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkout } from "../../store/slices/singleWorkout.slice";

const SingleWorkoutScreen = () => {
  const dispatch = useDispatch();
  const { workout } = useSelector((state) => state.workout);

  useEffect(() => {
    dispatch(fetchWorkout());
  }, []);

  return (
    <View>
      <Text>{workout.name}</Text>
    </View>
  );
};

export default SingleWorkoutScreen;
