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
      const res = await axios.get(`/api/users/${id}`);
      return res.data;
    } catch (error) {
      console.log("Can't find this user", error);
      return rejectWithValue(error);
    }
  }
);

// User Completed Workout
export const setComplete = createAsyncThunk(
  "user/completed",
  async (userId, workoutId, { rejectWithValue }) => {
    try {
      const userWorkout = await axios.get(`/api/users/${userId}/${workoutId}`);
      const res = await axios.put(
        `/api/users/${userId}/${workoutId}/completed`,
        {
          completions: userWorkout.completions++,
        }
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
  "user/completed",
  async (data, { rejectWithValue }) => {
    try {
      const { userId } = data;
      const { workoutId } = data;
      const userWorkout = await axios.get(`/api/users/${userId}/${workoutId}`);
      const res = await axios.put(
        `/api/users/${userId}/${workoutId}/completed`,
        {
          skips: userWorkout.skips++,
        }
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
    [setComplete.pending]: (state) => {
      state.isLoading = true;
    },
    [setComplete.fulfilled]: (state, action) => {
      state.user.workout = action.payload;
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
      state.user.workout = action.payload;
      state.isSuccess = true;
    },
    [setSkip.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const userReducer = userSlice.reducer;
