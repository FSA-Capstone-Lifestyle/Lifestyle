import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const TOKEN = "token";

const initialState = {
  user: {},
  success: false,
  loading: false,
  error: false,
};

export const register = createAsyncThunk(
  "auth/signup",
  async (formInfo, { dispatch, rejectWithValue }) => {
    try {
      const { firstName, lastName, password, email } = formInfo;

      const res = await axios.post(`http://192.168.1.155:1337/auth/signup`, {
        firstName,
        lastName,
        password,
        email,
      });

      SecureStore.setItemAsync(TOKEN, res.data.token);
      dispatch(me());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (formInfo, { dispatch, rejectWithValue }) => {
    try {
      const { email, password } = formInfo;
      const res = await axios.post(`http://192.168.1.155:1337/auth/signin`, {
        email,
        password,
      });

      if (res.data === "Invalid username or password") {
        return "Invalid username or password";
      }

      await SecureStore.setItemAsync(TOKEN, res.data.token);

      return dispatch(me());
    } catch (error) {
      console.log("error catch", error);
      return rejectWithValue(error);
    }
  }
);

export const me = createAsyncThunk("auth/me", async (rejectWithValue) => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN);

    if (token) {
      const res = await axios.get("http://192.168.1.155:1337/auth/me", {
        headers: {
          authorization: token,
        },
      });

      return res.data;
    } else {
      throw new Error();
    }
  } catch (err) {
    return rejectWithValue(error);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const token = await SecureStore.deleteItemAsync(TOKEN);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [me.pending]: (state) => {
      state.loading = true;
    },
    [me.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
    [me.fulfilled]: (state, action) => {
      state.success = true;
      state.user = action.payload;
    },
    [logout.fulfilled]: (state, action) => {
      //state.error = true;
      state.user = {};
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.rejected]: (state) => {
      state.error = true;
    },
    [authenticate.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    [authenticate.pending]: (state) => {
      state.loading = true;
    },
    [authenticate.rejected]: (state) => {
      state.error = true;
    },
  },
});

export const authReducer = authSlice.reducer;
