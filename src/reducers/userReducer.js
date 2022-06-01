import { AUTHING, SET_CURRENT_USER, SET_LOADING } from "../Type";

const initialState = {
  currentUser: null,
  authing: false,
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case AUTHING:
      return {
        ...state,
        authing: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
export default userReducer;
