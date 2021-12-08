import { combineReducers } from "redux";
import userCartReducer from "./reducers/userCartReducer";
import userLogReducer from "./reducers/userLogReducer";

const combineReducer = combineReducers({
  user: userLogReducer,
  game: userCartReducer,
});

export default combineReducer;
