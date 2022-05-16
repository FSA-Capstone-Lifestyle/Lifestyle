import {
  Heading,
  View,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
  SimpleGrid,
  Center,
} from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkouts } from "../store/slices/workouts.slice";

const WorkoutsScreen = () => {
  const dispatch = useDispatch();
  const { workouts } = useSelector((state) => state.workouts);

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
              <Center w="20" bg="primary.300" rounded="md" shadow={3}>
                {workout.name}
              </Center>
              <Icon name="arrow-forward" />
            </HStack>
          </VStack>
        ))}
      </SimpleGrid>
    </View>
  );
};

export default WorkoutsScreen;
