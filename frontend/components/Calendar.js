import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { isSameDay } from "date-fns";
import { startOfWeek, addDays, getDate, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserWorkouts,
  setComplete,
  setSkip,
} from "../store/slices/singleUser.slice";
const Calendar = () => {
  const [week, setWeek] = useState([]);
  const [date, setDate] = useState(new Date());
  const [hasWorkouts, setHasWorkouts] = useState(false);
  const [alreadySet, setAlreadySet] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { id } = useSelector((state) => state.auth.user);

  const calendarDates = () => {
    let dates = [];
    for (let i = 0; i < 7; i++) {
      const start = startOfWeek(new Date(), { weekStartsOn: 1 });
      let currentDay = addDays(start, i);
      dates.push({
        formatted: format(currentDay, "EEE"),
        currentDay,
        day: getDate(currentDay),
      });
    }
    setWeek(dates);
  };

  const { workouts } = user;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserWorkouts(id));
    calendarDates();
  }, []);

  useEffect(() => {
    if (hasWorkouts === false) {
      dispatch(fetchUserWorkouts(id));
    } else {
      workouts.map((workout) => {
        if (workout.Workout_Plan.currentDay !== date) {
          if (workout.Workout_Plan.progress === "To do") {

            dispatch(
              setSkip({
                userId: workout.Workout_Plan.userId,
                skips: workout.Workout_Plan.skips,
                workoutId: workout.id,
                currentDay: date,
              })
            );
          } else {
            dispatch(
              setComplete({
                userId: workout.Workout_Plan.userId,
                completions: workout.Workout_Plan.completions,
                workoutId: workout.id,
                currentDay: date,
              })
            );
          }
        }
      });
    }
  }, [hasWorkouts]);

  if (!workouts) {
    return (
      <View style={styles.boxAdd}>
        <Text style={styles.weekDayText}>Add workouts to get started</Text>
      </View>
    );
  }

  if (workouts) {
    if (alreadySet === false) {
      setHasWorkouts(true);
      setAlreadySet(true);
    }
  }

  return (
    <View style={styles.container}>
      {week.map((weekDay) => {
        let date = new Date();
        const textStyles = [styles.label];
        const touchable = [styles.touchable];
        const sameDay = isSameDay(weekDay.currentDay, date);
        let dayWorkout = [];

        if (sameDay) {
          dayWorkout = [];
          workouts.map((workout) => {
            if (workout.daysOfWeek === "All") {
              dayWorkout.push(workout);
            } else if (workout.daysOfWeek.includes(weekDay.formatted)) {
              dayWorkout.push(workout);
            }
          });
          textStyles.push(styles.selectedLabel);
          touchable.push(styles.selectedTouchable);
        }
        return (
          <View key={weekDay.formatted}>
            <View style={styles.weekDayItem}>
              <Text style={styles.weekDayText}>{weekDay.formatted}</Text>
              <TouchableOpacity style={touchable}>
                <Text style={textStyles}>{weekDay.day}</Text>
              </TouchableOpacity>
            </View>
            {dayWorkout.map((workout) => {
              let compPercentage =
                workout.Workout_Plan.completions /
                (workout.Workout_Plan.completions + workout.Workout_Plan.skips);
              return (
                <View style={styles.box} key={workout.id}>
                  <Text style={textStyles}>{workout.name}:</Text>
                  <Text style={textStyles}>
                    Completion Percentage: {compPercentage * 100}%
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  box: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingVertical: 20,
  },
  boxAdd: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingVertical: 50,
  },
  weekDayText: {
    color: "gray",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
  selectedLabel: {
    color: "green",
  },
  touchable: {
    borderRadius: 20,
    padding: 7.5,
    height: 35,
    width: 35,
  },
  selectedTouchable: {
    backgroundColor: "yellow",
  },
  weekDayItem: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Calendar;
