import {
  Box,
  Heading,
  Flex,
  Pressable,
  Text,
  ScrollView,
  Link,
  Button,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeal } from "../store/slices/singleMeal.slice";
import { removeMeal } from "../store/slices/meals.slice.js";

const SingleMealScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeal(props.id));
  }, []);

  const handleEdit = () => {
    console.log("hello meal edit page");
  };
  const handleDelete = async (id) => {
    // await dispatch(removeMeal(id));
    console.log("meal deleted!");
  };

  const { meal } = useSelector((state) => state.meal);
  return (
    <SafeAreaView>
      <Text>Hello single meal page</Text>
      <Button
        onPress={() => {
          handleDelete(meal.id);
        }}
      >
        Delete Meal
      </Button>
    </SafeAreaView>
  );
};

export default SingleMealScreen;
