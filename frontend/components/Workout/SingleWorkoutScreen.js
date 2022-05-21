import {
  Input,
  IconButton,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  Divider,
} from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkout } from "../../store/slices/singleWorkout.slice";
import {
  createExercise,
  fetchExercises,
  removeExercise,
} from "../../store/slices/exercises.slice";

const SingleWorkoutScreen = (props) => {
  const dispatch = useDispatch();
  const { exercises } = useSelector((state) => state.exercises);
  const { workout } = useSelector((state) => state.workout);
  const [input, setInput] = useState({
    name: "",
    workoutId: "",
  });

  useEffect(() => {
    dispatch(fetchWorkout(props.route.params.id));
  }, []);

  useEffect(() => {
    dispatch(fetchExercises(props.route.params.id));
  }, []);

  useEffect(() => {
    setInput((prevState) => ({
      ...prevState,
      workoutId: props.route.params.id,
    }));
  }, []);

  const handlePress = (data) => (e) => {
    e.preventDefault();
    dispatch(createExercise(data));
  };

  return (
    <Center w="100%">
      <Box maxW="300" w="100%" m={4}>
        <Heading mb="2" size="md" alignSelf="center">
          {workout.name}
        </Heading>

        <Divider
          thickness={2}
          maxWidth="325"
          alignSelf="center"
          marginTop={5}
          marginBottom={5}
        />

        <VStack space={4}>
          <HStack space={2}>
            <Input
              flex={1}
              placeholder="Add Exercise"
              onChangeText={(e) =>
                setInput((prevState) => ({ ...prevState, name: e }))
              }
            />
            <IconButton
              borderRadius="sm"
              variant="solid"
              icon={
                <Icon as={Feather} name="plus" size="sm" color="warmGray.50" />
              }
              onPress={handlePress(input)}
            />
          </HStack>
          <VStack space={2}>
            {!exercises ? (
              <Box marginX={2} backgroundColor="#008B8B" rounded={8}>
                <Text fontWeight="bold" color="#FFFFFF" padding={2}>
                  Loading
                </Text>
              </Box>
            ) : (
              exercises.map((exercise) => (
                <HStack
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  key={exercise.id}
                >
                  <Checkbox
                    aria-label="checkbox"
                    isChecked={exercise.isCompleted}
                    onChange={() => handleStatusChange(exercise.id)}
                    value={exercise.name}
                  />
                  <Text
                    width="100%"
                    flexShrink={1}
                    textAlign="left"
                    mx="2"
                    strikeThrough={exercise.isCompleted}
                    _light={{
                      color: exercise.isCompleted ? "gray.400" : "coolGray.800",
                    }}
                    _dark={{
                      color: exercise.isCompleted ? "gray.400" : "coolGray.50",
                    }}
                    // onPress={() => handleStatusChange(exercise.id)}
                  >
                    {exercise.name}
                  </Text>
                  <IconButton
                    size="sm"
                    colorScheme="trueGray"
                    icon={
                      <Icon
                        as={Entypo}
                        name="minus"
                        size="xs"
                        color="trueGray.400"
                      />
                    }
                    onPress={() => dispatch(removeExercise(exercise.id))}
                  />
                </HStack>
              ))
            )}
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default SingleWorkoutScreen;
