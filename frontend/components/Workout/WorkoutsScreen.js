import {
  Heading,
  View,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
  SimpleGrid,
  Box,
  Input,
  Button,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkout,
  fetchWorkouts,
} from "../../store/slices/workouts.slice";

const WorkoutsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { workouts } = useSelector((state) => state.workouts);

  const [name, setName] = useState("");

  const handleChange = (text) => setName(text);

  const handleClick = (id) => {
    navigation.navigate("SingleWorkoutScreen", { id: id });
  };

  const handlePress = (data) => (e) => {
    e.preventDefault();
    dispatch(createWorkout(data));
  };

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, []);

  return (
    <View alignItems="center" m={20}>
      <Heading>Workouts</Heading>
      <Text>Choose a workout!</Text>
      <Divider my={4} />
      <SimpleGrid columns={2} spacingY={8} spacingX={8}>
        {workouts.map((workout) => (
          <VStack key={workout.id} space={3} divider={<Divider />} w="90%">
            <HStack justifyContent="space-between">
              <Button
                width="60%"
                bg="primary.300"
                onPress={() => {
                  handleClick(workout.id);
                }}
              >
                {workout.name}
              </Button>
              <Icon name="arrow-forward" />
            </HStack>
          </VStack>
        ))}
      </SimpleGrid>
      <Box m={4}>
        <Heading size="sm">Create your own workout:</Heading>
        <Box alignItems="center">
          <Input
            mx="3"
            placeholder="Workout name"
            w="100%"
            value={name}
            onChangeText={handleChange}
          />
          <Button mt="2" colorScheme="indigo" onPress={handlePress({ name })}>
            Submit
          </Button>
        </Box>
      </Box>
    </View>
  );
};

export default WorkoutsScreen;
