import { notification } from "antd";
import axios from "axios";
import { SET_LOADING, SET_LOADING_POST, SET_POSTS } from "../Type";
import { setLoading } from "./userActions";

const getPost = () => async (dispatch) => {
  try {
    dispatch(setLoading(SET_LOADING_POST, true));
    const res = await axios.get(
      "https://blogg-post-app.herokuapp.com/kd/api/v0/post/allpost"
    );
    console.log(res.data);
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
    console.log(data.image);
    const formdata = new FormData();
    for (var x = 0; x < data.image.length; x++) {
      formdata.append("image", data.image[x]);
    }
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    console.log(formdata);
    const res = await axios.post(
      "https://blogg-post-app.herokuapp.com/kd/api/v0/post/uploadpost",
      formdata
    );
    console.log(res.data);
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
export { getPost, post };
