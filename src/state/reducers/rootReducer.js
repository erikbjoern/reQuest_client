import { combineReducers } from "redux";
import requestReducer from "./requestReducer";
import authenticationReducer from "./authenticationReducer";
import karmaReducer from "./karmaReducer";
import activePageReducer from "./activePageReducer";
import locationReducer from "./locationReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  karma: karmaReducer,
  requests: requestReducer,
  messages: messageReducer,
  authentication: authenticationReducer,
  pages: activePageReducer,
  coords: locationReducer,
});

export default rootReducer;
