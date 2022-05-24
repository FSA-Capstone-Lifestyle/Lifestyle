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
import { useDispatch, useSelector } from "react-redux";

const UserDietPlanScreen = (props) => {
  const handleClick = (id) => {
    console.log("hello singe user diet page");
  };

  const user = props.route.params.user;
  console.log(user);
  return (
    <ScrollView backgroundColor="#FAF0E6">
      <Heading textAlign="center" fontSize={30} marginTop={10} marginBottom={5}>
        <Text>{`${user.firstName}'s Meals`}</Text>
      </Heading>

      <Flex justifyContent="center" flexDirection="row" flexWrap="wrap">
        <Box>Hello</Box>
      </Flex>
    </ScrollView>
  );
};

export default UserDietPlanScreen;
