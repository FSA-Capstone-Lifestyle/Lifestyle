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

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      console.log('edit',userData)
      const res = await axios.put(`http://localhost:1337/api/users/${userData.id}`,userData);
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
    console.log("fetchworkouts", id);
    try {
      const res = await axios.get(
        `http://localhost:1337/api/user/${id}/workouts`
        // `http://localhost:1337/api/users/${id}/workouts`
      );
      console.log("fetchuserworkouts", id, res.data);
      return res.data;
    } catch (error) {
      console.log("Cant find this workout", error);
      return rejectWithValue(error);
    }
  }
);

// User Completed Workout
export const setComplete = createAsyncThunk(
  "user/completed",
  async (data, { rejectWithValue }) => {
    try {
      const userId = data.userId;
      const workoutId = data.workoutId;
      const userWorkout = await axios.get(`/api/users/${userId}/${workoutId}`);
      await axios.put(`/api/users/${userId}/${workoutId}/completed`, {
        completions: userWorkout.completions++,
      });

      const res = await axios.get(`/api/users/${userId}/workouts`);
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
      await axios.put(`/api/users/${userId}/${workoutId}/completed`, {
        skips: userWorkout.skips++,
      });
      const res = await axios.get(`/api/users/${userId}/workouts`);
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

    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isSuccess = true;
    },
    [updateUser.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },


    [fetchUserWorkouts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserWorkouts.fulfilled]: (state, action) => {
      state.user = action.payload[0];
      console.log("state.user", state.user);
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
      state.workouts = action.payload;
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
      state.workouts = action.payload;
      state.isSuccess = true;
    },
    [setSkip.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const userReducer = userSlice.reducer;
