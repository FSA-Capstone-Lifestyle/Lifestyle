import {
  Box,
  Heading,
  Flex,
  Pressable,
  Text,
  ScrollView,
  Button,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkouts } from "../../store/slices/workouts.slice";

const WorkoutsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { workouts } = useSelector((state) => state.workouts);

  const handleClick = (id) => {
    navigation.navigate("Single Workout", { id: id });
  };

  const handleCreate = () => {
    navigation.navigate("Create Workout");
  };

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Box>
          <Heading
            textAlign="center"
            fontSize={30}
            marginTop={10}
            marginBottom={5}
          >
            Select Workout
          </Heading>
          <Button
            alignSelf="center"
            borderRadius={10}
            width={130}
            backgroundColor="#20B2AA"
            _pressed={{
              backgroundColor: "#008b8b",
              transform: [{ scale: 0.92 }],
            }}
            marginBottom={5}
            onPress={() => {
              handleCreate();
            }}
          >
            <Text fontWeight="bold" color="#ffffff" textAlign="center">
              Create Workout
            </Text>
          </Button>
        </Box>
        <Flex
          marginBottom={4}
          justifyContent="center"
          flexDirection="row"
          flexWrap="wrap"
        >
          {workouts.map((workout) => {
            return (
              <Pressable
                key={workout.id}
                onPress={() => {
                  handleClick(workout.id);
                }}
              >
                {({ isPressed }) => {
                  return (
                    <Box
                      shadow={3}
                      margin={2}
                      boxSize="100"
                      backgroundColor={isPressed ? "#203535" : "#2F4F4F"}
                      rounded="8"
                      style={{
                        transform: [
                          {
                            scale: isPressed ? 0.94 : 1,
                          },
                        ],
                      }}
                    >
                      <Text
                        maxWidth={120}
                        paddingTop={25}
                        textAlign="center"
                        alignSelf="center"
                        color="#ffffff"
                        fontWeight="bold"
                        fontSize="18"
                      >
                        {workout.name}
                      </Text>
                    </Box>
                  );
                }}
              </Pressable>
            );
          })}
        </Flex>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutsScreen;
