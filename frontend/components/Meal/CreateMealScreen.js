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
} from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMeal } from "../../store/slices/meals.slice";

const CreateMealScreen = (props) => {
  return (
    <Box>
      <Text textAlign="center" fontSize={24} fontWeight="bold" marginTop={5}>
        Create New Meal
      </Text>
    </Box>
  );
};

export default CreateMealScreen;
