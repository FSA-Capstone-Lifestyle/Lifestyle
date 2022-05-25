import {
  Heading,
  Flex,
  Pressable,
  Text,
  ScrollView,
  Image,
  Divider,
} from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/slices/singleUser.slice";

const UserWorkoutPlanScreen = (props) => {
  const userId = props.route.params.user.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, []);

  const handleClick = (id) => {
    props.navigation.navigate("Single Workout", { id: id, user: user });
  };

  const { user } = useSelector((state) => state.user);

  const userWorkout = user.workouts;

  console.log(user);
  return (
    <ScrollView>
      <Heading textAlign="center" fontSize={30} marginTop={10}>
        {`${user.firstName}'s Workouts`}
      </Heading>

      <Divider
        thickness={2}
        maxWidth="325"
        alignSelf="center"
        marginTop={5}
        marginBottom={5}
      />

      <Flex justifyContent="flex-start">
        {userWorkout ? (
          userWorkout.map((workout) => {
            if (userId == workout.Workout_Plan.userId) {
              return (
                <Pressable
                  key={workout.id}
                  onPress={() => {
                    handleClick(workout.id);
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
                            "http://www.fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png"
                          }
                          alt={workout.name}
                        />
                        <Flex>
                          <Text marginX={3} fontSize={16} fontWeight="bold">
                            {workout.name}
                          </Text>
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
            No Workouts Available
          </Text>
        )}
      </Flex>
    </ScrollView>
  );
};

export default UserWorkoutPlanScreen;
