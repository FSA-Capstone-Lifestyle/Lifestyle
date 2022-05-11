import { startOfWeek, addDays, getDate, format } from "date-fns";
import { createSlice } from "@reduxjs/toolkit";

//action constants

// const SetWeek = "Set_Week";

//action creators

// export const setWeek = (week) => {
//   return {
//     type: SetWeek,
//     week,
//   };
// };

//Thunks

// // dispatches [{date: day of week}, ...]
// export const setWeekThunk = () => {
//   return function (dispatch) {
//     let date = new Date();
//     //day of month
//     let currentDate = date.getDate();
//     //day of week: {1=mon, 2=tue, ...}
//     let dayOfWeek = date.getDay();
//   };
// };

// export const getWeekDaysThunk = (date) => {
//   return function (dispatch) {
//     const start = startOfWeek(date, { weekStartsOn: 1 });

//     const final = [];

//     for (let i = 0; i < 7; i++) {
//       const date = addDays(start, i);
//       final.push({
//         formatted: format(date, "EEE"),
//         date,
//         day: getDate(date),
//       });
//     }
//     dispatch(setWeek(final));
//   };
// };
// //reducer

// export default function calendarReducer(state = initialState, action) {
//   switch (action.type) {
//     case SetWeek:
//       return action.week;
//     default:
//       return state;
//   }
// }

export const getWeekDaysThunk = (date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 });

  const final = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    final.push({
      formatted: format(date, "EEE"),
      date,
      day: getDate(date),
    });
    return final;
  }
};

const initialState = {
  week: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setWeek: (state, action) => {
      state.week = action.payload;
    },
  },
});

export const calendarReducer = calendarSlice.reducer;
