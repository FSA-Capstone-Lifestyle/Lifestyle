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
      const response = await axios.get(`/api/workouts/${id}`);
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
      state.user = action.payload;
      state.isSuccess = true;
    },
    [fetchWorkout.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const workoutReducer = workoutSlice.reducer;
