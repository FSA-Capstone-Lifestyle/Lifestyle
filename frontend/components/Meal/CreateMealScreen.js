import {
  Box,
  Flex,
  Pressable,
  Text,
  ScrollView,
  Button,
  Image,
  Divider,
  Container,
  FormControl,
  Input,
} from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMeal } from "../../store/slices/meals.slice";

const CreateMealScreen = (props) => {
  return (
    <ScrollView>
      <Text textAlign="center" fontSize={24} fontWeight="bold" marginTop={5}>
        Create New Meal
      </Text>

      <FormControl
        marginY={5}
        onSubmit={() => {
          console.log("new meal added!");
        }}
      >
        <Box paddingBottom={4}>
          <Text>Name:</Text>
          <Input placeholder="(ex: Creamy Mashed Potatoes)"></Input>
        </Box>

        <Box paddingBottom={4}>
          <Text>Meal Type:</Text>
          <Input placeholder="(ex: Breakfast, Lunch, Dinner)"></Input>
        </Box>

        <Box paddingBottom={4}>
          <Text>Calories:</Text>
          <Input placeholder="(ex: 320)"></Input>
        </Box>

        <Box paddingBottom={4}>
          <Text>Prep Time:</Text>
          <Input placeholder="(ex: 20 Minutes)"></Input>
        </Box>

        <Box paddingBottom={4}>
          <Text>Ingredients:</Text>
          <Input placeholder="(ex: 3 Potatoes, 1 Cup Milk, 2 Tbsp Butter)"></Input>
        </Box>

        <Box paddingBottom={4}>
          <Text>Instructions:</Text>
          <Input placeholder="(ex: Boil potatoes and mash, add milk and butter, stir until creamy.)"></Input>
        </Box>

        <Box paddingBottom={4}>
          <Text>Image:</Text>
          <Input placeholder="(ex: https://anothertablespoon.com/wp-content/DSC02704.jpg)"></Input>
        </Box>

        <Button type="submit">Submit</Button>
      </FormControl>
    </ScrollView>
  );
};

export default CreateMealScreen;
