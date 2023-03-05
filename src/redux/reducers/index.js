import { combineReducers } from "redux";
import authorReducer from "./authorReducer";
import courseReducer from "./courseReducer";

const rootReducer = combineReducers({
  courses: courseReducer, // the key "courses" is the value present in state
  authors: authorReducer,
});

export default rootReducer;
