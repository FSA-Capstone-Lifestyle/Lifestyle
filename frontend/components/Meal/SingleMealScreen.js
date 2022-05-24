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
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeal } from "../../store/slices/singleMeal.slice";
import { removeMeal } from "../../store/slices/meals.slice";
import { setMealToUser } from "../../store/slices/singleUser.slice";

const SingleMealScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeal(props.route.params.id));
  }, []);

  const handleAdd = async (meal) => {
    const user = props.route.params.user;
    await dispatch(
      setMealToUser({
        userId: props.route.params.user.id,
        mealId: props.route.params.id,
      })
    );
    props.navigation.goBack();
  };

  const handleEdit = (meal) => {
    props.navigation.navigate("EditMealScreen", { meal: meal });
  };

  const handleDelete = async (id) => {
    await dispatch(removeMeal(id));
    props.navigation.goBack();
  };

  const { meal } = useSelector((state) => state.meal);
  return (
    <ScrollView>
      <Pressable
        onPress={() => {
          handleEdit(meal);
        }}
      >
        {({ isPressed }) => {
          return (
            <MaterialIcons
              style={{ marginTop: 20, marginRight: 25, alignSelf: "flex-end" }}
              name="edit"
              size={30}
              color={isPressed ? "#898989" : "black"}
            />
          );
        }}
      </Pressable>

      <Image
        alignSelf="center"
        size={200}
        borderRadius={100}
        src={
          meal.imageUrl
            ? meal.imageUrl
            : "http://www.fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png"
        }
        alt={meal.name}
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
        marginTop={5}
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
          shadow={1}
          minHeight="10"
          rounded={8}
          marginX={3}
          _pressed={{
            backgroundColor: "#584aa5",
            transform: [{ scale: 0.92 }],
          }}
          onPress={() => {
            handleAdd(meal);
          }}
        >
          <Text fontWeight="bold" color="#ffffff">
            Add to Diet Plan
          </Text>
        </Button>

        <Button
          backgroundColor="#e80000"
          shadow={1}
          minWidth="90"
          minHeight="10"
          marginX={3}
          rounded={8}
          _pressed={{
            backgroundColor: "#9b0000",
            transform: [{ scale: 0.92 }],
          }}
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
