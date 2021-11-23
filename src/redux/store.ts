import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import combineReducer from "./combineReducer";

export const store = createStore(combineReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof combineReducer>;
