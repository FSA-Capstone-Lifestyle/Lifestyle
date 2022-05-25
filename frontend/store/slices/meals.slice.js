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

export const createMeal = createAsyncThunk(
  "meals/createMeal",
  async (formInfo, { rejectWithValue }) => {
    const {
      calories,
      imageUrl,
      ingredients,
      instructions,
      name,
      prepTime,
      mealType,
    } = formInfo;
    try {
      const {
        name,
        imageUrl,
        ingredients,
        instructions,
        mealType,
        prepTime,
        calories,
      } = formInfo;

      const response = await axios.post("http://localhost:1337/api/meals", {
        name,
        imageUrl,
        ingredients,
        instructions,
        mealType,
        prepTime,
        calories,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateMeal = createAsyncThunk(
  "meals/updateMeal",
  async (formInfo, { rejectWithValue }) => {
    try {
      const { id, mealData } = formInfo;
      const res = await axios.put(
        `http://localhost:1337/api/meals/${id}`,
        mealData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeMeal = createAsyncThunk(
  "meals/removeMeal",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:1337/api/meals/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  // only handle action types
  extraReducers: {
    [fetchMeals.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMeals.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.meals = action.payload;
    },
    [fetchMeals.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [createMeal.pending]: (state) => {
      state.isLoading = true;
    },
    [createMeal.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.meals.push(action.payload);
    },
    [createMeal.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [updateMeal.pending]: (state) => {
      state.isLoading = true;
    },
    [updateMeal.fulfilled]: (state, action) => {
      const index = state.meals.findIndex(
        (meal) => meal.id === action.payload.id
      );
      state.meals[index] = {
        ...state.meals[index],
        ...action.payload,
      };
    },
    [updateMeal.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [removeMeal.fulfilled]: (state, action) => {
      state.meals = state.meals.filter((meal) => meal.id !== action.payload.id);
    },
  },
});

export const mealsReducer = mealsSlice.reducer;
