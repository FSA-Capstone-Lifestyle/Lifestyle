import { Text, Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiet } from "../store/slices/singleDiet.slice";
import { removeDiet } from "../store/slices/diets.slice.js";

const SingleDietPlanScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiet(props.route.params.id));
  }, []);

  const handleEdit = () => {
    console.log("hello diet edit page");
  };
  const handleDelete = async (id) => {
    await dispatch(removeDiet(id));
    console.log("diet deleted!");
  };

  const { diet } = useSelector((state) => state.diet);
  return (
    <SafeAreaView>
      <Text>Hello single diet plan</Text>
      <Button
        onPress={() => {
          handleDelete(diet.id);
        }}
      >
        Delete Diet
      </Button>
    </SafeAreaView>
  );
};

export default SingleDietPlanScreen;
