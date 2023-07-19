import { createSlice } from "@reduxjs/toolkit";

export const useReducer = createSlice({
  name: "User",
  initialState: {
    user: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
      state.error = false;
      state.message = "success!!";
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    clearError: (state) => {
      state.error = false;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const { loginSuccess, loginFailure, loginStart, logout, clearMessage } =
  useReducer.actions;
export default useReducer.reducer;
