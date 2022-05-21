import { Box, Text, ScrollView, Button, FormControl, Input } from "native-base";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createMeal } from "../../store/slices/meals.slice";

const CreateMealScreen = (props) => {
  const [form, setFormData] = useState({
    name: "",
    mealType: "",
    calories: "",
    prepTime: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });

  const dispatch = useDispatch();

  const handlePress = (data) => (e) => {
    e.preventDefault();
    dispatch(createMeal(data));
  };

  return (
    <ScrollView>
      <Text textAlign="center" fontSize={24} fontWeight="bold" marginTop={5}>
        Create New Meal
      </Text>

      <FormControl marginY={5} isRequired>
        <Box paddingBottom={4}>
          <Text>Name:</Text>
          <Input
            placeholder="(ex: Creamy Mashed Potatoes)"
            onChangeText={(e) =>
              setFormData((prevState) => ({ ...prevState, name: e }))
            }
          />
        </Box>

        <Box paddingBottom={4}>
          <Text>Meal Type:</Text>
          <Input
            placeholder="(ex: Breakfast, Lunch, Dinner)"
            onChangeText={(e) =>
              setFormData((prevState) => ({ ...prevState, mealType: e }))
            }
          />
        </Box>

        <Box paddingBottom={4}>
          <Text>Calories:</Text>
          <Input
            placeholder="(ex: 320)"
            onChangeText={(e) =>
              setFormData((prevState) => ({ ...prevState, calories: e }))
            }
          />
        </Box>

        <Box paddingBottom={4}>
          <Text>Prep Time:</Text>
          <Input
            placeholder="(ex: 20 Minutes)"
            onChangeText={(e) =>
              setFormData((prevState) => ({ ...prevState, prepTime: e }))
            }
          />
        </Box>

        <Box paddingBottom={4}>
          <Text>Ingredients:</Text>
          <Input
            placeholder="(ex: 3 Potatoes, 1 Cup Milk, 2 Tbsp Butter)"
            onChangeText={(e) =>
              setFormData((prevState) => ({ ...prevState, ingredients: e }))
            }
          />
        </Box>

        <Box paddingBottom={4}>
          <Text>Instructions:</Text>
          <Input
            placeholder="(ex: Boil potatoes and mash, add milk and butter, stir until creamy.)"
            onChangeText={(e) =>
              setFormData((prevState) => ({ ...prevState, instructions: e }))
            }
          />
        </Box>

        <Box paddingBottom={4}>
          <Text>Image:</Text>
          <Input
            placeholder="(ex: https://anothertablespoon.com/wp-content/DSC02704.jpg)"
            onChangeText={(e) =>
              setFormData((prevState) => ({ ...prevState, imageUrl: e }))
            }
          />
        </Box>

        <Button type="submit" onPress={handlePress(form)}>
          Submit
        </Button>
      </FormControl>
    </ScrollView>
  );
};

export default CreateMealScreen;
