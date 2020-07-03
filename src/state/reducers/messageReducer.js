import initialState from "../store/initialState";

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SIGNUP_MESSAGE":
      return {
        ...state,
        signupMessage: action.payload.signupMessage,
      };
    default:
      return state;
  }
};
export default messageReducer;
