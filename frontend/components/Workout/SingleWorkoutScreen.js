import {
  View,
  Box,
  Heading,
  VStack,
  Divider,
  HStack,
  Spinner,
} from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkout } from "../../store/slices/singleWorkout.slice";

const SingleWorkoutScreen = (props) => {
  const dispatch = useDispatch();
  const { workout } = useSelector((state) => state.workout);

  useEffect(() => {
    dispatch(fetchWorkout(props.route.params.id));
  }, []);

  return (
    <View alignItems="center" m={20}>
      <Heading>{workout.name}</Heading>
      <Box border="1" borderRadius="md">
        {!workout.exercises ? (
          <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              Loading
            </Heading>
          </HStack>
        ) : (
          workout.exercises.map((exercise) => (
            <VStack key={exercise.id} space="4" divider={<Divider />}>
              <Box px="4">{exercise.name}</Box>
            </VStack>
          ))
        )}
      </Box>
    </View>
  );
};

export default SingleWorkoutScreen;
