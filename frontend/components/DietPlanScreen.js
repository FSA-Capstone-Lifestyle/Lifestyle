import {
  Box,
  Heading,
  Flex,
  Pressable,
  Text,
  ScrollView,
  Link,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiets } from "../store/slices/diets.slice.js";

const DietPlanScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiets());
  }, []);

  const handleClick = (id) => {
    console.log("hello diet", id);
  };

  const { diets } = useSelector((state) => state.diets);
  return (
    <SafeAreaView>
      <Heading textAlign="center" marginTop={10} marginBottom={10}>
        Diet Plans
      </Heading>

      <ScrollView maxH={Math.floor(Dimensions.get("window").height) - 145}>
        <Flex justifyContent="center" flexDirection="row" flexWrap="wrap">
          {diets.map((diet) => {
            return (
              <Pressable
                key={diet.id}
                onPress={() => {
                  handleClick(diet.id);
                }}
              >
                <Box
                  shadow={3}
                  margin={2}
                  boxSize="150"
                  //backgroundColor={isPressed ? "#ff00ff" : "#556B2F"}
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
              </Pressable>
            );
          })}
        </Flex>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DietPlanScreen;
