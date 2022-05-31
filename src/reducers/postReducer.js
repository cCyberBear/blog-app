import { SET_LOADING_POST, SET_POSTS } from "../Type";

const initialState = {
  posts: [],
  loading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case SET_LOADING_POST:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
export default postReducer;
