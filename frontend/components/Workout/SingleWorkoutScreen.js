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
  Slider,
} from "native-base";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkout } from "../../store/slices/singleWorkout.slice";
import {
  createExercise,
  fetchExercises,
  removeExercise,
  updateReps,
  updateSets,
  updateStatus,
} from "../../store/slices/exercises.slice";
import { updateWorkout } from "../../store/slices/workouts.slice";

const SingleWorkoutScreen = (props) => {
  const dispatch = useDispatch();
  const { exercises } = useSelector((state) => state.exercises);
  const { workout } = useSelector((state) => state.workout);
  const { user } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);
  const [progress, setProgress] = useState({
    progress: "",
  });
  const [input, setInput] = useState({
    name: "",
    workoutId: "",
  });
  const [isComplete, setIsComplete] = useState(false);

  let { workoutId } = input;

  const workoutComplete = () => {
    if (exercises.every((exercise) => exercise.isCompleted)) {
      setProgress("Completed");
      setIsComplete(true);
    } else if (exercises.some((exercise) => exercise.isCompleted)) {
      setProgress("In progress");
    } else {
      setProgress("To do");
    }
  };

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

  useEffect(() => {
    dispatch(updateWorkout({ userId: user.id, workoutId: workout.id }));
  }, [isComplete]);

  const handleReps = (id, reps) => {
    dispatch(updateReps({ id, reps }));
  };

  const handleSets = (id, sets) => {
    dispatch(updateSets({ id, sets }));
  };

  const handleStatusChange = (id, isCompleted) => {
    setToggle(!isCompleted);
    dispatch(updateStatus({ id, isCompleted }));
    workoutComplete();
  };

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
                <Box key={exercise.id}>
                  <HStack
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Checkbox
                      aria-label="checkbox"
                      isChecked={exercise.isCompleted}
                      onChange={() => handleStatusChange(exercise.id, toggle)}
                      value={exercise.name}
                    />
                    <Text
                      width="100%"
                      flexShrink={1}
                      textAlign="left"
                      mx="2"
                      strikeThrough={exercise.isCompleted}
                      _light={{
                        color: exercise.isCompleted
                          ? "gray.400"
                          : "coolGray.800",
                      }}
                      _dark={{
                        color: exercise.isCompleted
                          ? "gray.400"
                          : "coolGray.50",
                      }}
                      onPress={() => handleStatusChange(exercise.id)}
                    >
                      {exercise.name}
                    </Text>
                    <Text width="100%" flexShrink={1} textAlign="left">
                      Reps: {exercise.reps}
                    </Text>
                    <Text width="100%" flexShrink={1} textAlign="left">
                      Sets: {exercise.sets}
                    </Text>
                    <IconButton
                      size="sm"
                      colorScheme="trueGray"
                      icon={
                        <Icon
                          as={AntDesign}
                          name="delete"
                          size="md"
                          color="trueGray.600"
                        />
                      }
                      onPress={() => dispatch(removeExercise(exercise.id))}
                    />
                  </HStack>
                  <Box alignItems="center" w="100%">
                    <VStack w="3/4" maxW="300" space={4}>
                      <Slider
                        defaultValue={exercise.reps}
                        maxValue={20}
                        onChangeEnd={(val) =>
                          handleReps(exercise.id, Math.floor(val))
                        }
                      >
                        <Slider.Track>
                          <Slider.FilledTrack bg="green.600" />
                        </Slider.Track>
                        <Slider.Thumb borderWidth="0" bg="transparent">
                          <Icon
                            as={MaterialIcons}
                            name="fitness-center"
                            color="orange.600"
                            size="md"
                          />
                        </Slider.Thumb>
                      </Slider>
                      <Slider
                        defaultValue={exercise.sets}
                        maxValue={7}
                        onChangeEnd={(val) =>
                          handleSets(exercise.id, Math.floor(val))
                        }
                      >
                        <Slider.Track>
                          <Slider.FilledTrack bg="orange.600" />
                        </Slider.Track>
                        <Slider.Thumb borderWidth="0" bg="transparent">
                          <Icon
                            as={MaterialCommunityIcons}
                            name="weight-lifter"
                            color="green.600"
                            size="md"
                          />
                        </Slider.Thumb>
                      </Slider>
                    </VStack>
                  </Box>
                  {isComplete ? (
                    <Box>Completed!</Box>
                  ) : (
                    <Box>Complete this workout fatty</Box>
                  )}
                </Box>
              ))
            )}
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default SingleWorkoutScreen;
