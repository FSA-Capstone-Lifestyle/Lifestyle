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
  const [skipData, setSkipData] = useState({});
  const [completeData, setCompleteData] = useState({});

  const calendarDates = () => {
    for (let i = 0; i < 7; i++) {
      const start = startOfWeek(date, { weekStartsOn: 1 });
      setDate(addDays(start, i));
      setWeek({
        formatted: format(date, "EEE"),
        date,
        day: getDate(date),
      });
    }
  };

  const { user } = useSelector((state) => state.user);

  const { id } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    calendarDates();
  }, []);

  useEffect(() => {
    dispatch(fetchUserWorkouts(id));
  }, []);

  useEffect(() => {
    dispatch(setSkip(skipData));
  }, []);

  useEffect(() => {
    dispatch(setComplete(completeData));
  }, []);

  const { workouts } = user;

  // console.log("from calendar", workouts, id);
  // console.log("from calendar", workouts, id);

  if (!workouts) {
    return (
      <View style={styles.boxAdd}>
        <Text style={styles.weekDayText}>Add workouts to get started</Text>
      </View>
    );
  }

  console.log(workouts, newDate);

  workouts.map((workout) => {
    if (workout.Workout_Plan.currentDay !== date) {
      if (workout.Workout_Plan.progress === "To do") {
        console.log("setSkip");
        setSkipData({
          userId: id,
          workoutId: workout.id,
          currentDay: date,
        });
      } else {
        setCompleteData({
          userId: id,
          workoutId: workout.id,
          currentDay: date,
        });
      }
    }
  });

  return (
    <View style={styles.container}>
      {week.map((weekDay) => {
        let date = new Date();
        const textStyles = [styles.label];
        const touchable = [styles.touchable];
        const sameDay = isSameDay(weekDay.date, date);
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
              // console.log("compPercentage", compPercentage, workout);
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
