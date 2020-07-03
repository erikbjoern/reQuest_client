import initialState from "../store/initialState";

const karmaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_KARMA":
      return {
        ...state,
        karma: action.payload.karma,
      };

    default:
      return state;
  }
};

export default karmaReducer;
