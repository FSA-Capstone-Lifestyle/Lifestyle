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
import { fetchDiets } from "../store/slices/diets.slice.js";

const DietPlanScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiets());
  }, []);

  const handleClick = (id) => {
    console.log("hello singe diet page", id);
    navigation.navigate("SingleDietPlanScreen", { id: id });
  };

  const handleCreate = () => {
    console.log("create diet plan page!");
  };

  const { diets } = useSelector((state) => state.diets);
  return (
    <SafeAreaView backgroundColor="#FAF0E6">
      <Heading textAlign="center" fontSize={30} marginTop={10} marginBottom={5}>
        Diet Plans
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
        Create Diet Plan
      </Button>

      <ScrollView maxH={Math.floor(Dimensions.get("window").height) - 180}>
        <Flex justifyContent="center" flexDirection="row" flexWrap="wrap">
          {diets.map((diet) => {
            return (
              <Pressable
                key={diet.id}
                onPress={() => {
                  handleClick(diet.id);
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
                        {diet.name}
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

export default DietPlanScreen;
