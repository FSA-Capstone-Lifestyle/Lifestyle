import { Box, Text, ScrollView, Button, FormControl, Input } from "native-base";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWorkout } from "../../store/slices/workouts.slice";

const CreateWorkoutScreen = (props) => {
  const [name, setName] = useState("");

  const { id } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleText = (text) => setName(text);

  const handlePress = (data) => (e) => {
    e.preventDefault();
    dispatch(createWorkout(data));
  };

  return (
    <ScrollView>
      <Text textAlign="center" fontSize={24} fontWeight="bold" marginTop={5}>
        Create New Workout
      </Text>

      <FormControl marginY={5} isRequired>
        <Box paddingBottom={4}>
          <Text>Name:</Text>
          <Input value={name} onChangeText={handleText} />
        </Box>

        <Button type="submit" onPress={handlePress({ id, name })}>
          Submit
        </Button>
      </FormControl>
    </ScrollView>
  );
};

export default CreateWorkoutScreen;
