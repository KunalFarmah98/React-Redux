import { combineReducers } from "redux";
import courseReducer from "./courseReducer";

const rootReducer = combineReducers({
  courses: courseReducer, // the key "courses" is the value present in state
});

export default rootReducer;
