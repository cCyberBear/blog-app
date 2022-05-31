import axios from "axios";
import { AUTHING, SET_LOADING, SET_CURRENT_USER } from "../Type";
import { setAuthToken } from "../helper/axiosHeader";
import { notification } from "antd";

const register = (data, navigate) => async (dispatch) => {
  try {
    dispatch(setLoading(SET_LOADING, true));
    const res = await axios.post(
      "https://blogg-post-app.herokuapp.com/kd/api/v0/auth/register",
      data
    );
    setAuthToken(res.data.token);
    dispatch({ type: SET_CURRENT_USER, payload: res.data.user });
    localStorage.setItem("token", res.data.token);
    dispatch(setLoading(SET_LOADING, false));
    navigate("/");
  } catch (error) {
    notification.error({
      message: "Register fail",
    });
    dispatch(setLoading(SET_LOADING, false));
  }
};
const login = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(SET_LOADING, true));
    const res = await axios.post(
      "https://blogg-post-app.herokuapp.com/kd/api/v0/auth/login",
      data
    );
    setAuthToken(res.data.token);
    dispatch({ type: SET_CURRENT_USER, payload: res.data.user });
    localStorage.setItem("token", res.data.token);
    dispatch(setLoading(SET_LOADING, false));
  } catch (error) {
    console.log(error);
    notification.error({
      message: "Login fail",
    });
    dispatch(setLoading(SET_LOADING, false));
  }
};
const getCurrentUser = (token, navigate) => async (dispatch) => {
  try {
    dispatch({ type: AUTHING, payload: true });
    setAuthToken(token);
    const res = await axios.get(
      "https://blogg-post-app.herokuapp.com/kd/api/v0/auth/me"
    );
    dispatch({ type: SET_CURRENT_USER, payload: res.data.user });
  } catch (error) {
    navigate("/");
    notification.error({
      message: "Please login",
    });
    setAuthToken(false);
  }
  dispatch({ type: AUTHING, payload: false });
};

const logOut = (navigate) => (dispatch) => {
  setAuthToken(null);
  dispatch({ type: SET_CURRENT_USER, payload: null });
  localStorage.removeItem("token");
  navigate("/");
};

const setLoading = (type, loading) => (dispatch) => {
  dispatch({ type, payload: loading });
};

export { register, login, setLoading, logOut, getCurrentUser };
