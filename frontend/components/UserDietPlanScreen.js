import {
  Box,
  Heading,
  Flex,
  Pressable,
  Text,
  ScrollView,
  Button,
  Image,
  Divider,
} from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/slices/singleUser.slice";

const UserDietPlanScreen = (props) => {
  const userId = props.route.params.user.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, []);

  const handleClick = (id) => {
    console.log("hello singe user diet page", id);
    props.navigation.navigate("SingleMealScreen", { id: id, user: user });
  };

  const { user } = useSelector((state) => state.user);
  console.log(user);
  const userMeal = user.meals;
  return (
    <ScrollView>
      <Heading textAlign="center" fontSize={30} marginTop={10}>
        {`${user.firstName}'s Meals`}
      </Heading>

      <Divider
        thickness={2}
        maxWidth="325"
        alignSelf="center"
        marginTop={5}
        marginBottom={5}
      />

      <Flex justifyContent="flex-start">
        {userMeal ? (
          userMeal.map((meal) => {
            if (userId == meal.Diet_Plan.userId) {
              return (
                <Pressable
                  key={meal.id}
                  onPress={() => {
                    handleClick(meal.id);
                  }}
                >
                  {({ isPressed }) => {
                    return (
                      <Flex
                        margin={2}
                        padding={2}
                        rounded={8}
                        direction="row"
                        backgroundColor={isPressed ? "#A9A9A9" : "#ffffff"}
                      >
                        <Image
                          size={100}
                          src={
                            meal.imageUrl
                              ? meal.imageUrl
                              : "http://www.fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png"
                          }
                          alt={meal.name}
                        />
                        <Flex>
                          <Text marginX={3} fontSize={16} fontWeight="bold">
                            {meal.name}
                          </Text>
                          <Text marginX={3}>Calories: {meal.calories}</Text>
                        </Flex>
                      </Flex>
                    );
                  }}
                </Pressable>
              );
            }
          })
        ) : (
          <Text alignSelf="center" fontSize={18}>
            No Meals Available
          </Text>
        )}
      </Flex>
    </ScrollView>
  );
};

export default UserDietPlanScreen;
