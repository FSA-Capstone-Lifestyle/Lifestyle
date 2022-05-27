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

export const updateReps = createAsyncThunk(
  "exercises/updateExercise",
  async (formInfo, { rejectWithValue }) => {
    try {
      const { id, reps } = formInfo;
      const res = await axios.put(
        `http://192.168.1.155:1337/api/exercises/single/${id}`,
        { reps }
      );
      return res.data;
    } catch (error) {
      console.log("Can't update exercise", error);
      return rejectWithValue(error);
    }
  }
);

export const updateSets = createAsyncThunk(
  "exercises/updateExercise",
  async (formInfo, { rejectWithValue }) => {
    try {
      const { id, sets } = formInfo;
      const res = await axios.put(
        `http://192.168.1.155:1337/api/exercises/single/${id}`,
        { sets }
      );
      return res.data;
    } catch (error) {
      console.log("Can't update exercise", error);
      return rejectWithValue(error);
    }
  }
);

// export const updateStatus = createAsyncThunk(
//   "exercises/updateExercise",
//   async (formInfo, { rejectWithValue }) => {
//     try {
//       const { id, isCompleted } = formInfo;
//       const res = await axios.put(
//         `http://192.168.1.155:1337/api/exercises/single/${id}`,
//         { isCompleted }
//       );
//       return res.data;
//     } catch (error) {
//       console.log("Can't update exercise", error);
//       return rejectWithValue(error);
//     }
//   }
// );

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
  reducers: {
    updateStatus: (state, action) => {
      const itemExists = state.exercises.find(
        (status) => status.id === action.payload.id
      );
      if (itemExists) {
        itemExists.isCompleted = action.payload.isCompleted;
      }
    },
  },
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
    [updateReps.pending]: (state) => {
      state.isLoading = true;
    },
    [updateReps.fulfilled]: (state, action) => {
      const index = state.exercises.findIndex(
        (exercise) => exercise.id === action.payload.id
      );
      state.exercises[index] = {
        ...state.exercises[index],
        ...action.payload,
      };
    },
    [updateReps.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [updateSets.pending]: (state) => {
      state.isLoading = true;
    },
    [updateSets.fulfilled]: (state, action) => {
      const index = state.exercises.findIndex(
        (exercise) => exercise.id === action.payload.id
      );
      state.exercises[index] = {
        ...state.exercises[index],
        ...action.payload,
      };
    },
    // [updateStatus.rejected]: (state) => {
    //   state.isLoading = false;
    //   state.isError = true;
    // },
    // [updateStatus.fulfilled]: (state, action) => {
    //   const index = state.exercises.findIndex(
    //     (exercise) => exercise.id === action.payload.id
    //   );
    //   state.exercises[index] = {
    //     ...state.exercises[index],
    //     ...action.payload,
    //   };
    // },
    // [updateStatus.rejected]: (state) => {
    //   state.isLoading = false;
    //   state.isError = true;
    // },
    [removeExercise.fulfilled]: (state, action) => {
      state.exercises = state.exercises.filter(
        (exercise) => exercise.id !== action.payload.id
      );
    },
  },
});

export const { updateStatus } = exercisesSlice.actions;
export const exercisesReducer = exercisesSlice.reducer;
