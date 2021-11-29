import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import combineReducer from "./combineReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(combineReducer, enhancer);

export type RootState = ReturnType<typeof combineReducer>;
