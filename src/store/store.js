import { compose, createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { thunk } from "redux-thunk"; // ✅ named import for Vite/ESM
import { rootReducer } from "./root-reducer";

const middleWares = [thunk, logger];

const composedEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  undefined,
  composedEnhancers(applyMiddleware(...middleWares))
);
