import React, { useEffect, useState } from "react";
import { getWeekDaysThunk } from "../store/slices/calendarStore.slice";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { isSameDay } from "date-fns";
import { useSelector, useDispatch } from "react-redux";

const Calendar = (props) => {
  // const [week, setWeek] = useState([]);
  const dispatch = useDispatch();
  const { week } = useSelector((state) => state.calendar);

  let date = new Date();

  useEffect(() => {
    dispatch(getWeekDaysThunk(date));
    // setWeek(week);
  }, [date]);

  return (
    <View style={styles.container}>
      {week.map((weekDay) => {
        const textStyles = [styles.label];
        const touchable = [styles.touchable];
        const sameDay = isSameDay(weekDay.date, date);

        if (sameDay) {
          textStyles.push(styles.selectedLabel);
          touchable.push(styles.selectedTouchable);
        }

        return (
          <View style={styles.weekDayItem} key={weekDay.formatted}>
            <Text style={styles.weekDayText}>{weekDay.formatted}</Text>
            <TouchableOpacity style={touchable}>
              <Text style={textStyles}>{weekDay.day}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
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

// const mapStateToProps = (reduxState) => ({
//   week: reduxState.calendar,
// });

// const mapDispatchToProps = (dispatch) => ({
//   fetchWeek: (date) => dispatch(getWeekDaysThunk(date)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

export default Calendar;
