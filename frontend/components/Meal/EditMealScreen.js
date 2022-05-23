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
  Input,
} from "native-base";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMeal } from "../../store/slices/meals.slice";

const EditMealScreen = (props) => {
  const meal = props.route.params.meal;
  const [mealData, setMealData] = useState({
    name: meal.name || "",
    mealType: meal.mealType || "",
    ingredients: meal.ingredients || "",
    instructions: meal.instructions || "",
    prepTime: meal.prepTime || "",
    imageUrl: meal.imageUrl || "",
    calories: meal.calories || "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (mealData) => {
    const updated = await dispatch(updateMeal({ mealData, id: meal.id }));
    if (updated.meta.requestStatus !== "rejected") {
      props.navigation.navigate("AllMealScreen");
    } else {
      console.log("something bad happened");
    }
  };

  return (
    <ScrollView>
      <Text textAlign="center" fontSize={24} fontWeight="bold" marginTop={5}>
        Edit Current Meal
      </Text>

      <Box marginY={5}>
        <Container alignSelf="center" marginBottom={4}>
          <Text fontSize={18} fontWeight="bold">
            Name:
          </Text>
          <Input
            placeholder="(ex: Creamy Mashed Potatoes)"
            value={mealData.name}
            onChangeText={(e) =>
              setMealData((prevState) => ({ ...prevState, name: e }))
            }
          ></Input>
        </Container>

        <Container alignSelf="center" marginBottom={4}>
          <Text fontSize={18} fontWeight="bold">
            Meal Type:
          </Text>
          <Input
            placeholder="(ex: Breakfast, Lunch, Dinner)"
            value={mealData.mealType}
            onChangeText={(e) =>
              setMealData((prevState) => ({ ...prevState, mealType: e }))
            }
          ></Input>
        </Container>

        <Container alignSelf="center" marginBottom={4}>
          <Text fontSize={18} fontWeight="bold">
            Calories:
          </Text>
          <Input
            placeholder="(ex: 320)"
            value={`${mealData.calories}`}
            onChangeText={(e) =>
              setMealData((prevState) => ({ ...prevState, calories: e }))
            }
          ></Input>
        </Container>

        <Container alignSelf="center" marginBottom={4}>
          <Text fontSize={18} fontWeight="bold">
            Prep Time:
          </Text>
          <Input
            placeholder="(ex: 20 Minutes)"
            value={mealData.prepTime}
            onChangeText={(e) =>
              setMealData((prevState) => ({ ...prevState, prepTime: e }))
            }
          ></Input>
        </Container>

        <Container alignSelf="center" marginBottom={4}>
          <Text fontSize={18} fontWeight="bold">
            Ingredients:
          </Text>
          <Input
            placeholder="(ex: 3 Potatoes, 1 Cup Milk, 2 Tbsp Butter)"
            value={mealData.ingredients}
            onChangeText={(e) =>
              setMealData((prevState) => ({ ...prevState, ingredients: e }))
            }
          ></Input>
        </Container>

        <Container alignSelf="center" marginBottom={4}>
          <Text fontSize={18} fontWeight="bold">
            Instructions:
          </Text>
          <Input
            placeholder="(ex: Boil potatoes and mash, add milk and butter, stir until creamy.)"
            value={mealData.instructions}
            onChangeText={(e) =>
              setMealData((prevState) => ({ ...prevState, instructions: e }))
            }
          ></Input>
        </Container>

        <Container alignSelf="center" marginBottom={4}>
          <Text fontSize={18} fontWeight="bold">
            Image:
          </Text>
          <Input
            placeholder="(ex: https://anothertablespoon.com/wp-content/DSC02704.jpg)"
            value={mealData.imageUrl}
            onChangeText={(e) =>
              setMealData((prevState) => ({ ...prevState, imageUrl: e }))
            }
          ></Input>
        </Container>

        <Button
          minWidth="150"
          minHeight="15"
          marginTop={1}
          shadow={1}
          alignSelf="center"
          _pressed={{
            transform: [
              {
                scale: 0.94,
              },
            ],
          }}
          onPress={() => {
            handleSubmit(mealData);
          }}
        >
          <Text fontSize={20} fontWeight="bold" color="#ffffff">
            Submit
          </Text>
        </Button>
      </Box>
    </ScrollView>
  );
};

export default EditMealScreen;
