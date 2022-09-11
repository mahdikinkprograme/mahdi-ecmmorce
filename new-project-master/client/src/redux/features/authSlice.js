import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        user
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        user
      );
      localStorage.setItem("userId", response.data._id);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : null,
    username: localStorage.getItem("username")
      ? localStorage.getItem("username")
      : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    registerError: null,
    registerStatus: "",
    loginError: null,
    loginStatus: "",
  },
  reducers: {
    loadUser: (state, { payload }) => {
      state.username = payload;
    },
    logOut: (state) => {
      state.token = "";
      state.username = "";
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("shippingAdress");
      localStorage.removeItem("paymentMethod");
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.registerStatus = "Pending";
      state.registerError = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.registerStatus = "Fulfilled";
      state.registerError = null;
      state.userId = payload.userId;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.registerStatus = "Rejected";
      state.registerError = payload;
    },
    [loginUser.pending]: (state) => {
      state.loginStatus = "Pending";
      state.loginError = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loginStatus = "Fullfield";
      state.loginError = null;
      state.userId = payload.userId;
      state.token = payload.token;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loginStatus = "Rejected";
      state.loginError = payload;
    },
  },
});

export const { loadUser, logOut } = authSlice.actions;
export default authSlice.reducer;
