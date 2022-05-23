import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  user: {},
  isSuccess: false,
  isError: false,
  isLoading: false,
};

// Async thunk
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:1337/api/users/${id}`);
      return res.data;
    } catch (error) {
      console.log("Can't find this user", error);
      return rejectWithValue(error);
    }
  }
);

// Get User Workouts
export const fetchUserWorkouts = createAsyncThunk(
  "user/fetchUserWorkouts",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        // `http://192.168.1.155:1337/api/user/${id}/workouts`
        `http://localhost:1337/api/users/${id}/workouts`
      );
      return res.data;
    } catch (error) {
      console.log("Cant find this workout", error);
      return rejectWithValue(error);
    }
  }
);

// User Completed Workout
export const setComplete = createAsyncThunk(
  "user/setComplete",
  async (data, { rejectWithValue }) => {
    try {
      const userId = data.userId;
      const workoutId = data.workoutId;
      const currentDay = data.currentDay;

      if (workoutId) {
        const userWorkout = await axios.get(
          `http://localhost:1337/api/users/${userId}/${workoutId}`
        );
        await axios.put(
          `http://localhost:1337/api/users/${userId}/${workoutId}/completed`,
          {
            completions: userWorkout.completions++,
            currentDay: currentDay,
          }
        );
      }
      const res = await axios.get(
        `http://localhost:1337/api/users/${userId}/workouts`
      );
      return res.data;
    } catch (error) {
      console.log("Cant find this workout", error);
      return rejectWithValue(error);
    }
  }
);

// User Skipped Workout
export const setSkip = createAsyncThunk(
  "user/setSkip",
  async (data, { rejectWithValue }) => {
    try {
      const { userId } = data;
      const { workoutId } = data;
      const { currentDay } = data;
      console.log("this is the data", data);
      if (workoutId) {
        const userWorkout = await axios.get(
          `http://localhost:1337/api/users/${userId}/${workoutId}`
        );
        await axios.put(
          `http://localhost:1337/api/users/${userId}/${workoutId}/skipped`,
          {
            skips: userWorkout.skips++,
            currentDay: currentDay,
          }
        );
      }
      const res = await axios.get(
        `http://localhost:1337/api/users/${userId}/workouts`
      );
      return res.data;
    } catch (error) {
      console.log("Cant find this workout", error);
      return rejectWithValue(error);
    }
  }
);

// Slice reducer - action creators and types are generated here
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isSuccess = true;
    },
    [fetchUser.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [fetchUserWorkouts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserWorkouts.fulfilled]: (state, action) => {
      state.user = action.payload[0];
      // console.log("state.user", state.user);
      state.isSuccess = true;
    },
    [fetchUserWorkouts.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [setComplete.pending]: (state) => {
      state.isLoading = true;
    },
    [setComplete.fulfilled]: (state, action) => {
      state.user = action.payload[0];
      state.isSuccess = true;
    },
    [setComplete.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [setSkip.pending]: (state) => {
      state.isLoading = true;
    },
    [setSkip.fulfilled]: (state, action) => {
      console.log("setskip reducer", action.payload[0]);
      state.user = action.payload[0];
      state.isSuccess = true;
    },
    [setSkip.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const userReducer = userSlice.reducer;
