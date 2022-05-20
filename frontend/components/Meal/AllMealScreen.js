import {
  Box,
  Heading,
  Flex,
  Pressable,
  Text,
  ScrollView,
  Button,
} from "native-base";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals } from "../../store/slices/meals.slice";

const AllMealScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeals());
  }, []);

  const handleClick = (id) => {
    navigation.navigate("SingleMealScreen", { id: id });
  };

  const handleCreate = () => {
    navigation.navigate("CreateMealScreen");
  };

  const { meals } = useSelector((state) => state.meals);
  return (
    <SafeAreaView>
      <ScrollView>
        <Box>
          <Heading
            textAlign="center"
            fontSize={30}
            marginTop={10}
            marginBottom={5}
          >
            Select Meal
          </Heading>
          <Button
            alignSelf="center"
            borderRadius={10}
            width={130}
            backgroundColor="#20B2AA"
            _pressed={{
              backgroundColor: "#008b8b",
              transform: [{ scale: 0.92 }],
            }}
            marginBottom={5}
            onPress={() => {
              handleCreate();
            }}
          >
            <Text fontWeight="bold" color="#ffffff">
              Create A Meal
            </Text>
          </Button>
        </Box>
        <Flex
          marginBottom={4}
          justifyContent="center"
          flexDirection="row"
          flexWrap="wrap"
        >
          {meals.map((meal) => {
            return (
              <Pressable
                key={meal.id}
                onPress={() => {
                  handleClick(meal.id);
                }}
              >
                {({ isPressed }) => {
                  return (
                    <Box
                      shadow={3}
                      margin={2}
                      boxSize="150"
                      backgroundColor={isPressed ? "#203535" : "#2F4F4F"}
                      rounded="8"
                      style={{
                        transform: [
                          {
                            scale: isPressed ? 0.94 : 1,
                          },
                        ],
                      }}
                    >
                      <Text
                        maxWidth={120}
                        paddingTop={25}
                        textAlign="center"
                        alignSelf="center"
                        color="#ffffff"
                        fontWeight="bold"
                        fontSize="18"
                      >
                        {meal.name}
                      </Text>
                    </Box>
                  );
                }}
              </Pressable>
            );
          })}
        </Flex>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllMealScreen;
