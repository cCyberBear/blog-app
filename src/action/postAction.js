import { notification } from "antd";
import axios from "axios";
import {
  SET_CURRENT_POST,
  SET_LOADING,
  SET_LOADING_POST,
  SET_POSTS,
  SET_SEARCH_LIST,
} from "../Type";
import { setLoading } from "./userActions";

const getPost = () => async (dispatch) => {
  try {
    dispatch(setLoading(SET_LOADING_POST, true));
    const res = await axios.get(
      "https://blogg-post-app.herokuapp.com/kd/api/v0/post/allpost"
    );
    dispatch({ type: SET_POSTS, payload: res.data.post });
    dispatch(setLoading(SET_LOADING_POST, false));
  } catch (error) {
    console.log(error);
    notification.error({
      message: "Get post fail",
    });
    dispatch(setLoading(SET_LOADING, false));
  }
};
const post = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(SET_LOADING_POST, true));
    const formdata = new FormData();
    for (var x = 0; x < data.image.length; x++) {
      formdata.append("image", data.image[x]);
    }
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    const res = await axios.post(
      "https://blogg-post-app.herokuapp.com/kd/api/v0/post/uploadpost",
      formdata
    );
    dispatch(setLoading(SET_LOADING_POST, false));
    notification.success({
      message: "Post success",
    });
  } catch (error) {
    console.log(error);
    notification.error({
      message: "Post fail",
    });
    dispatch(setLoading(SET_LOADING, false));
  }
};
const setCurrentPost = (id) => (dispatch) => {
  dispatch(setLoading(SET_LOADING_POST, true));
  dispatch({ type: SET_CURRENT_POST, payload: id });
  dispatch(setLoading(SET_LOADING_POST, false));
};
const setSearch = (keySearch) => (dispatch) => {
  dispatch(setLoading(SET_LOADING_POST, true));
  dispatch({ type: SET_SEARCH_LIST, payload: keySearch });
  dispatch(setLoading(SET_LOADING_POST, false));
};
export { getPost, post, setCurrentPost, setSearch };
