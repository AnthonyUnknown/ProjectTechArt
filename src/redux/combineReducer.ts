import { combineReducers } from "redux";
import userLogReducer from "./reducers/userLogReducer";

const combineReducer = combineReducers({
  user: userLogReducer,
});

export default combineReducer;
