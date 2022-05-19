import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { isSameDay } from "date-fns";
import { startOfWeek, addDays, getDate, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWorkouts } from "../store/slices/singleUser.slice";

const Calendar = () => {
  const week = [];

  for (let i = 0; i < 7; i++) {
    let date = new Date();
    const start = startOfWeek(date, { weekStartsOn: 1 });
    date = addDays(start, i);
    week.push({
      formatted: format(date, "EEE"),
      date,
      day: getDate(date),
    });
  }

  const { user } = useSelector((state) => state.user);

  const { id } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserWorkouts(id));
  }, []);

  const { workouts } = useSelector((state) => state.user);

  // console.log("from calendar", workouts, id);
  console.log("from calendar", workouts, id);

  if (!workouts) {
    return (
      <View style={styles.boxAdd}>
        <Text style={styles.weekDayText}>Add workouts to get started</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {week.map((weekDay) => {
        let date = new Date();
        const textStyles = [styles.label];
        const touchable = [styles.touchable];
        const sameDay = isSameDay(weekDay.date, date);
        const dayWorkout = [];
        if (sameDay) {
          workouts.map((workout) => {
            if (workout.daysOfWeek === "All") {
              dayWorkout.push(workout);
            } else if (workout.daysOfWeek.includes(weekDay.formatted)) {
              dayWorkout.push(workout);
            }
          });
          // dayWorkout.map((workout) => {
          //   if (workout.progress === "To do") {
          //     workout.skips += 1;
          //   } else if (workout.progress === "Completed") {
          //     workout.completions += 1;
          //     workout.progress = "To do";
          //   }
          // });
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
              return (
                <View style={styles.box} key={workout.id}>
                  <Text style={textStyles}>{workout.name}:</Text>
                  <Text style={textStyles}>{workout.progress}</Text>
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
    justifyContent: "center",
    paddingVertical: 10,
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
