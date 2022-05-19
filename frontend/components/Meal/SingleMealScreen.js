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
  Divider,
  Container,
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
    <ScrollView>
      <Image
        alignSelf="center"
        size={200}
        borderRadius={100}
        source={{ uri: meal.imageUrl }}
        alt={("picture of", meal.name)}
        marginTop={3}
        marginBottom={3}
      />

      <Text marginBottom={2} fontWeight="bold" fontSize={28} textAlign="center">
        {meal.name}
      </Text>

      <Flex direction="row" justifyContent="center">
        <Box marginX={2} backgroundColor="#008B8B" rounded={8}>
          <Text fontWeight="bold" color="#FFFFFF" padding={2}>
            {meal.mealType}
          </Text>
        </Box>

        <Box marginX={2} backgroundColor="#008B8B" rounded={8}>
          <Text fontWeight="bold" color="#FFFFFF" padding={2}>
            Calories: {meal.calories}
          </Text>
        </Box>
      </Flex>

      <Divider
        thickness={2}
        maxWidth="325"
        alignSelf="center"
        marginTop={3}
        marginBottom={5}
      />

      <Container alignSelf="center">
        <Text fontSize={18} fontWeight="bold">
          Prep Time:
        </Text>
        <Text fontSize={16} marginTop={1} marginBottom={5}>
          {meal.prepTime}
        </Text>
        <Text fontSize={18} fontWeight="bold">
          Ingredients:
        </Text>
        <Text fontSize={16} marginTop={1} marginBottom={5}>
          {meal.ingredients}
        </Text>
        <Text fontSize={18} fontWeight="bold">
          Instructions:
        </Text>
        <Text fontSize={16} marginTop={1} marginBottom={5}>
          {meal.instructions}
        </Text>
      </Container>

      <Flex marginBottom={4} direction="row" justifyContent="center">
        <Button
          backgroundColor="#7B68EE"
          minWidth="90"
          minHeight="10"
          rounded={8}
          marginX={3}
          onPress={() => {
            handleDelete(meal.id);
          }}
        >
          <Text fontWeight="bold" color="#ffffff">
            Add to Diet Plan
          </Text>
        </Button>

        <Button
          backgroundColor="#e80000"
          minWidth="90"
          minHeight="10"
          marginX={3}
          rounded={8}
          onPress={() => {
            handleDelete(meal.id);
          }}
        >
          <Text fontWeight="bold" color="#ffffff">
            Delete Meal
          </Text>
        </Button>
      </Flex>
    </ScrollView>
  );
};

export default SingleMealScreen;
