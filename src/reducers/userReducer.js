const initialState = {
  currentUser: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "first":
      return { ...state };

    default:
      return state;
  }
};