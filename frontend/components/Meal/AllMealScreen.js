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
    console.log("create meal page!");
  };

  const { meals } = useSelector((state) => state.diets);
  return (
    <SafeAreaView>
      <Heading textAlign="center" fontSize={30} marginTop={10} marginBottom={5}>
        Select Meal
      </Heading>
      <Button
        alignSelf="center"
        borderRadius={10}
        fontWeight="bold"
        width={130}
        marginBottom={5}
        onPress={() => {
          handleCreate();
        }}
      >
        Create A Meal
      </Button>

      <ScrollView maxH={Math.floor(Dimensions.get("window").height) - 180}>
        <Flex justifyContent="center" flexDirection="row" flexWrap="wrap">
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
                      backgroundColor={isPressed ? "#008b8b" : "#556B2F"}
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
                        textAlign="center"
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
