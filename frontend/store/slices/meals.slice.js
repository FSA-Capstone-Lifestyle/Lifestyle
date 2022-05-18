import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  meals: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const fetchMeals = createAsyncThunk(
  "meals/fetchMeals",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:1337/api/meals");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
