import {
  Box,
  Heading,
  Flex,
  Pressable,
  Text,
  ScrollView,
  Link,
  Button,
  Image,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeal } from "../../store/slices/singleMeal.slice";
import { removeMeal } from "../../store/slices/meals.slice";

const SingleMealScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeal(props.route.params.id));
  }, []);

  const handleEdit = () => {
    console.log("hello meal edit page");
  };
  const handleDelete = async (id) => {
    await dispatch(removeMeal(id));
    props.navigation.navigate.goBack();
  };

  const { meal } = useSelector((state) => state.meal);
  return (
    <SafeAreaView>
      <Image
        alignSelf="center"
        size={200}
        borderRadius={100}
        source={{ uri: meal.imageUrl }}
        alt={meal.name}
        marginBottom={3}
      />
      <Box backgroundColor="#008B8B" alignSelf="center" rounded={8}>
        <Text fontWeight="bold" color="#FFFFFF" padding={2}>
          Calories: {meal.calories}
        </Text>
      </Box>

      <Button
        backgroundColor="#DC143C"
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
