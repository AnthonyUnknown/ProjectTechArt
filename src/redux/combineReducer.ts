import { combineReducers } from "redux";
import userCartReducer from "./reducers/userCartReducer";
import userLogReducer from "./reducers/userLogReducer";
import userFetchLauncher from "./reducers/userFetchLauncher";
import userGetTopCardsReducer from "./reducers/userGetTopCardsReducer";

const combineReducer = combineReducers({
  user: userLogReducer,
  game: userCartReducer,
  launcher: userFetchLauncher,
  topCards: userGetTopCardsReducer,
});

export default combineReducer;
