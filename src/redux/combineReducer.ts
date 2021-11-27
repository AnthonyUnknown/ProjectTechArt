import { combineReducers } from "redux";
import userLogReducer from "./reducers/userLogReducer";
import userPageReducer from "./reducers/userPageReducer";

const combineReducer = combineReducers({
  user: userLogReducer,
  userPage: userPageReducer,
});

export default combineReducer;
