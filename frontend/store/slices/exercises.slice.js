import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  exercises: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const fetchExercises = createAsyncThunk(
  "exercises/fetchExercises",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://192.168.1.155:1337/api/exercises/${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createExercise = createAsyncThunk(
  "exercises/createExercise",
  async (formInfo, { rejectWithValue }) => {
    console.log(formInfo);
    try {
      const res = await axios.post(
        "http://192.168.1.155:1337/api/exercises",
        formInfo
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateExercise = createAsyncThunk(
  "exercises/updateExercise",
  async (formInfo, { rejectWithValue }) => {
    try {
      const { formData, exercise } = formInfo;
      const { id } = exercise;
      const res = await axios.put(
        `http://192.168.1.155:1337/api/exercises/${id}`,
        formData
      );
      return res.data;
    } catch (error) {
      console.log("Can't update exercise", error);
      return rejectWithValue(error);
    }
  }
);

export const removeExercise = createAsyncThunk(
  "exercises/removeExercise",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://192.168.1.155:1337/api/exercises/${id}`
      );
      return res.data;
    } catch (error) {
      console.log("Can't delete exercise", error);
      return rejectWithValue(error);
    }
  }
);

const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {},
  // only handle action types
  extraReducers: {
    [fetchExercises.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchExercises.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.exercises = action.payload;
    },
    [fetchExercises.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [createExercise.pending]: (state) => {
      state.isLoading = true;
    },
    [createExercise.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.exercises.push(action.payload);
    },
    [createExercise.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [updateExercise.pending]: (state) => {
      state.isLoading = true;
    },
    [updateExercise.fulfilled]: (state, action) => {
      const index = state.exercises.findIndex(
        (exercise) => exercise.id === action.payload.id
      );
      state.exercises[index] = {
        ...state.exercises[index],
        ...action.payload,
      };
    },
    [updateExercise.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [removeExercise.fulfilled]: (state, action) => {
      state.exercises = state.exercises.filter(
        (exercise) => exercise.id !== action.payload.id
      );
    },
  },
});

export const exercisesReducer = exercisesSlice.reducer;
