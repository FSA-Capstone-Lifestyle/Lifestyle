import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  diets: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const fetchDiets = createAsyncThunk(
  "diets/fetchDiets",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:1337/api/diets");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createDiet = createAsyncThunk(
  "diets/createDiet",
  async (formInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:1337/api/diets",
        formInfo
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//export const updateDiet = createAsyncThunk()

export const removeDiet = createAsyncThunk(
  "diets/removeDiet",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:1337/api/diets/${id}`
      );
      return res.data;
    } catch (error) {
      console.log("Can't delete diet", error);
      return rejectWithValue(error);
    }
  }
);

const dietsSlice = createSlice({
  name: "diets",
  initialState,
  reducers: {},
  // only handle action types
  extraReducers: {
    [fetchDiets.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchDiets.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.diets = action.payload;
    },
    [fetchDiets.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [createDiet.pending]: (state) => {
      state.isLoading = true;
    },
    [createDiet.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.diets.push(action.payload);
    },
    [createDiet.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    // [updateDiet.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [updateDiet.fulfilled]: (state, action) => {
    //   const index = state.diets.findIndex(
    //     (diet) => diet.id === action.payload.id
    //   );
    //   state.diets[index] = {
    //     ...state.diets[index],
    //     ...action.payload,
    //   };
    // },
    // [updateDiet.rejected]: (state) => {
    //   state.isLoading = false;
    //   state.isError = true;
    // },
    [removeDiet.fulfilled]: (state, action) => {
      state.diets = state.diets.filter((diet) => diet.id !== action.payload.id);
    },
  },
});

export const dietsReducer = dietsSlice.reducer;
