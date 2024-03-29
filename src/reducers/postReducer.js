import {
  SET_CURRENT_COMMENT,
  SET_CURRENT_POST,
  SET_LOADING_2,
  SET_LOADING_POST,
  SET_POSTS,
  SET_SEARCH_LIST,
} from "../Type";

const initialState = {
  posts: [],
  loading: false,
  currentPost: null,
  searchList: [],
  loading_2: false,
  comments: [],
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
    case SET_LOADING_2:
      return {
        ...state,
        loading_2: action.payload,
      };
    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload,
      };
    case SET_CURRENT_COMMENT:
      return {
        ...state,
        comments: action.payload,
      };
    case SET_SEARCH_LIST:
      const newList = state.posts.filter((val) => {
        return val.description.includes(action.payload);
      });
      return {
        ...state,
        searchList: newList,
      };
    default:
      return state;
  }
};
export default postReducer;
