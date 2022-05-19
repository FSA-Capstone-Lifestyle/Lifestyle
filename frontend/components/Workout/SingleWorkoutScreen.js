import { View, Box, Heading, VStack, Divider, Text } from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkout } from "../../store/slices/singleWorkout.slice";

const SingleWorkoutScreen = (props) => {
  const dispatch = useDispatch();
  const { workout, isLoading } = useSelector((state) => state.workout);

  useEffect(() => {
    dispatch(fetchWorkout(props.route.params.id));
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View alignItems="center" m={20}>
      <Heading>{workout.name}</Heading>
      {workout.exercises.map((exercise) => (
        <Box border="1" borderRadius="md">
          <VStack space="4" divider={<Divider />}>
            <Box px="4">{exercise.name}</Box>
          </VStack>
        </Box>
      ))}
    </View>
  );
};

export default SingleWorkoutScreen;
