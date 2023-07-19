import { server } from "../store";
import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  clearMessage,
} from "../reducers/userReducer";

export const signup = async (dispatch, user) => {
  dispatch(clearMessage);
  dispatch(loginStart());
  try {
    const res = await axios.post(
      `http://localhost:5000/api/user/create/user`,
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const login = async (dispatch, user) => {
  dispatch(clearMessage);

  dispatch(loginStart());
  try {
    const res = await axios.post(`http://localhost:5000/api/user/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const clearmessage = async (dispatch) => {
  dispatch(clearMessage());
};
