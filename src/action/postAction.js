import { notification } from "antd";
import axios from "axios";
import parseISOString from "../assets/format/time";
import AvatarByName from "../component/AvatarByName/AvatarByName";
import {
  SET_CURRENT_COMMENT,
  SET_CURRENT_POST,
  SET_LOADING,
  SET_LOADING_2,
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
    await axios.post(
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
const setCurrentPost = (id) => async (dispatch) => {
  dispatch(setLoading(SET_LOADING_2, true));
  try {
    const res = await axios.get(
      `https://blogg-post-app.herokuapp.com/kd/api/v0/post/getpost/${id}`
    );
    dispatch({ type: SET_CURRENT_POST, payload: res.data.post });
  } catch (error) {
    notification.error("Get post fail");
  }
  dispatch(setLoading(SET_LOADING_2, false));
};
const getComments = (id) => async (dispatch) => {
  dispatch(setLoading(SET_LOADING_POST, true));
  try {
    const res = await axios.get(
      `https://blogg-post-app.herokuapp.com/kd/api/v0/comment/get-comment/${id}`
    );
    const newCommentList = res.data.map((val) => {
      return {
        author: val.userId.username,
        datetime: parseISOString(val.createdAt),
        content: <p>{val.comment}</p>,
        avatar: <AvatarByName name={val.userId.username} />,
      };
    });
    dispatch({ type: SET_CURRENT_COMMENT, payload: newCommentList });
  } catch (error) {
    notification.error("Get comment fail");
  }
  dispatch(setLoading(SET_LOADING_POST, false));
};
const sendComment = (data) => async (dispatch) => {
  dispatch(setLoading(SET_LOADING_POST, true));
  try {
    await axios.post(
      `https://blogg-post-app.herokuapp.com/kd/api/v0/comment/send-comment/`,
      data
    );
  } catch (error) {
    notification.error("Get comment fail");
  }
  dispatch(setLoading(SET_LOADING_POST, false));
};
const setSearch = (keySearch) => (dispatch) => {
  dispatch(setLoading(SET_LOADING_POST, true));
  dispatch({ type: SET_SEARCH_LIST, payload: keySearch });
  dispatch(setLoading(SET_LOADING_POST, false));
};
export { getPost, post, setCurrentPost, setSearch, getComments, sendComment };
