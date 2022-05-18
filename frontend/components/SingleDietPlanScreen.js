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
import { fetchDiet } from "../store/slices/singleDiet.slice";
import { removeDiet } from "../store/slices/diets.slice.js";

const SingleDietPlanScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiet(props.id));
  }, []);

  const handleEdit = () => {
    console.log("hello diet edit page");
  };
  const handleDelete = async (id) => {
    // await dispatch(removeDiet(id));
    console.log("diet deleted!");
  };

  const { diet } = useSelector((state) => state.diet);
  return (
    <SafeAreaView>
      <Text>Hello single diet plan</Text>
      <Button
        onPress={() => {
          handleDelete(diet.id);
        }}
      >
        Delete Diet
      </Button>
    </SafeAreaView>
  );
};

export default SingleDietPlanScreen;
