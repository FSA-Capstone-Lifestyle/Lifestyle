import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  diet: {},
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const fetchDiet = createAsyncThunk(
  "diet/fetchDiet",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/diets/${id}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const dietSlice = createSlice({
  name: "diet",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDiet.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchDiet.fulfilled]: (state, action) => {
      state.diet = action.payload;
      state.isSuccess = true;
    },
    [fetchDiet.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const dietReducer = dietSlice.reducer;
