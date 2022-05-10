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
  },
});

export const userReducer = userSlice.reducer;
