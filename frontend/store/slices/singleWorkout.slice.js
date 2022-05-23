import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  workout: {},
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const fetchWorkout = createAsyncThunk(
  "workout/fetchWorkout",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        // `http://192.168.1.155:1337/api/workouts/${id}`
        `http://localhost:1337/api/workouts/${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const completeWorkout = createAsyncThunk(
  "workout/completeWorkout",
  async (data, { rejectWithValue }) => {
    try {
      let { userId } = data;
      let { workoutId } = data;
      const response = await axios.put(
        `http://localhost:1337/api/workouts/${workoutId}/${userId}/complete`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Slice reducer - action creators and types are generated here
const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWorkout.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchWorkout.fulfilled]: (state, action) => {
      state.workout = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [fetchWorkout.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [completeWorkout.pending]: (state) => {
      state.isLoading = true;
    },
    [completeWorkout.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
    },
    [completeWorkout.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const workoutReducer = workoutSlice.reducer;
