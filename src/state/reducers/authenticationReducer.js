import initialState from "../store/initialState";

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return {
        ...state,
        authenticated: action.payload.authenticated,
        uid: action.payload.uid,   
      };
    case "LOGOUT":
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default authenticationReducer;
