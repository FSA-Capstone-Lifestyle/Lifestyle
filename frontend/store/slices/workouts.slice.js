import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  workouts: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const fetchWorkouts = createAsyncThunk(
  "workouts/fetchWorkouts",
  async (id = null, { rejectWithValue }) => {
    try {
      // const response = await axios.get(
      //   "http://192.168.1.155:1337/api/workouts"
      // );
      const response = await axios.get("http://localhost:1337/api/workouts");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createWorkout = createAsyncThunk(
  "workouts/createWorkout",
  async (formInfo, { rejectWithValue }) => {
    try {
      const { id, name } = formInfo;
      const res = await axios.post(
        `http://localhost:1337/api/workouts/user/${id}`,
        { name }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateWorkout = createAsyncThunk(
  "workouts/updateWorkout",
  async (formInfo, { rejectWithValue }) => {
    try {
      console.log("forminfo", formInfo);
      const { userId, workoutId, progress } = formInfo;
      const res = await axios.put(
        // `http://192.168.1.155:1337/api/workouts/${workoutId}`,
        // { progress }
        `http://localhost:1337/api/workouts/${workoutId}/${userId}`,
        {
          progress: progress,
        }
      );
      return res.data;
    } catch (error) {
      console.log("Can't update workout", error);
      return rejectWithValue(error);
    }
  }
);

export const removeWorkout = createAsyncThunk(
  "workouts/removeWorkout",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:1337/api/workouts/${id}`
      );
      return res.data;
    } catch (error) {
      console.log("Can't delete workout", error);
      return rejectWithValue(error);
    }
  }
);

const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {},
  // only handle action types
  extraReducers: {
    [fetchWorkouts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchWorkouts.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.workouts = action.payload;
    },
    [fetchWorkouts.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [createWorkout.pending]: (state) => {
      state.isLoading = true;
    },
    [createWorkout.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.workouts.push(action.payload);
    },
    [createWorkout.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [updateWorkout.pending]: (state) => {
      state.isLoading = true;
    },
    [updateWorkout.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [updateWorkout.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [removeWorkout.fulfilled]: (state, action) => {
      state.workouts = state.workouts.filter(
        (workout) => workout.id !== action.payload.id
      );
    },
  },
});

export const workoutsReducer = workoutsSlice.reducer;
