import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  meal: {},
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const fetchMeal = createAsyncThunk(
  "meal/fetchMeal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/meals/${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMeal.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMeal.fulfilled]: (state, action) => {
      state.meal = action.payload;
      state.isSuccess = true;
    },
    [fetchMeal.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const mealReducer = mealSlice.reducer;
